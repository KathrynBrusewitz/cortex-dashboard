import React, { Component } from 'react';
import { Editor, getEventRange, getEventTransfer } from 'slate-react';
import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations';
import { Block, Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';

import 'material-icons';
import './TextEditor.css';

import initialValue from './value.json';

/**
 * Define the default node type.
 * @type {String}
 */
const DEFAULT_NODE = 'paragraph';

/**
 * Define hotkey matchers.
 * @type {Function}
 */
const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

/**
 * A schema to enforce that there's always a paragraph as the last block.
 * @type {Object}
 */
const schema = {
  document: {
    last: { types: ['paragraph'] },
    normalize: (change, reason, { node, child }) => {
      switch (reason) {
        case LAST_CHILD_TYPE_INVALID: {
          const paragraph = Block.create('paragraph');
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
        default:
          return;
      }
    },
  },
};

/**
 * A function helper to determine whether a URL has an image extension.
 * @param {String} url
 * @return {Boolean}
 */
function isImage(url) {
  return !!imageExtensions.find(ext => url.endsWith(ext));
}

/**
 * A change helper to standardize inserting images.
 * @param {Change} change
 * @param {String} src
 * @param {Range} target
 */
function insertImage(change, src, target) {
  if (target) {
    change.select(target);
  }

  change.insertBlock({
    type: 'image',
    isVoid: true,
    data: { src },
  });
}

/**
 * A change helper to standardize wrapping links.
 * @param {Change} change
 * @param {String} href
 */
function wrapLink(change, href) {
  change.wrapInline({
    type: 'link',
    data: { href },
  });

  change.collapseToEnd();
}

/**
 * A change helper to standardize unwrapping links.
 * @param {Change} change
 */
function unwrapLink(change) {
  change.unwrapInline('link');
}

class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Deserialize the initial editor value
      value: Value.fromJSON(initialValue),
    };
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   * @param {String} type
   * @return {Boolean}
   */
  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   * @param {String} type
   * @return {Boolean}
   */
  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  }

  /**
   * Check whether the current selection has a link in it.
   * @return {Boolean} hasLinks
   */
  hasLinks = () => {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type === 'link');
  }

  /**
   * On change, save the new `value`.
   * @param {Change} change
   */
  onChange = ({ value }) => {
    this.setState({ value });
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */
  onKeyDown = (event, change) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   * @param {Event} event
   * @param {String} type
   */
  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  }

  /**
   * When a block button is clicked, toggle the block type.
   * @param {Event} event
   * @param {String} type
   */
  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      })

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        change
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        change.setBlocks('list-item').wrapBlock(type);
      }
    }

    this.onChange(change);
  }

  /**
   * When clicking a link, if the selection has a link in it, remove the link.
   * Otherwise, add a new link with an href and text.
   * @param {Event} event
   */
  onClickLink = event => {
    event.preventDefault();
    const { value } = this.state;
    const hasLinks = this.hasLinks();
    const change = value.change();

    if (hasLinks) {
      change.call(unwrapLink);
    } else if (value.isExpanded) {
      const href = window.prompt('Enter the URL of the link:');
      change.call(wrapLink, href);
    } else {
      const href = window.prompt('Enter the URL of the link:');
      const text = window.prompt('Enter the text for the link:');
      change
        .insertText(text)
        .extend(0 - text.length)
        .call(wrapLink, href);
    }

    this.onChange(change);
  }

  /**
   * On clicking the image button, prompt for an image and insert it.
   * @param {Event} event
   */
  onClickImage = event => {
    event.preventDefault();
    const src = window.prompt('Enter the URL of the image:');
    if (!src) return;

    const change = this.state.value.change().call(insertImage, src);

    this.onChange(change);
  }

  /**
   * On paste, if the text is an image, insert the image.
   * If the text is a link, wrap the selection in a link.
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */
  onPaste = (event, change, editor) => {
    const transfer = getEventTransfer(event);
    const { type, text } = transfer;

    if (type !== 'text' && type !== 'html') return;
    if (!isUrl(text)) return;

    if (isImage(text)) {
      const target = getEventRange(event, change.value);
      if (!target) return;
      change.call(insertImage, text, target);
    } else {
      if (change.value.isCollapsed) return;

      if (this.hasLinks()) {
        change.call(unwrapLink);
      }

      change.call(wrapLink, text);
    }
    return true;
  }

  /**
   * On drop, insert the image wherever it is dropped.
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */
  onDrop = (event, change, editor) => {
    const target = getEventRange(event, change.value);
    if (!target || !event.type === 'drop') return;

    const transfer = getEventTransfer(event);
    const { type, files } = transfer;

    if (type === 'files') {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');
        if (mime !== 'image') continue;

        reader.addEventListener('load', () => {
          editor.change(c => {
            c.call(insertImage, reader.result, target);
          })
        });

        reader.readAsDataURL(file);
      }
    }
  }

  render() {
    return (
      <div className="example">
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    );
  }

  /**
   * Render the toolbar.
   * @return {Element}
   */
  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('heading-one', 'looks_one')}
        {this.renderBlockButton('heading-two', 'looks_two')}
        {this.renderBlockButton('block-quote', 'format_quote')}
        {this.renderBlockButton('numbered-list', 'format_list_numbered')}
        {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
        {this.renderLinkButton('link')}
        {this.renderImageButton('image')}
      </div>
    );
  }

  /**
   * Render a mark-toggling toolbar button.
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    const onMouseDown = event => this.onClickMark(event, type);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  }

  /**
   * Render a block-toggling toolbar button.
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state;
      const parent = value.document.getParent(value.blocks.first().key);
      isActive = this.hasBlock('list-item') && parent && parent.type === type;
    }
    const onMouseDown = event => this.onClickBlock(event, type);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  }

  /**
   * Render a link-toggling toolbar button.
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
  renderLinkButton = (icon) => {
    const isActive = this.hasLinks();
    const onMouseDown = event => this.onClickLink(event);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  }

  /**
   * Render an image-toggling toolbar button.
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
  renderImageButton = (icon) => {
    const onMouseDown = event => this.onClickImage(event);

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <span className="button" onMouseDown={onMouseDown}>
        <span className="material-icons">{icon}</span>
      </span>
    );
  }

  /**
   * Render the Slate editor.
   * @return {Element}
   */
  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          placeholder="What do you want to talk about?"
          value={this.state.value}
          schema={schema}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onDrop={this.onDrop}
          onPaste={this.onPaste}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          spellCheck
        />
      </div>
    );
  }

  /**
   * Render a Slate node.
   * @param {Object} props
   * @return {Element}
   */
  renderNode = props => {
    const { attributes, children, node, isSelected } = props;
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'link': {
        const { data } = node;
        const href = data.get('href');
        return (
          <a {...attributes} href={href}>
            {children}
          </a>
        );
      }
      case 'image': {
        const src = node.data.get('src')
        const className = isSelected ? 'active' : null
        const style = { display: 'block' }
        return (
          <img src={src} className={className} style={style} alt='' {...attributes} />
        )
      }
      default:
        return
    }
  }

  /**
   * Render a Slate mark.
   * @param {Object} props
   * @return {Element}
   */
  renderMark = props => {
    const { children, mark, attributes } = props
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return
    }
  }
}

export default TextEditor;