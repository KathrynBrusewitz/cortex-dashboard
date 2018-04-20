import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Tag, Button, Row, Col, Divider } from 'antd';

import { eventActions } from '../../actions';
import Loading from '../shared/Loading';
import Stat from '../shared/Stat';

class ViewEvent extends Component {
  render() {
    return this.props.isLoadingEvent ? (
      <Loading text="Retrieving Event" />
    ) : (
      <div>
        <Row type="flex" justify="end">
          <Link to="/events/_id/edit">Edit</Link>
          <Divider type="vertical" />
          <Link to="/events">Delete</Link>
          <Divider type="vertical" />
          <Stat stat={15} icon="smile-o" tooltip="15 going" />
        </Row>
        <h1>Event Title</h1>

        <p><i>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</i></p>
        
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt massa quis sapien semper convallis. Curabitur metus risus, auctor in enim ac, finibus pellentesque augue. Nulla vitae mi at ante suscipit fermentum. Nullam lacinia non libero at consectetur. Mauris in pretium nunc. Nam consectetur justo sed dolor condimentum bibendum. Praesent elementum eleifend lectus, ac condimentum ipsum ultrices vitae.</p>

        <p>Aliquam rutrum libero quis ante ultricies, vitae egestas velit semper. Aliquam vehicula libero in ante ultrices, at ultrices est malesuada. Donec volutpat, augue et rutrum consectetur, mi sem iaculis lacus, eu hendrerit purus mauris in ipsum. Sed vitae hendrerit nisl. Donec vitae libero et tortor lacinia pretium nec sit amet nulla. Nam tincidunt congue libero, at egestas sapien consequat eu. Nullam accumsan odio non tristique hendrerit. Praesent lobortis egestas feugiat. Ut sed dolor quis nibh consectetur condimentum non in ante. Aliquam nec risus auctor, convallis ex non, iaculis orci. Donec tortor est, maximus non mattis a, sollicitudin quis odio. Sed vitae scelerisque nunc.</p>
      </div>
    );
  }
}

// expects eventId

const mapStateToProps = state => ({
  // event: state.events.event,
  // isLoadingEvent: state.events.event.isLoading,
  // formValues: state.form.eventForm || {},
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...eventActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);