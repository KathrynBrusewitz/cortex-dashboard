import React, { Component } from 'react';
import { Table, Divider, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Stat from '../shared/Stat';

const dataSource = [];
for (let i = 0; i < 46; i++) {
  if (Math.round(Math.random()) < 0.5) {
    dataSource.push({
      key: i,
      title: `Video Title ${i}`,
      creators: 'Corey, Troy, Kathryn',
      status: 'Published',
      publishTime: 'April 5, 2018 9:23 AM',
      duration: '0h : 45m : 02s',
      plays: Math.round(Math.random() * 100),
      bookmarks: Math.round(Math.random() * 100),
    });
  } else {
    dataSource.push({
      key: i,
      title: `Video Title ${i}`,
      creators: 'Corey, Troy, Kathryn',
      status: 'Not Published',
      duration: '1h : 36m : 30s',
      plays: 0,
      bookmarks: 0,
    });
  }
}

const columns = [{
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'Creators',
  dataIndex: 'creators',
  key: 'creators',
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
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
      <Link to="/videos/_id">View</Link>
      <Divider type="vertical" />
      <Link to="/videos/_id/edit">Edit</Link>
      <Divider type="vertical" />
      <Link to="/videos">Delete</Link>
      {!record.publishTime 
        ? <span><Divider type="vertical" /><Link to="/videos">Publish</Link></span>
        : <span><Divider type="vertical" /><Link to="/videos">Unpublish</Link></span>
      }
    </span>
  ),
}, {
  title: 'Stats',
  dataIndex: 'stats',
  key: 'stats',
  render: (text, record) => (
    <span>
      <Stat stat={record.plays} icon="play-circle-o" tooltip={`${record.plays} plays`} />
      <Divider type="vertical" />
      <Stat stat={record.bookmarks} icon="book" tooltip={`${record.bookmarks} bookmarks`}/>
    </span>
  ),
}];

class ListVideos extends Component {
  state = {
    selectedRowKeys: [],
    // TODO: Remove after API is hooked up
    loading: false,
  };

  // TODO: Remove after API is hooked up
  start = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <h1>Videos</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Button
                type="primary"
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
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
                  Upload New Video
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default ListVideos;
