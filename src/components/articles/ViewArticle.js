import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Tag, Button, Row, Col, Divider } from 'antd';

import { articleActions } from '../../actions';
import Loading from '../shared/Loading';
import Stat from '../shared/Stat';

class ViewArticle extends Component {
  render() {
    return this.props.isLoadingArticle ? (
      <Loading text="Retrieving Article" />
    ) : (
      <div>
        <Row type="flex" justify="end">
          <Link to="/articles/_id/edit">Edit</Link>
          <Divider type="vertical" />
          <Link to="/articles">Delete</Link>
          <Divider type="vertical" />
          <Link to="/articles">Unpublish</Link>
          <Divider type="vertical" />
          <Stat stat={124} icon="eye-o" tooltip="124 views" />
          <Divider type="vertical" />
          <Stat stat={46} icon="book" tooltip="46 bookmarks" />
        </Row>
        <h1>Article Title</h1>
        <p><i>Written by Finibus, Bonorum, Malorum</i></p>

        <p><i>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</i></p>
        
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt massa quis sapien semper convallis. Curabitur metus risus, auctor in enim ac, finibus pellentesque augue. Nulla vitae mi at ante suscipit fermentum. Nullam lacinia non libero at consectetur. Mauris in pretium nunc. Nam consectetur justo sed dolor condimentum bibendum. Praesent elementum eleifend lectus, ac condimentum ipsum ultrices vitae.</p>

        <p>Aliquam rutrum libero quis ante ultricies, vitae egestas velit semper. Aliquam vehicula libero in ante ultrices, at ultrices est malesuada. Donec volutpat, augue et rutrum consectetur, mi sem iaculis lacus, eu hendrerit purus mauris in ipsum. Sed vitae hendrerit nisl. Donec vitae libero et tortor lacinia pretium nec sit amet nulla. Nam tincidunt congue libero, at egestas sapien consequat eu. Nullam accumsan odio non tristique hendrerit. Praesent lobortis egestas feugiat. Ut sed dolor quis nibh consectetur condimentum non in ante. Aliquam nec risus auctor, convallis ex non, iaculis orci. Donec tortor est, maximus non mattis a, sollicitudin quis odio. Sed vitae scelerisque nunc.</p>

        <h2>Augue in Varius</h2>
        <p>Ut leo ligula, ultricies eget aliquam ac, lobortis pharetra justo. Morbi interdum felis eget ante mattis, mollis condimentum leo congue. Maecenas a efficitur eros. Pellentesque non semper turpis. Donec pulvinar lacus sit amet risus commodo sodales. Integer a bibendum lorem. Cras eget aliquam diam, eu rutrum dolor. Ut luctus augue in varius cursus. Vivamus consequat laoreet quam, ut semper dolor dapibus id. Aliquam ante tortor, placerat sed accumsan vel, tempor eget metus. Cras id urna tincidunt, aliquet ex id, suscipit mauris. Quisque consectetur eu tortor ac imperdiet. Mauris iaculis tortor at ligula venenatis auctor.</p>

        <p>Nam hendrerit auctor dignissim. Aliquam sit amet ligula eu ipsum rhoncus tempus. Cras convallis dolor justo, et eleifend justo aliquet non. Ut non imperdiet turpis. Fusce eu commodo nisi. Donec eu velit iaculis ex imperdiet vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras eget enim non odio fermentum pharetra. Etiam in eros ornare orci molestie dapibus nec vehicula mi. Praesent scelerisque, metus non pellentesque consectetur, magna nunc rutrum risus, ac elementum dolor purus nec lorem.</p>

        <p>Fusce nec tortor ac sapien dapibus varius in sit amet leo. In ac ante nisi. Nulla sit amet quam ut nulla tincidunt rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut accumsan est. Fusce eu accumsan elit, nec egestas neque. Praesent vel placerat sapien. Mauris vulputate tempus ante vitae viverra. Aliquam congue eros eu fermentum cursus. Vestibulum blandit non est a porttitor. Nunc a ornare mi, at volutpat dolor. Duis nec leo ut eros blandit mollis. Donec posuere eros dictum imperdiet rhoncus.</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt massa quis sapien semper convallis. Curabitur metus risus, auctor in enim ac, finibus pellentesque augue. Nulla vitae mi at ante suscipit fermentum. Nullam lacinia non libero at consectetur. Mauris in pretium nunc. Nam consectetur justo sed dolor condimentum bibendum. Praesent elementum eleifend lectus, ac condimentum ipsum ultrices vitae.</p>

        <h2>Donec Vitae Libero et Tortor</h2>
        <p>Aliquam rutrum libero quis ante ultricies, vitae egestas velit semper. Aliquam vehicula libero in ante ultrices, at ultrices est malesuada. Donec volutpat, augue et rutrum consectetur, mi sem iaculis lacus, eu hendrerit purus mauris in ipsum. Sed vitae hendrerit nisl. Donec vitae libero et tortor lacinia pretium nec sit amet nulla. Nam tincidunt congue libero, at egestas sapien consequat eu. Nullam accumsan odio non tristique hendrerit. Praesent lobortis egestas feugiat. Ut sed dolor quis nibh consectetur condimentum non in ante. Aliquam nec risus auctor, convallis ex non, iaculis orci. Donec tortor est, maximus non mattis a, sollicitudin quis odio. Sed vitae scelerisque nunc.</p>

        <p>Ut leo ligula, ultricies eget aliquam ac, lobortis pharetra justo. Morbi interdum felis eget ante mattis, mollis condimentum leo congue. Maecenas a efficitur eros. Pellentesque non semper turpis. Donec pulvinar lacus sit amet risus commodo sodales. Integer a bibendum lorem. Cras eget aliquam diam, eu rutrum dolor. Ut luctus augue in varius cursus. Vivamus consequat laoreet quam, ut semper dolor dapibus id. Aliquam ante tortor, placerat sed accumsan vel, tempor eget metus. Cras id urna tincidunt, aliquet ex id, suscipit mauris. Quisque consectetur eu tortor ac imperdiet. Mauris iaculis tortor at ligula venenatis auctor.</p>

        <p>Nam hendrerit auctor dignissim. Aliquam sit amet ligula eu ipsum rhoncus tempus. Cras convallis dolor justo, et eleifend justo aliquet non. Ut non imperdiet turpis. Fusce eu commodo nisi. Donec eu velit iaculis ex imperdiet vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras eget enim non odio fermentum pharetra. Etiam in eros ornare orci molestie dapibus nec vehicula mi. Praesent scelerisque, metus non pellentesque consectetur, magna nunc rutrum risus, ac elementum dolor purus nec lorem.</p>

        <p>Fusce nec tortor ac sapien dapibus varius in sit amet leo. In ac ante nisi. Nulla sit amet quam ut nulla tincidunt rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut accumsan est. Fusce eu accumsan elit, nec egestas neque. Praesent vel placerat sapien. Mauris vulputate tempus ante vitae viverra. Aliquam congue eros eu fermentum cursus. Vestibulum blandit non est a porttitor. Nunc a ornare mi, at volutpat dolor. Duis nec leo ut eros blandit mollis. Donec posuere eros dictum imperdiet rhoncus.</p>

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

// expects articleId

const mapStateToProps = state => ({
  // article: state.articles.article,
  // isLoadingArticle: state.articles.article.isLoading,
  // formValues: state.form.articleForm || {},
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...articleActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);