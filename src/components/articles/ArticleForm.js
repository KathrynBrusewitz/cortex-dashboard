import React, { Component } from 'react';
import { Form, Input, Button, Radio, Steps } from 'antd';
import SelectUserTags from '../shared/SelectUserTags';
import TextEditor from '../editor/TextEditor';

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }
  nextStep() {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
  }
  prevStep() {
    const currentStep = this.state.currentStep - 1;
    this.setState({ currentStep });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, options) => {
      if (!err) {
        console.log(options);
        if (this.props.content) {
          this.props.onSubmit({...options, type: "article"}, this.props.content._id);
        } else {
          this.props.onSubmit({...options, type: "article"});
        }
      }
    });
  }

  render() {
    const { currentStep } = this.state;
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const content = this.props.content || {};

    const steps = [{
      title: 'Details',
      content: (
        <div>
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
              <Input.TextArea autosize={{ minRows: 4 }} />
            )}
          </Form.Item>
          <Form.Item label="Writers">
            {getFieldDecorator('creators', {
              initialValue: (content.creators && content.creators.map(c => c._id)) || [],
            })(
              <SelectUserTags placeholder="Select writers" users={this.props.creatorOptions} />
            )}
          </Form.Item>
          <Form.Item label="Artists">
            {getFieldDecorator('artists', {
              initialValue: (content.artists && content.artists.map(a => a._id)) || [],
            })(
              <SelectUserTags placeholder="Select artists" users={this.props.creatorOptions} />
            )}
          </Form.Item>
        </div>
      ),
    }, {
      title: 'Article',
      content: (
        <div>
          <Form.Item>
            {getFieldDecorator('bodySlate', {
              rules: [{ required: true }],
              initialValue: content.bodySlate || null,
            })(
              <TextEditor />
            )}
          </Form.Item>
          {/* <Form.Item label="References">
            {getFieldDecorator('references', {
              initialValue: content.references || null,
            })(
              <Input.TextArea autosize={{ minRows: 5 }} />
            )}
          </Form.Item> */}
        </div>
      ),
    }, {
      title: 'Save',
      content: (
        <div>
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
        </div>
      ),
    }];

    return (
      <Form onSubmit={this.handleSubmit}>
        <Steps current={currentStep} size="small">
          {steps.map(item => <Steps.Step key={item.title} title={item.title} />)}
        </Steps>
        <div style={{ marginTop: 50, marginBottom: 50 }}>
          {steps[this.state.currentStep].content}
        </div>
        <div style={{ marginBottom: 50 }}>
          {
            this.state.currentStep < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.nextStep()}>Next</Button>
          }
          {
            this.state.currentStep === steps.length - 1
            &&
            <Button type="primary" htmlType="submit" loading={loading}>
              {this.props.edit ? 'Update Article' : 'Create Article'}
            </Button>
          }
          {
            this.state.currentStep > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prevStep()}>
              Previous
            </Button>
          }
        </div>
      </Form>
    );
  }
}

export default Form.create()(ArticleForm);