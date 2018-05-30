import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TermForm from './TermForm';
import Loading from '../shared/Loading';

import { termsActions, imagesActions } from '../../actions';

class CreateTerm extends Component {
  componentDidMount() {
    this.props.getImages();
  }

  render() {
    const { createTerm, isCreatingTerm, isGettingImages, images } = this.props;

    if (isCreatingTerm || isGettingImages) {
      return (
        <Loading text="Loading Form..." />
      );
    }

    return (
      <div>
        <h1>Create New Term</h1>
        <TermForm onSubmit={createTerm} loading={isCreatingTerm} imageOptions={images} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingTerm: state.terms.isCreatingTerm,
  isGettingImages: state.images.isGettingImages,
  images: state.images.images,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createTerm: termsActions.createTerm,
  getImages: imagesActions.getImages,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateTerm);
