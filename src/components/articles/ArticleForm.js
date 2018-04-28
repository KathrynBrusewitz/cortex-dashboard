import React, { Component } from 'react';
import { Form, Icon, Input, Button, Radio } from 'antd';
import CheckableTags from '../shared/CheckableTags';
import Mentions from '../shared/Mentions';
import SelectTags from '../shared/SelectTags';
import SelectUserTags from '../shared/SelectUserTags';

class ArticleForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        this.props.onSubmit({...options, type: "article" });
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description" help="Summarize or describe the article under 160 characters. This shows up underneath the title when scrolling through content">
          {getFieldDecorator('description')(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item label="Writers">
          {getFieldDecorator('creators')(
            <SelectUserTags placeholder="Select one or more writers or write names" users={this.props.creatorOptions} />
          )}
        </Form.Item>
        <Form.Item label="Article Body" help="Will soon support Markdown">
          {getFieldDecorator('body', {
            rules: [{ required: true }],
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item label="What should be the status of this article?">
          {getFieldDecorator('state', {
            rules: [{ required: true }],
          })(
            <Radio.Group>
              <Radio value="published">Published to App</Radio>
              <Radio value="unpublished">Saved as Draft (Unpublished)</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {this.props.edit ? 'Update Article' : 'Create Article'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ArticleForm);