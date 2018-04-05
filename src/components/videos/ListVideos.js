import React, { Component } from 'react';
import { Table, Divider, Icon, Button, Row, Col } from 'antd';

const dataSource = [];
for (let i = 0; i < 46; i++) {
  if (Math.round(Math.random()) < 0.5) {
    dataSource.push({
      key: i,
      title: `Video Title ${i}`,
      creators: 'Corey, Troy, Kathryn',
      status: 'Published',
      publishTime: 'April 5, 2018 9:23 AM',
    });
  } else {
    dataSource.push({
      key: i,
      title: `Video Title ${i}`,
      creators: 'Corey, Troy, Kathryn',
      status: 'Not Published',
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
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  render: (text, record) => (
    <span>
      <a href="/videos">View</a>
      <Divider type="vertical" />
      <a href="/videos">Edit</a>
      <Divider type="vertical" />
      <a href="/videos">Delete</a>
      {!record.publishTime 
        ? <span><Divider type="vertical" /><a href="/podcasts">Publish</a></span>
        : <span><Divider type="vertical" /><a href="/podcasts">Unpublish</a></span>
      }
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
            <Button
              type="primary"
            >
              Upload New Video
            </Button>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default ListVideos;
