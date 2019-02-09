import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Pagination from 'react-js-pagination';
import { Editor } from '@tinymce/tinymce-react';
import Config from '../Config';
import api from '../api';
// import 'bootstrap/dist/css/bootstrap.css';

const ShowButton = ({ count, match, post }) => {
  if (count > 0) {
    // return null;
    return (
      <div className="w3-panel">
        <NavLink
          to={`/${match.params.boardId}/save/${post._id}`}
          className="w3-btn w3-green w3-right"
        >
          Edit
          {count}
        </NavLink>

        <button style={{ marginRight: '3px' }} className="w3-button w3-white w3-border w3-right" type="button" onClick={this.delete}>
            Delete
        </button>


      </div>

    );
  }
  return (
    <div className="w3-panel">
      <NavLink
        to={`/${match.params.boardId}/save`}
        className="w3-btn w3-green w3-right"
      >
        Add
      </NavLink>
    </div>
  );
};
ShowButton.propTypes = {
  count: PropTypes.number.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  post: PropTypes.instanceOf(Object).isRequired
};

class Page extends Component {
  state = {
    posts: [], post: {}, type: '', activePage: 1, itemsCountPerPage: 1
  };

  componentDidMount() {
    const { match } = this.props;
    this.setState({ type: match.params.boardId }, () => {
      this.getData();
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps - Page.js');
    const { match } = this.props;
    if (match.params.boardId !== nextProps.match.params.boardId) {
      this.setState({ type: nextProps.match.params.boardId }, () => {
        this.getData();
      });
    }
  }

  getData() {
    const { type, activePage, itemsCountPerPage } = this.state;
    api.get(`/board?page=${activePage}&rows=${itemsCountPerPage}&sortBy=_id&sort=-1&type=${type}&searchText=`)
      // .then(results => results.json())
      .then((res) => {
        // console.log('data', data);
        this.setState({ posts: res.data.list });
        if (res.data.count) {
          console.log('setState - Page.js', res.data.list[0]);
          this.setState({ post: res.data.list[0] });
        }
      });
  }

  handleEditorChange = () => {
    // NOTE: parameter 변할때 업데이트 하는데 필요함.
    // console.log(e);
  }

    delete = () => {
      const { match } = this.props;
      fetch(`${Config.apiUrl}/board/${this.state.post._id}`, {
        method: 'delete'
      })
        .then(() => {
          // this.goBack();
          this.state.post = {};
          window.location.reload();
        });
    }

    render() {
      const { match } = this.props;
      const {
        posts, post
      } = this.state;
      return (
        <div>
          {/* <ShowButton count={posts.length} match={match} post={post} /> */}

          {/* <NavLink
          to={`/${match.params.boardId}/save`}
          className="w3-btn w3-green w3-right"
        >
        Add
        </NavLink> */}


          {posts.length > 0
          && (
            <Editor
              value={post.content}
              init={{
                inline: true,
                readonly: 1
              }}
              onEditorChange={this.handleEditorChange}
            />
          )
        }
          {
          posts.length === 0
          && (
            <div className="w3-center">
              No Data.
            </div>
          )
        }

          <div className="w3-right w3-margin-bottom">
            {
            posts.length === 0
              ? (
                <NavLink
                  to={`/${match.params.boardId}/save`}
                  style={{ marginLeft: '3px' }}
                  className="w3-button w3-white w3-border"
                >
          New
                </NavLink>
              ) : (
                <div>
                  <NavLink
                    to={`/${match.params.boardId}/save/${post._id}`}
                    style={{ marginLeft: '3px' }}
                    className="w3-button w3-white w3-border"
                  >
          Edit
                  </NavLink>
                  <button style={{ marginLeft: '3px' }} className="w3-button w3-white w3-border" type="button" onClick={this.delete}>
                  Delete
                  </button>
                </div>
              )}
            {/* <NavLink
            to={`/${match.params.boardId}/save`}
            style={{ marginLeft: '3px' }}
            className="w3-button w3-white w3-border"
          >
          New
          </NavLink>
          <NavLink
            to={`/${match.params.boardId}/save/${post._id}`}
            style={{ marginLeft: '3px' }}
            className="w3-button w3-white w3-border"
          >
          Edit
          </NavLink>
          <button style={{ marginLeft: '3px' }} className="w3-button w3-white w3-border" type="button" onClick={this.goBack}>
            Back
          </button> */}
          </div>


        </div>
      );
    }
}

Page.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(Page);
