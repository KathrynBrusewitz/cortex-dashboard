import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Tag, Button, Row, Col, Divider } from 'antd';

import { contentActions } from '../../actions';
import Loading from '../shared/Loading';
import Stat from '../shared/Stat';

class ViewArticle extends Component {
  componentDidMount() {
    this.props.getContent(this.props.match.params.id);
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
          <h1>Article Not Found</h1>
        </div>
      );
    }

    return (
      <div>
        <Row type="flex" justify="end">
          <Link to={`/articles/${content._id}/edit`}>Edit</Link>
          <Divider type="vertical" />
          <Link to="/articles">Delete</Link>
          <Divider type="vertical" />
          <Link to="/articles">Unpublish</Link>
          <Divider type="vertical" />
          <Stat stat={124} icon="eye-o" tooltip="124 views" />
          <Divider type="vertical" />
          <Stat stat={46} icon="book" tooltip="46 bookmarks" />
        </Row>
        <h1>{content.title}</h1>
        <p>Last Updated: {content.updateTime}</p>
        <p>Published: {content.publishTime && content.publishTime}</p>
        {content.body && content.body}
        <h2>Description</h2>
        {content.description && content.description}

        <div>
          <div style={{ marginRight: 8, display: 'inline-block' }}>Categories:</div>
          <Tag>Physiology</Tag><Tag>Anatomy</Tag><Tag>Behavioral</Tag>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.content.content,
  isGettingContent: state.content.isGettingContent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getContent: contentActions.getContent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);