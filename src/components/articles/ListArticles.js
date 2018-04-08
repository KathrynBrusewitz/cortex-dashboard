import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Divider, Icon, Button, Row, Col } from 'antd';
import Stat from '../shared/Stat';

import { alertActions } from '../../actions';

const dataSource = [];
for (let i = 0; i < 46; i++) {
  if (Math.round(Math.random()) < 0.5) {
    dataSource.push({
      key: i,
      title: `Article Title ${i}`,
      writers: 'Corey, Troy, Kathryn',
      status: 'Published',
      editTime: 'April 5, 2018 8:31 AM',
      publishTime: 'April 5, 2018 9:23 AM',
      views: Math.round(Math.random() * 100),
      bookmarks: Math.round(Math.random() * 100),
    });
  } else {
    dataSource.push({
      key: i,
      title: `Article Title ${i}`,
      writers: 'Corey, Troy, Kathryn',
      status: 'Not Published',
      editTime: 'April 5, 2018 8:31 AM',
      views: 0,
      bookmarks: 0,
    });
  }
}

const columns = [{
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'Writers',
  dataIndex: 'writers',
  key: 'writers',
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
}, {
  title: 'Edit Time',
  dataIndex: 'editTime',
  key: 'editTime',
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
      <a href="/podcasts">View</a>
      <Divider type="vertical" />
      <a href="/articles">Edit</a>
      <Divider type="vertical" />
      <a href="/articles">Delete</a>
      {!record.publishTime 
        ? <span><Divider type="vertical" /><a href="/articles">Publish</a></span>
        : <span><Divider type="vertical" /><a href="/articles">Unpublish</a></span>
      }
    </span>
  ),
}, {
  title: 'Stats',
  dataIndex: 'stats',
  key: 'stats',
  render: (text, record) => (
    <span>
      <Stat stat={record.views} icon="eye-o" tooltip={`${record.views} views`} />
      <Divider type="vertical" />
      <Stat stat={record.bookmarks} icon="book" tooltip={`${record.bookmarks} bookmarks`}/>
    </span>
  ),
}];

class ListArticles extends Component {
  state = {
    selectedRowKeys: [],
    // TODO: Remove after API is hooked up
    loading: false,
  };

  // TODO: Remove after API is hooked up
  start = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.success(`Successfully published ${this.state.selectedRowKeys.length} articles!`);
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
        <h1>Articles</h1>
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
                {hasSelected ? `Selected ${selectedRowKeys.length} articles` : ''}
              </span>
            </Col>
            <Col>
            <Button
              type="primary"
            >
              Create New Article
            </Button>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...alertActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(ListArticles);
