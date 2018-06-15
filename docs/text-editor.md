# Text Editor

I am using the Slate framework as our rich text editor.

- Live Examples: http://slatejs.org/
- Documentation: https://docs.slatejs.org/
- Github: https://github.com/ianstormtaylor/slate

## Features

Keyboard Shortcuts:
- `cmd-z` to undo. Editor keeps track of history.

Images:
- Add image via Toolbar.
- Drag and drop multiple Images anywhere.
- Click and drag Images around the editor.

Links:
- Add Link via Toolbar.
- Copy and paste a Link while a range of text is selected.

### Future Features

[Complex embedded nodes](http://slatejs.org/#/embeds):
- Videos
- D3 Visualizations

## Useful Packages

### [is-hotkey](https://www.npmjs.com/package/is-hotkey)

A simple, lightweight way to check whether a browser event matches a hotkey. Accepts `mod` for the classic `cmd` on Mac and `ctrl` on Windows use case.

### [is-url](https://github.com/segmentio/is-url)

Simple check whether string is a URL. `isUrl(string)` returns a `boolean`.

### [image-extensions](https://github.com/arthurvr/image-extensions)

Contains both bitmap and vector formats. The list is just JSON.

### [Material Icons](https://marella.github.io/material-icons/)

The set of icons we use for the toolbar. This package contains only the icon font and required CSS. So it is considerably small compared to the official `material-design-icons` package.

### [Slate Schema Violations](https://docs.slatejs.org/other-packages/slate-schema-violations) 

A set of constants for the built-in violations in a Slate schema.

`LAST_CHILD_TYPE_INVALID` is used to ensure that there's always a paragraph as the last block, especially after adding an image or video.

## Slate React

### [`getEventTransfer`](https://docs.slatejs.org/slate-react/geteventtransfer)

```
getEventTransfer(event: DOMEvent|ReactEvent) => Object
```

Get the Slate-related data from a DOM `event` and Slate `value`.

Used to transfer links and images from the clipboard.

### [`getEventRange`](https://docs.slatejs.org/slate-react/getEventRange)

```
getEventRange(event: DOMEvent|ReactEvent, value: Value) => Range
```

Get the affected Slate range from a DOM `event` and Slate `value`.
