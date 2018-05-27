import React, { Component } from 'react';
import { Select } from 'antd';

class SelectUserTags extends Component {
  render() {
    const { placeholder, users } = this.props;

    const options = users.map((user, i) => (
      <Select.Option key={user._id}>
        {user.name} <i> - {user.roles.map(r => `${r} `)}</i>
      </Select.Option>
    ));

    return (
      <Select
        {...this.props}
        mode="multiple"
        style={{ width: '100%' }}
        placeholder={placeholder || 'Select Users'}
      >
        {options}
      </Select>
    );
  }
}

export default SelectUserTags;
