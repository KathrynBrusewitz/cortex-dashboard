import React, { Component } from 'react';
import { Form, Input, Button, Radio, Steps, Card } from 'antd';
import SelectUserTags from '../shared/SelectUserTags';
import SelectImageTags from '../shared/SelectImageTags';
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
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const content = this.props.content || {};
    const { currentStep } = this.state;
    const steps = ['Details','Article','Save'];
    const selectedCoverImageId = getFieldValue('coverImage');
    const coverImageValue = this.props.imageOptions.find(image => image._id === selectedCoverImageId);

    return (
      <Form onSubmit={this.handleSubmit}>
        <Steps current={currentStep} size="small">
          {steps.map(s => <Steps.Step key={s} title={s} />)}
        </Steps>
        <div style={{ marginTop: 50, marginBottom: 50 }}>
          { <div style={ currentStep !== 0 ? { display: 'none' } : {}}>
              <Form.Item label="Title">
                {getFieldDecorator('title', {
                  rules: [{ required: true }],
                  initialValue: content.title || null,
                })(
                  <Input />
                )}
              </Form.Item>
              {
                <Card
                  cover={(selectedCoverImageId && coverImageValue) &&
                  <img alt={coverImageValue.description} src={`https://${coverImageValue.s3Bucket}.s3.amazonaws.com/${coverImageValue.s3Key}`} />}
                >
                  <Form.Item label="Cover Artwork">
                    {getFieldDecorator('coverImage', {
                      initialValue: (content.coverImage && content.coverImage._id) || null,
                    })(
                      <SelectImageTags placeholder="Select cover artwork" images={this.props.imageOptions} />
                    )}
                  </Form.Item>
                </Card>
              }
              <Form.Item label="Short Description" help="Summarize or describe the article. This shows up underneath the title when scrolling through content">
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
            </div>
          }
          { <div style={ currentStep !== 1 ? { display: 'none' } : {}}>
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
          }
          {
            <div style={ currentStep !== 2 ? { display: 'none' } : {}}>
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
          }
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