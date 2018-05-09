import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Button, Row, Col, Popconfirm, Icon } from 'antd';
import moment from 'moment';
import Loading from '../shared/Loading';

import { contentActions } from '../../actions';
import AvatarList from '../shared/AvatarList';

class ListArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  rehydrateState() {
    this.props.getContents({ type: 'article' })
  }

  componentDidMount() {
    this.rehydrateState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingContent) {
      this.rehydrateState();
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
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
        title: 'Writers',
        dataIndex: 'creators',
        key: 'creators',
        render: (text, record) => <AvatarList users={record.creators} />,
      }, {
        title: 'Status',
        dataIndex: 'state',
        key: 'state',
        sorter: (a, b) => a.state.localeCompare(b.state),
      }, {
        title: 'Updated',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text, record) => moment(text).fromNow(),
        sorter: (a, b) => moment(a.updateTime).diff(moment(b.updateTime)),
      }, {
        title: 'Published',
        dataIndex: 'publishTime',
        key: 'publishTime',
        render: (text, record) => text ? moment(text).fromNow() : null,
        sorter: (a, b) => {
          const aTime = a.publishTime ? moment(a.publishTime).unix() : 0;
          const bTime = b.publishTime ? moment(b.publishTime).unix() : 0;
          return aTime - bTime;
        },
      }, {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Link to={`/contents/articles/${record._id}`}>View</Link>
            <Divider type="vertical" />
            <Link to={`/contents/articles/${record._id}/edit`}>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this article?"
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
      }]
    );
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
                {hasSelected ? `Selected ${selectedRowKeys.length} articles` : ''}
              </span>
            </Col>
            <Col>
              <Link to={'/contents/articles/new'}>
                <Button type="primary">
                  Create New Article
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={this.props.contents} columns={this.getColumns()} loading={this.props.isGettingContents || this.props.isDeletingContent} rowKey={record => record._id} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListArticles);
