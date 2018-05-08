import React, { Component } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import UploadDragger from '../shared/UploadDragger';
import SelectUserTags from '../shared/SelectUserTags';

class VideoForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        if (this.props.content) {
          this.props.onSubmit({...options, type: "video"}, this.props.content._id);
        } else {
          this.props.onSubmit({...options, type: "video"});
        }
      }
    });
  }

  handlePublishSelect = (e) => {
    console.log('publish value selected: ', e.target.value);
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
        <Form.Item label="Video URL">
          {getFieldDecorator('url', {
            rules: [{ required: true }],
            initialValue: content.url || null,
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description" help="Summarize or describe the video under 160 characters. This shows up underneath the title when scrolling through content">
          {getFieldDecorator('description', {
            initialValue: content.description || null,
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item label="Upload" help="Will be supported soon.">
          {getFieldDecorator('videoRef', {
            // rules: [{ required: true }],
            initialValue: content.videoRef || null,
          })(
            <UploadDragger />
          )}
        </Form.Item>
        <Form.Item label="Hosts">
          {getFieldDecorator('creators', {
            initialValue: content.creators || [],
          })(
            <SelectUserTags placeholder="Select one or more hosts or write names" users={this.props.creatorOptions} />
          )}
        </Form.Item>
        <Form.Item label="Video Body" help="Will soon support Markdown. Good for transcripts or for more detailed reading">
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
        <Form.Item label="What should be the status of this video?">
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
            {this.props.edit ? 'Update Video' : 'Create Video'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(VideoForm);