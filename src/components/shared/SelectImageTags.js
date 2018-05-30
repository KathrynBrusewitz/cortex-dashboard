import React, { Component } from 'react';
import { Select } from 'antd';

class SelectImageTags extends Component {
  render() {
    const { placeholder, images } = this.props;

    const options = images.map((image, i) => (
      <Select.Option key={image._id}>
        {image.title}
      </Select.Option>
    ));

    return (
      <Select
        {...this.props}
        allowClear
        style={{ width: '100%' }}
        placeholder={placeholder || 'Select Image'}
      >
        {options}
      </Select>
    );
  }
}

export default SelectImageTags;
