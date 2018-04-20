import React, { Component } from 'react';
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;

const tagsFromServer = ['Physiology', 'Anatomy', 'Pharmacology', 'Behavioral', 'Developmental', 'Cognitive', 'Neurology', 'Psychology', 'Computational'];

class CheckableTags extends Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    console.log('Next selected tags: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <div>
        <div style={{ marginRight: 8, display: 'inline-block' }}>Categories:</div>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

export default CheckableTags;
