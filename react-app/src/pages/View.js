import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import api from '../api';
import Config from '../Config';

class View extends Component {
  state = { post: {} };

  componentDidMount() {
    const { match } = this.props;
    // this.fetchData(match.params.boardId);
    // if (match.params.id) {
    api.get(`/board/${match.params.id}`)
      .then(res => this.setState({ post: res.data }));
    // }
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  delete = () => {
    const { match } = this.props;
    fetch(`${Config.apiUrl}/board/${match.params.id}`, {
      method: 'delete'
    })
      .then(() => {
        this.goBack();
      });
  }

  render() {
    const { match } = this.props;
    const { post } = this.state;
    return (
      <div>
        <h3>
          {post.title}
        </h3>
        <Editor
          value={post.content}
          init={{
            inline: true,
            readonly: 1
          }}
          onEditorChange={this.handleEditorChange}
        />

        <div className="w3-right w3-margin-bottom">
          <NavLink
            to={`/${match.params.boardId}/save/${post._id}`}
            style={{ marginLeft: '3px' }}
            className="w3-button w3-white w3-border"
          >
          Edit
          </NavLink>
          <button style={{ marginLeft: '3px' }} className="w3-button w3-white w3-border" type="button" onClick={this.goBack}>
            Back
          </button>
          <button style={{ marginLeft: '3px' }} className="w3-button w3-white w3-border" type="button" onClick={this.delete}>
            Delete
          </button>
        </div>

      </div>
    );
  }
}

View.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(View);
