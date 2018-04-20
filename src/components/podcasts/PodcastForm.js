import React, { Component } from 'react';
import { Form, Icon, Input, Button, Radio } from 'antd';
import CheckableTags from '../shared/CheckableTags';
import Mentions from '../shared/Mentions';
import SelectTags from '../shared/SelectTags';
import UploadDragger from '../shared/UploadDragger';

class PodcastForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.props.onSubmit(values);
        console.log('created podcast!');
      }
    });
  }

  handlePublishSelect = (e) => {
    console.log('publish value selected: ', e.target.value);
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
        <Form.Item label="Description" help="Summarize or describe the podcast under 160 characters. This shows up underneath the title when scrolling through content">
          <Input />
        </Form.Item>
        <Form.Item label="Upload">
          <UploadDragger />
        </Form.Item>
        <Form.Item label="Hosts" help="If empty, defaults to Grey Matters">
          <SelectTags placeholder="Select a host or host names" />
        </Form.Item>
        <Form.Item label="Body" help="Will soon support Markdown. Good for transcripts or for more detailed reading">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="References">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <CheckableTags />
        </Form.Item>
        <Form.Item label="What should be the status of this podcast?">
          <Radio.Group defaultValue="draftState" onChange={this.handlePublishSelect}>
            <Radio value="publishState">Published to App</Radio>
            <Radio value="draftState">Saved as Draft (Unpublished)</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {this.props.edit ? 'Update Podcast' : 'Create Podcast'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(PodcastForm);