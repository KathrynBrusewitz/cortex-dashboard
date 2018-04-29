import React, { Component } from 'react';
import { Form, Icon, Input, Button, Radio } from 'antd';
import Mentions from '../shared/Mentions';
import UploadDragger from '../shared/UploadDragger';
import SelectUserTags from '../shared/SelectUserTags';

class PodcastForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        if (this.props.content) {
          this.props.onSubmit({...options, type: "podcast"}, this.props.content._id);
        } else {
          this.props.onSubmit({...options, type: "podcast"});
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
    const { content } = this.props || {};

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true }],
            initialValue: content && content.title || null,
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description" help="Summarize or describe the podcast under 160 characters. This shows up underneath the title when scrolling through content">
          {getFieldDecorator('description', {
            initialValue: content && content.description || null,
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item label="Upload" help="Will be supported soon.">
          {getFieldDecorator('podcastRef', {
            // rules: [{ required: true }],
            initialValue: content && content.podcastRef || null,
          })(
            <UploadDragger />
          )}
        </Form.Item>
        <Form.Item label="Hosts">
          {getFieldDecorator('creators', {
            initialValue: content && content.creators || [],
          })(
            <SelectUserTags placeholder="Select one or more hosts or write names" users={this.props.creatorOptions} />
          )}
        </Form.Item>
        <Form.Item label="Podcast Body" help="Will soon support Markdown. Good for transcripts or for more detailed reading">
          {getFieldDecorator('body', {
            rules: [{ required: true }],
            initialValue: content && content.body || null,
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item label="What should be the status of this podcast?">
          {getFieldDecorator('state', {
            rules: [{ required: true }],
            initialValue: content && content.state || null,
          })(
            <Radio.Group>
              <Radio value="published">Published to App</Radio>
              <Radio value="unpublished">Saved as Draft (Unpublished)</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {this.props.edit ? 'Update Podcast' : 'Create Podcast'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(PodcastForm);