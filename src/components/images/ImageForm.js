import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import UploadDragger from '../shared/UploadDragger';
import SelectUserTags from '../shared/SelectUserTags';

class ImageForm extends Component {
  handleSubmit = (e) => {
    e.primageDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        if (this.props.image) {
          this.props.onSubmit(options, this.props.image._id);
        } else {
          this.props.onSubmit(options);
        }
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const image = this.props.image || {};

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true }],
            initialValue: image.title || null,
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: image.description || null,
          })(
            <Input.TextArea autosize={{ minRows: 4 }} />
          )}
        </Form.Item>
        <Form.Item label="URL">
          {getFieldDecorator('url', {
            rules: [{ required: true }],
            initialValue: null,
          })(
            <UploadDragger />
          )}
        </Form.Item>
        <Form.Item label="Artists">
          {getFieldDecorator('artists', {
            initialValue: (image.artists && image.artists.map(a => a._id)) || [],
          })(
            <SelectUserTags placeholder="Select artists" users={this.props.artistOptions} />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {this.props.edit ? 'Update Artwork' : 'Publish Artwork'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ImageForm);