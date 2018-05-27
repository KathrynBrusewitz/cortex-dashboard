import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class InviteForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        this.props.onSubmit(options);
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [{ required: true }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item
          label="Select Roles"
        >
          {getFieldDecorator('roles', {
            rules: [{ required: true }],
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
            Send Invite to User
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(InviteForm);