import React, { Component } from 'react';
import { Form, Icon, Input, Button, Radio } from 'antd';
import CheckableTags from '../shared/CheckableTags';
import Mentions from '../shared/Mentions';
import SelectTags from '../shared/SelectTags';
import DateTimePicker from '../shared/DateTimePicker';

class EventForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.props.onSubmit(values);
        console.log('created event!');
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
        <Form.Item label="Description" help="Summarize or describe the event under 160 characters. This shows up underneath the title when scrolling through content">
          <Input />
        </Form.Item>
        <Form.Item label="Date and Time">
          <DateTimePicker />
        </Form.Item>
        <Form.Item label="Event Details" help="Will soon support Markdown">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <CheckableTags />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {this.props.edit ? 'Update Event' : 'Publish Event'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(EventForm);