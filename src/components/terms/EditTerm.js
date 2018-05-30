import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TermForm from './TermForm';
import Loading from '../shared/Loading';

import { termsActions, imagesActions } from '../../actions';

class EditTerm extends Component {
  componentDidMount() {
    this.props.getTerm(this.props.match.params.id);
    this.props.getImages();
  }

  render() {
    const { updateTerm, isUpdatingTerm, term, isGettingTerm, isGettingImages, images } = this.props;

    if (isGettingTerm || isGettingImages) {
      return (
        <Loading text="Loading Form..." />
      );

    }

    if (!term) {
      return (
        <p>
          Form unavailable. Error occurred while loading term.
        </p>
      );
    }

    return (
      <div>
        <h1>Update Term</h1>
        <TermForm onSubmit={updateTerm} loading={isUpdatingTerm} edit={true} term={term} imageOptions={images} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isUpdatingTerm: state.terms.isUpdatingTerm,
  isGettingTerm: state.terms.isGettingTerm,
  isGettingImages: state.images.isGettingImages,
  images: state.images.images,
  term: state.terms.term,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTerm: termsActions.updateTerm,
  getTerm: termsActions.getTerm,
  getImages: imagesActions.getImages,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditTerm);
