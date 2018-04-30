import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TermForm from './TermForm';
import Loading from '../shared/Loading';

import { termsActions } from '../../actions';

class EditTerm extends Component {
  componentDidMount() {
    this.props.getTerm(this.props.match.params.id);
  }

  render() {
    const { updateTerm, isUpdatingTerm, term, isGettingTerm } = this.props;

    if (isGettingTerm) {
      return (
        <Loading text="Loading Form..." />
      );

    }

    if (!term) {
      return (
        <p>
          Form unavailable. Error occurred while loading users and content.
        </p>
      );
    }

    return (
      <div>
        <h1>Update Term</h1>
        <TermForm onSubmit={updateTerm} loading={isUpdatingTerm} edit={true} initialValues={term} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isUpdatingTerm: state.terms.isUpdatingTerm,
  isGettingTerm: state.terms.isGettingTerm,
  term: state.terms.term,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTerm: termsActions.updateTerm,
  getTerm: termsActions.getTerm,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditTerm);
