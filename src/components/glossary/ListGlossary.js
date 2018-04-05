import React, { Component } from 'react';
import { Table, Divider, Icon, Button, Row, Col } from 'antd';

const dataSource = [];
for (let i = 0; i < 46; i++) {
  if (Math.round(Math.random()) < 0.5) {
    dataSource.push({
      key: i,
      term: `Scientific Term ${i}`,
      definition: 'Lorem ipsum dolor sit amet, consectetur...',
    });
  } else {
    dataSource.push({
      key: i,
      term: `Scientific Term ${i}`,
      definition: 'Lorem ipsum dolor sit amet, consectetur...',
    });
  }
}

const columns = [{
  title: 'Term',
  dataIndex: 'term',
  key: 'term',
}, {
  title: 'Definition',
  dataIndex: 'definition',
  key: 'definition',
}, {
  title: 'Tags',
  dataIndex: 'tags',
  key: 'tags',
}, {
  title: 'Articles',
  dataIndex: 'articles',
  key: 'articles',
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  render: (text, record) => (
    <span>
      <a href="/glossary">View</a>
      <Divider type="vertical" />
      <a href="/glossary">Edit</a>
      <Divider type="vertical" />
      <a href="/glossary">Delete</a>
    </span>
  ),
}];

class Glossary extends Component {
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
        <h1>Glossary</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Button
                type="danger"
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
              >
                Delete
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} terms` : ''}
              </span>
            </Col>
            <Col>
            <Button
              type="primary"
            >
              Add New Terms
            </Button>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default Glossary;
