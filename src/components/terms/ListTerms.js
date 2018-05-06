import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Divider, Button, Row, Col, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import Loading from '../shared/Loading';

import { termsActions } from '../../actions';

class ListTerms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.props.getTerms();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingTerm) {
      this.props.getTerms();
    }
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  getColumns() {
    return (
      [{
        title: 'Term',
        dataIndex: 'term',
        key: 'term',
        width: 240,
      }, {
        title: 'Definition',
        dataIndex: 'definition',
        key: 'definition',
      }, {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Link to={`/terms/${record._id}/edit`}>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this term?"
              onConfirm={() => {
                this.props.deleteTerm(record._id);
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

    if (this.props.isGettingTerms || this.props.isDeletingTerm) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <h1>Terms</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Button
                type="danger"
                disabled={!hasSelected}
              >
                Delete
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} terms` : ''}
              </span>
            </Col>
            <Col>
              <Link to="/terms/new">
                <Button type="primary">
                  Add New Term
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={this.props.terms} columns={this.getColumns()} expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>} loading={this.props.isGettingTerms || this.props.isDeletingTerm} rowKey={record => record._id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  terms: state.terms.terms,
  isGettingTerms: state.terms.isGettingTerms,
  isDeletingTerm: state.terms.isDeletingTerm,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTerms: termsActions.getTerms,
  deleteTerm: termsActions.deleteTerm,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListTerms);
