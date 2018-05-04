import React, { Component } from 'react';
import { Form, Icon, Input, Button, Radio } from 'antd';
import Mentions from '../shared/Mentions';
import SelectUserTags from '../shared/SelectUserTags';

class ArticleForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        if (this.props.content) {
          this.props.onSubmit({...options, type: "article"}, this.props.content._id);
        } else {
          this.props.onSubmit({...options, type: "article"});
        }
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const content = this.props.content || {};

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true }],
            initialValue: content.title || null,
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description" help="Summarize or describe the article under 160 characters. This shows up underneath the title when scrolling through content">
          {getFieldDecorator('description', {
            initialValue: content.description || null,
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item label="Writers">
          {getFieldDecorator('creators', {
            initialValue: content.creators || [],
          })(
            <SelectUserTags placeholder="Select one or more writers or write names" users={this.props.creatorOptions} />
          )}
        </Form.Item>
        <Form.Item label="Article Body" help="Will soon support Markdown">
          {getFieldDecorator('body', {
            rules: [{ required: true }],
            initialValue: content.body || null,
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item label="References">
          {getFieldDecorator('references', {
            initialValue: content.references || null,
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item label="What should be the status of this article?">
          {getFieldDecorator('state', {
            rules: [{ required: true }],
            initialValue: content.state || null,
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