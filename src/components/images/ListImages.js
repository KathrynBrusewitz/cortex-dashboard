import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Button, Row, Col, Popconfirm } from 'antd';
import Loading from '../shared/Loading';
import AvatarList from '../shared/AvatarList';

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

  getColumns() {
    return (
      [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: 250,
        sorter: (a, b) => a.title.localeCompare(b.title),
      }, {
        title: 'Artists',
        dataIndex: 'artists',
        key: 'artists',
        render: (text, record) => <AvatarList users={record.artists} />,
      }, {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Link to={`/contents/artwork/${record._id}`}>View</Link>
            <Divider type="vertical" />
            {/* <Link to={`/contents/artwork/${record._id}/edit`}>Edit</Link>
            <Divider type="vertical" /> */}
            <Popconfirm
              title="Delete this image?"
              onConfirm={() => {
                this.props.deleteImage(record._id);
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <a href={null}>Delete</a>
            </Popconfirm>
          </span>
        ),
      }]
    );
  }

  render() {
    if (this.props.isGettingImages || this.props.isDeletingImage) {
      return (
        <Loading />
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
        <Table
          dataSource={this.props.images}
          columns={this.getColumns()} 
          loading={this.props.isGettingImages || this.props.isDeletingImage} 
          rowKey={record => record._id} 
        />
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
