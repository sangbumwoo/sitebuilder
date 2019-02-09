import React, { Component } from "react";
import { Link, NavLink, Switch } from "react-router-dom";
import axios from "axios";
import "./Header.css";

class Header extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get(`http://www.wixmedia.net/config`).then(res => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  render() {
    return (
      <div>
            <Link to={`/config`}>Config</Link>
        {/* <button>Add Menu</button>
        <button>Delete Menu</button>
        <button>Edit Menu</button> */}
        {}
        <div className="w3-bar w3-border w3-light-grey">
          {this.state.posts.map(post => (
            <NavLink
              className="w3-bar-item w3-button w3-green"
              activeClassName="w3-black"
              to={`/posts/${post.title}/${post.type}`}
              key={post.title}
            >
              {post.title}
            </NavLink>
          ))}

          <a href="#" className="w3-bar-item w3-button w3-dark-gray w3-right">
            Login
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
