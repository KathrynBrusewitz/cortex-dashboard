import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TermForm from './TermForm';
import Loading from '../shared/Loading';

import { termsActions } from '../../actions';

class CreateTerm extends Component {
  render() {
    const { createTerm, isCreatingTerm } = this.props;

    return (
      <div>
        <h1>Create New Term</h1>
        <TermForm onSubmit={createTerm} loading={isCreatingTerm} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingTerm: state.terms.isCreatingTerm,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createTerm: termsActions.createTerm,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateTerm);
