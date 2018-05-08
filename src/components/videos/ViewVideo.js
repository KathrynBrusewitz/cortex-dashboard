import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Row, Divider, Popconfirm } from 'antd';

import { contentActions } from '../../actions';
import Loading from '../shared/Loading';
import Stat from '../shared/Stat';

class ViewVideo extends Component {
  componentDidMount() {
    this.props.getContent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingContent) {
      this.props.history.push('/videos');
    }
  }

  render() {
    const { content, isGettingContent } = this.props;

    if (isGettingContent) {
      return (
        <Loading text="Loading Content..." />
      );
    }
    if (!content) {
      return (
        <div>
          <h1>Video Not Found</h1>
        </div>
      );
    }

    return (
      <div>
        <Row type="flex" justify="end">
          <Link to={`/contents/videos/${content._id}/edit`}>Edit</Link>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this article?"
            onConfirm={() => {
              this.props.deleteContent(this.props.match.params.id);
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <a href={null}>Delete</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Stat stat={124} icon="eye-o" tooltip="124 views" />
          <Divider type="vertical" />
          <Stat stat={46} icon="book" tooltip="46 bookmarks" />
        </Row>
        <h1>{content.title}</h1>
        <p>{content.body && content.body}</p>
        <h2>Description</h2>
        <p>{content.description && content.description}</p>
        <h3>Last Updated: {content.updateTime}</h3>
        <h3>Published: {content.publishTime && content.publishTime}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.content.content,
  isGettingContent: state.content.isGettingContent,
  isDeletingContent: state.content.isDeletingContent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getContent: contentActions.getContent,
  deleteContent: contentActions.deleteContent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewVideo);