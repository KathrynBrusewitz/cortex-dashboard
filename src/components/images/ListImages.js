import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Popconfirm, Card, Divider } from 'antd';
import Loading from '../shared/Loading';

import { imagesActions } from '../../actions';

class Listimages extends Component {
  rehydrateState() {
    this.props.getImages();
  }

  componentDidMount() {
    this.rehydrateState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingImage) {
      this.rehydrateState();
    }
  }

  render() {
    if (this.props.isGettingImages || this.props.isDeletingImage) {
      return (
        <Loading />
      );
    }

    if (!this.props.images) {
      return (
        <p>There are no images to display.</p>
      );
    }

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Link to={'/contents/artwork/new'}>
                <Button type="primary">
                  Upload New Artwork
                </Button>
              </Link>
            </Col>
          </Row>
        </div>

        <Row type="flex" justify="start" align="top" gutter={16}>
          {this.props.images.map(image => (
            <Col
              xs={24} sm={12} md={12} lg={8} xl={8}
              key={`card-${image.s3Key}`}
            >
              <Card
                style={{ marginBottom: 20 }}
                cover={<img alt={image.description} src={`https://${image.s3Bucket}.s3.amazonaws.com/${image.s3Key}`} />}
              >
                <Card.Meta
                  title={image.title}
                  description={
                  <div>
                    <p>{image.description}</p>
                    <p><b>Artist:</b> {image.artists.map(a => <span key={a._id} style={{ display: 'inline-block', paddingRight: 10 }}>{a.name}</span>)}</p>
                    <div>
                      <Popconfirm
                        title="Are you sure you want to delete this image?"
                        onConfirm={() => {
                          this.props.deleteImage(image._id);
                        }}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a href={null}>Delete</a>
                      </Popconfirm>
                      <Divider type="vertical" />
                      <Link to={`/contents/artwork/${image._id}/edit`}>
                        <span>Edit</span>
                      </Link>
                    </div>
                  </div>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  images: state.images.images,
  isGettingImages: state.images.isGettingImages,
  isDeletingImage: state.images.isDeletingImage,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getImages: imagesActions.getImages,
  deleteImage: imagesActions.deleteImage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Listimages);
