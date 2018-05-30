import React, { Component } from 'react';
import { Form, Input, Button, Row, Card } from 'antd';
import SelectUserTags from '../shared/SelectUserTags';
import ImageUploader from './ImageUploader';

class ImageForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        if (this.props.image) {
          console.log(options);
          this.props.onSubmit(options, this.props.image._id);
        } else {
          console.log('handleSubmit options received:');
          console.log(options);
          this.props.onSubmit(options);
        }
      }
    });
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const image = this.props.image || {};

    return (
      <Form onSubmit={this.handleSubmit}>
        {
          (this.props.edit && image.s3Key) &&
          <Card
            style={{ marginBottom: 20 }}
            cover={<img alt={image.description} src={`https://${image.s3Bucket}.s3.amazonaws.com/${image.s3Key}`} />}
          >
            <Card.Meta
              title={image.title}
              description={
              <div>
                {`https://${image.s3Bucket}.s3.amazonaws.com/${image.s3Key}`}
              </div>}
            />
          </Card>
        }
        <Form.Item label="Title">
          {getFieldDecorator('title', {
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
        { !this.props.edit &&
          <Form.Item label="Upload">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              initialValue: (image.s3Key && [{
                uid: image._id,
                name: `${image.title} - https://${image.s3Bucket}.s3.amazonaws.com/${image.s3Key}`,
                status: 'done',
                url: `https://${image.s3Bucket}.s3.amazonaws.com/${image.s3Key}`,
              }]) || null,
            })(
              <ImageUploader />
            )}
          </Form.Item>
        }
        <Form.Item label="Artists">
          {getFieldDecorator('artists', {
            initialValue: (image.artists && image.artists.map(a => a._id)) || [],
          })(
            <SelectUserTags placeholder="Select artists" users={this.props.artistOptions} />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {this.props.edit ? 'Update Artwork' : 'Upload Artwork'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(ImageForm);