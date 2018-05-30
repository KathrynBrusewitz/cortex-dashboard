import React, { Component } from 'react';
import moment from 'moment';
import { Form, Input, Button, Card } from 'antd';
import DateTimePicker from '../shared/DateTimePicker';
import SelectImageTags from '../shared/SelectImageTags';

const removeKey = (object, key) => {
  const {[key]: deletedKey, ...otherKeys} = object;
  return otherKeys;
}

class EventForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        const fields = {
          ...removeKey(options, 'dateStartEnd'),
          dateStart: options.dateStartEnd[0],
          dateEnd: options.dateStartEnd[1],
        };
        if (this.props.event) {
          this.props.onSubmit(fields, this.props.event._id);
        } else {
          this.props.onSubmit(fields);
        }
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const event = this.props.event || {};
    const selectedCoverImageId = getFieldValue('coverImage');
    const coverImageValue = this.props.imageOptions.find(image => image._id === selectedCoverImageId);

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Event Title">
          {getFieldDecorator('title', {
            rules: [{ required: true }],
            initialValue: event.title || null,
          })(
            <Input />
          )}
        </Form.Item>
        {
          <Card
            cover={(selectedCoverImageId && coverImageValue) &&
            <img alt={coverImageValue.description} src={`https://${coverImageValue.s3Bucket}.s3.amazonaws.com/${coverImageValue.s3Key}`} />}
          >
            <Form.Item label="Event Artwork">
              {getFieldDecorator('coverImage', {
                initialValue: (event.coverImage && event.coverImage._id) || null,
              })(
                <SelectImageTags placeholder="Select event artwork or image" images={this.props.imageOptions} />
              )}
            </Form.Item>
          </Card>
        }
        <Form.Item label="URL">
          {getFieldDecorator('url', {
            rules: [{ required: true }],
            initialValue: event.url || null,
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Location">
          {getFieldDecorator('location', {
            rules: [{ required: true }],
            initialValue: event.location || null,
          })(
            <Input.TextArea autosize={{ minRows: 3 }} />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true }],
            initialValue: event.description || null,
          })(
            <Input.TextArea autosize={{ minRows: 5 }} />
          )}
        </Form.Item>
        <Form.Item label="Date and Time">
          {getFieldDecorator('dateStartEnd', {
            // The value/defaultValue of RangePicker must be a moment object array after `antd@2.0`, see: https://u.ant.design/date-picker-value
            initialValue: [moment(event.dateStart), moment(event.dateEnd)] || null,
          })(
            <DateTimePicker />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {this.props.edit ? 'Update Event' : 'Publish Event'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EventForm);