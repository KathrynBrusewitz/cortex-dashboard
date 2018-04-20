import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Tag, Button, Row, Col, Divider } from 'antd';

import { videoActions } from '../../actions';
import Loading from '../shared/Loading';
import Stat from '../shared/Stat';

class ViewVideo extends Component {
  render() {
    return this.props.isLoadingVideo ? (
      <Loading text="Retrieving Video" />
    ) : (
      <div>
        <Row type="flex" justify="end">
          <Link to="/videos/_id/edit">Edit</Link>
          <Divider type="vertical" />
          <Link to="/videos">Delete</Link>
          <Divider type="vertical" />
          <Link to="/videos">Unpublish</Link>
          <Divider type="vertical" />
          <Stat stat={124} icon="play-circle-o" tooltip="124 listens" />
          <Divider type="vertical" />
          <Stat stat={46} icon="book" tooltip="46 bookmarks" />
        </Row>
        <h1>Video Title</h1>
        <p><i>Hosted by Finibus, Bonorum, Malorum</i></p>

        <p><i>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</i></p>
        
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt massa quis sapien semper convallis. Curabitur metus risus, auctor in enim ac, finibus pellentesque augue. Nulla vitae mi at ante suscipit fermentum. Nullam lacinia non libero at consectetur. Mauris in pretium nunc. Nam consectetur justo sed dolor condimentum bibendum. Praesent elementum eleifend lectus, ac condimentum ipsum ultrices vitae.</p>

        <p>Aliquam rutrum libero quis ante ultricies, vitae egestas velit semper. Aliquam vehicula libero in ante ultrices, at ultrices est malesuada. Donec volutpat, augue et rutrum consectetur, mi sem iaculis lacus, eu hendrerit purus mauris in ipsum. Sed vitae hendrerit nisl. Donec vitae libero et tortor lacinia pretium nec sit amet nulla. Nam tincidunt congue libero, at egestas sapien consequat eu. Nullam accumsan odio non tristique hendrerit. Praesent lobortis egestas feugiat. Ut sed dolor quis nibh consectetur condimentum non in ante. Aliquam nec risus auctor, convallis ex non, iaculis orci. Donec tortor est, maximus non mattis a, sollicitudin quis odio. Sed vitae scelerisque nunc.</p>

        <h3>References</h3>
        <p>Fusce nec tortor ac sapien dapibus varius in sit amet leo. In ac ante nisi. Nulla sit amet quam ut nulla tincidunt rutrum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut accumsan est.</p><p>Fusce eu accumsan elit, nec egestas neque. Praesent vel placerat sapien.</p>

        <div>
          <div style={{ marginRight: 8, display: 'inline-block' }}>Categories:</div>
          <Tag>Physiology</Tag><Tag>Anatomy</Tag><Tag>Behavioral</Tag>
        </div>
      </div>
    );
  }
}

// expects videoId

const mapStateToProps = state => ({
  // video: state.videos.video,
  // isLoadingVideo: state.videos.video.isLoading,
  // formValues: state.form.videoForm || {},
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...videoActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewVideo);