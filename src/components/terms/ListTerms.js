import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Divider, Button, Row, Col, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import Loading from '../shared/Loading';

import { termsActions } from '../../actions';

class ListTerms extends Component {
  rehydrateState() {
    this.props.getTerms();
  }

  componentDidMount() {
    this.rehydrateState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingTerm) {
      this.rehydrateState();
    }
  }

  getColumns() {
    return (
      [{
        title: 'Term',
        dataIndex: 'term',
        key: 'term',
        width: 200,
        sorter: (a, b) => a.term.localeCompare(b.term),
      }, {
        title: 'Definition',
        dataIndex: 'definition',
        key: 'definition',
      }, {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        width: 150,
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
              <Link to="/terms/new">
                <Button type="primary">
                  Add New Term
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table
          dataSource={this.props.terms} 
          columns={this.getColumns()} 
          expandedRowRender={record => (
            <div>
              <h2>Definition</h2>
              <p>{record.definition}</p>
            </div>
          )} 
          loading={this.props.isGettingTerms || this.props.isDeletingTerm} 
          rowKey={record => record._id} 
        />
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
