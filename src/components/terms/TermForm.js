import React, { Component } from 'react';
import { Form, Input, Button, Card } from 'antd';
import SelectImageTags from '../shared/SelectImageTags';

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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const term = this.props.term || {};
    const selectedCoverImageId = getFieldValue('coverImage');
    const coverImageValue = this.props.imageOptions.find(image => image._id === selectedCoverImageId);

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
        {
          <Card
            cover={(coverImageValue) &&
            <img alt={coverImageValue.description} src={`https://${coverImageValue.s3Bucket}.s3.amazonaws.com/${coverImageValue.s3Key}`} />}
          >
            <Form.Item label="Term Artwork">
              {getFieldDecorator('coverImage', {
                initialValue: (term.coverImage && term.coverImage._id) || null,
              })(
                <SelectImageTags placeholder="Select term artwork or image" images={this.props.imageOptions} />
              )}
            </Form.Item>
          </Card>
        }
        <Form.Item label="Definition">
          {getFieldDecorator('definition', {
            rules: [{ required: true }],
            initialValue: term.definition || null,
          })(
            <Input.TextArea autosize={{ minRows: 10 }} />
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