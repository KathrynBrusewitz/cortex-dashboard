import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const children = ['Grey Matters', 'Kathryn Brusewitz', 'Corey Mandell', 'Troy Cosentino', 'Sonia Skarbek'];

const options = children.map((child, i) => <Option key={i}>{child}</Option>);

function handleChange(value) {
  console.log(`selected ${value}`);
}

class SelectTags extends Component {
  render() {
    const placeholder = this.props.placeholder || 'Select a Tag';
    return(
      <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder={placeholder}
        onChange={handleChange}
      >
        {options}
      </Select>
    );
  }
}

export default SelectTags;
