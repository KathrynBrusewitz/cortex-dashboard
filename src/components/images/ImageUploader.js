import React, { Component } from 'react';
import { Upload, Button, Icon } from 'antd';

class ImageUploader extends Component {
  render() {
    return(
      <Upload
        {...this.props}
        name="logo"
        action="/upload.do"
        listType="picture"
        multiple={false}
        beforeUpload={(file) => {
          return false;
        }}
      >
        <Button>
          <Icon type="upload" /> Click to upload
        </Button>
      </Upload>
    );
  }
}

export default ImageUploader;
