import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Row, Divider, Popconfirm } from 'antd';

import { imagesActions } from '../../actions';
import Loading from '../shared/Loading';

class ViewImage extends Component {
  componentDidMount() {
    this.props.getImage(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingImage) {
      this.props.history.push('/contents/artwork');
    }
  }

  render() {
    const { image, isGettingImage } = this.props;

    if (isGettingImage) {
      return (
        <Loading text="Loading Image..." />
      );
    }
    if (!image) {
      return (
        <div>
          <h1>Image Not Found</h1>
        </div>
      );
    }

    return (
      <div>
        <Row type="flex" justify="end">
          <Link to={`/contents/artwork/${image._id}/edit`}>Edit</Link>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this image?"
            onConfirm={() => {
              this.props.deleteImage(this.props.match.params.id);
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <a href={null}>Delete</a>
          </Popconfirm>
        </Row>
        <h1>{image.title && image.title}</h1>
        <h2>Description</h2>
        <p>{image.description && image.description}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  image: state.images.image,
  isGettingImage: state.images.isGettingImage,
  isDeletingImage: state.images.isDeletingImage,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getImage: imagesActions.getImage,
  deleteImage: imagesActions.deleteImage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewImage);