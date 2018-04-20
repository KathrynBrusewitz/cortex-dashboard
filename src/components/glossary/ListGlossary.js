import React, { Component } from 'react';
import { Table, Divider, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Stat from '../shared/Stat';

const dataSource = [];
for (let i = 0; i < 46; i++) {
  dataSource.push({
    key: i,
    term: `Scientific Term ${i}`,
    definition: 'Lorem ipsum dolor sit amet, consectetur...',
    articles: Math.round(Math.random() * 100),
    bookmarks: Math.round(Math.random() * 100),
  });
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
  title: 'Stats',
  dataIndex: 'stats',
  key: 'stats',
  render: (text, record) => (
    <span>
      <Stat stat={record.articles} icon="profile" tooltip={`${record.articles} article appearances`}/>
      <Divider type="vertical" />
      <Stat stat={record.bookmarks} icon="book" tooltip={`${record.bookmarks} bookmarks`}/>
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
              <Link to="/glossary/edit">
                <Button type="primary">
                  Add New Terms
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} expandedRowRender={record => <p style={{ margin: 0 }}>{record.definition}</p>} />
      </div>
    );
  }
}

export default Glossary;
