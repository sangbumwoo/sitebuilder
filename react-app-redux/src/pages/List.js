import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Config from '../Config';
import api from '../api';
// import 'bootstrap/dist/css/bootstrap.css';

class List extends Component {
  state = {
    posts: [], type: '', activePage: 1, count: 0, itemsCountPerPage: 5
  };

  componentDidMount() {
    const { match } = this.props;
    this.setState({ type: match.params.boardId }, () => {
      this.getData();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props;
    if (match.params.boardId !== nextProps.match.params.boardId) {
      this.setState({ type: nextProps.match.params.boardId }, () => {
        this.getData();
      });
    }
  }

  getData() {
    const { type, activePage, itemsCountPerPage } = this.state;
    console.log('List.js', api.defaults.headers);
    api(`board?page=${activePage}&rows=${itemsCountPerPage}&sortBy=_id&sort=-1&type=${type}&searchText=`)
      .then((res) => {
        this.setState({ count: res.data.count });
        this.setState({ posts: res.data.list });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber }, () => {
      this.getData();
    });
  }

  render() {
    const { match } = this.props;
    const {
      posts, activePage, count, itemsCountPerPage
    } = this.state;
    return (
      <div>
        <div className="w3-panel">
          <NavLink
            to={`/${match.params.boardId}/save`}
            className="w3-btn w3-green w3-right"
          >
          Add
          </NavLink>
        </div>
        { posts.length > 0
        && (
          <div>
            <table className="w3-table-all">
              <thead>
                <tr className="w3-black">
                  <td>
              index
                  </td>
                  <td>
              title
                  </td>
                  <td>
              content
                  </td>
                  <td>
              link
                  </td>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post._id}>
                    <td>
                      {(activePage - 1) * itemsCountPerPage + index + 1}
                    </td>
                    <td>
                      {post.title}
                    </td>
                    <td>
                      {post.content}
                    </td>
                    <td>
                      <NavLink
                        to={`/${match.params.boardId}/view/${post._id}`}
                        className="w3-btn"
                      >
                        {post.title}
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsCountPerPage}
              totalItemsCount={count}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
            {' '}
          </div>
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
      </div>
    );
  }
}

List.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(List);
