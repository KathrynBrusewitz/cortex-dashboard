import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Button, Row, Col, Popconfirm } from 'antd';
import Loading from '../shared/Loading';
import AvatarList from '../shared/AvatarList';

import { contentActions } from '../../actions';

class ListVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.props.getContents({ type: 'video' });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingContent) {
      this.props.getContents({ type: 'video' });
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  getColumns() {
    return [{
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 250,
    }, {
      title: 'Creators',
      dataIndex: 'creators',
      key: 'creators',
      render: (text, record) => <AvatarList users={record.creators} />,
    }, {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: 'Publish Time',
      dataIndex: 'publishTime',
      key: 'publishTime',
    }, {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    }, {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/videos/${record._id}`}>View</Link>
          <Divider type="vertical" />
          <Link to={`/videos/${record._id}/edit`}>Edit</Link>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this video?"
            onConfirm={() => {
              this.props.deleteContent(record._id);
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <a href={null}>Delete</a>
          </Popconfirm>
        </span>
      ),
    }];
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    if (this.props.isGettingContents || this.props.isDeletingContent) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <h1>Videos</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Button
                type="primary"
                disabled={!hasSelected}
              >
                Publish
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} videos` : ''}
              </span>
            </Col>
            <Col>
              <Link to={'/videos/new'}>
                <Button type="primary">
                  Create New Video
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={this.props.contents} columns={this.getColumns()} loading={this.props.isGettingContents} rowKey={record => record._id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contents: state.content.contents,
  isGettingContents: state.content.isGettingContents,
  isDeletingContent: state.content.isDeletingContent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getContents: contentActions.getContents,
  deleteContent: contentActions.deleteContent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListVideos);
