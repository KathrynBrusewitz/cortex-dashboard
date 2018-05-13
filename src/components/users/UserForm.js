import React, { Component } from 'react';
import { Form, Icon, Input, Button, Radio } from 'antd';

class UserForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        if (this.props.user) {
          this.props.onSubmit(options, this.props.user._id);
        } else {
          this.props.onSubmit(options);
        }
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const user = this.props.user || {};

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true }],
            initialValue: user.name || null,
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
          )}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [{ required: true }],
            initialValue: user.email || null,
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </Form.Item>
        { (!this.props.edit || this.props.isCurrentUser) &&
          <Form.Item label="New Password">
            {getFieldDecorator('password', {
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
        }
        { !this.props.isCurrentUser &&
          <Form.Item
            label="Choose a Role"
          >
            {getFieldDecorator('role', {
              rules: [{ required: true }],
              initialValue: user.role || null,
            })(
              <Radio.Group>
                <Radio value="admin">Admin</Radio>
                <Radio value="writer">Writer</Radio>
                <Radio value="artist">Artist</Radio>
                <Radio value="reader">Reader</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        }
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {this.props.edit ? 'Update User' : 'Create User'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm);