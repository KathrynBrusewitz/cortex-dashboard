import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class TermForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        if (this.props.term) {
          this.props.onSubmit(options, this.props.term._id);
        } else {
          this.props.onSubmit(options);
        }
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const term = this.props.term || {};

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Term">
          {getFieldDecorator('term', {
            rules: [{ required: true }],
            initialValue: term.term || null,
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Definition">
          {getFieldDecorator('definition', {
            rules: [{ required: true }],
            initialValue: term.definition || null,
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true }],
            initialValue: term.description || null,
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {this.props.edit ? 'Update Term' : 'Create Term'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(TermForm);