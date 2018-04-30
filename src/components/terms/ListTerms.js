import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Divider, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Stat from '../shared/Stat';
import Loading from '../shared/Loading';

import { termsActions } from '../../actions';

const columns = [{
  title: 'Term',
  dataIndex: 'term',
  key: 'term',
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
}, {
  title: 'Stats',
  dataIndex: 'stats',
  key: 'stats',
}];

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

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    if (this.props.isGettingTerms) {
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
        <Table rowSelection={rowSelection} dataSource={this.props.terms} columns={columns} expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>} rowKey={record => record._id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  terms: state.terms.terms,
  isGettingTerms: state.users.isGettingTerms,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTerms: termsActions.getTerms,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListTerms);
