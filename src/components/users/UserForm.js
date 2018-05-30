import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

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
        <Form.Item label="Bio">
          {getFieldDecorator('bio', {
            initialValue: user.bio || null,
          })(
            <Input.TextArea autosize={{ minRows: 4 }} />
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
          <Form.Item label="New Password" help={this.props.edit ? 'Only update this field if you want a new password. Otherwise leave blank to keep your current password.' : 'When creating a new user, you do not need to supply a password. However, they cannot login until they go to the homepage or app to reset their password for a given email. Feel free to set a password for them now and let them know what it is so they do not have to go through the password reset process'}>
            {getFieldDecorator('password', {
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
        }
        <Form.Item
          label="Select Roles"
        >
          {getFieldDecorator('roles', {
            rules: [{ required: true }],
            initialValue: user.roles || null,
          })(
            <Checkbox.Group>
              <Checkbox value="admin">Admin</Checkbox>
              <Checkbox value="writer">Writer</Checkbox>
              <Checkbox value="artist">Artist</Checkbox>
              <Checkbox value="reader">Reader</Checkbox>
            </Checkbox.Group>
          )}
        </Form.Item>
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