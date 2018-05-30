import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ImageForm from './ImageForm';
import Loading from '../shared/Loading';

import { imagesActions } from '../../actions';
import { usersActions } from '../../actions';

class EditImage extends Component {
  componentDidMount() {
    this.props.getUsers({ roles: [ 'admin', 'writer', 'artist' ] });
    this.props.getImage(this.props.match.params.id);
  }

  render() {
    const { updateImage, isUpdatingImage, users, isGettingUsers, isGettingImage, image } = this.props;

    if (isGettingUsers || isGettingImage) {
      return (
        <Loading text="Loading Form..." />
      );

    }

    if (!users || !image) {
      return (
        <p>
          Form unavailable. Error occurred while loading users and image.
        </p>
      );
    }

    return (
      <div>
        <h1>Update Artwork</h1>
        <ImageForm onSubmit={updateImage} loading={isUpdatingImage} artistOptions={users} edit={true} image={image} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isUpdatingImage: state.images.isUpdatingImage,
  isGettingImage: state.images.isGettingImage,
  isGettingUsers: state.users.isGettingUsers,
  users: state.users.users,
  image: state.images.image,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateImage: imagesActions.updateImage,
  getUsers: usersActions.getUsers,
  getImage: imagesActions.getImage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditImage);
