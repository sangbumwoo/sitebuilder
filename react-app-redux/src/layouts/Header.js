import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthButton from '../components/AuthButton';

class Header extends Component {
  state = {
    showDropDown: true
  };

  handleMouseEnter = () => {
    this.setState({ showDropDown: true });
  };

  handleClick = () => {
    this.setState({ showDropDown: false });
  };

  render() {
    const { showDropDown } = this.state;
    const { menus, location, user } = this.props;
    // console.log('this.props', this.props);
    return (
      <div className="w3-indigo">
        <div style={{ maxWidth: 960, margin: '0 auto', paddingBottom: '5px' }}>
          <AuthButton />

          <div className="w3-container w3-right">
            {
              Object.keys(user).length === 0 && (
                <React.Fragment>
                  <NavLink
                    className="w3-bar-item w3-btn"
                    to="/signup"
                    style={{ paddingBottom: 0 }}
                  >
              Signup
                  </NavLink>
                  <NavLink
                    className="w3-bar-item w3-btn"
                    to="/login"
                    style={{ paddingBottom: 0 }}
                  >
              Login
                  </NavLink>

                </React.Fragment>
              )
            }
            {
              Object.keys(user).length > 0 && (
              <NavLink
                className="w3-bar-item w3-btn"
                to="/logout"
                style={{ paddingBottom: 0 }}
              >
                Logout
              </NavLink>
              )
            }
          </div>
          <h1 className="w3-container" style={{ margin: 0 }}>
            {' '}
            SiteBuilder
            {' '}
          </h1>
          <div className="w3-bar w3-light-grey">
            {menus.map((item) => {
              if (item.children.length) {
                const pathName = location.pathname.split('/')[1];
                const strMenus = JSON.stringify(item.children);
                const matched = strMenus.indexOf(pathName);

                return (
                  <div
                    role="presentation"
                    className={
                      `w3-dropdown-hover ${matched > -1 ? 'w3-pink' : ''}`
                    }
                    key={item.id}
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseEnter}
                  >
                    {/* <button className="w3-btn">{item.title}</button> */}
                    {/* <a href="http://google.com" className="w3-btn">Go to Google</a> */}
                    <NavLink
                      to={`/${item.children[0].path}/${item.children[0].type}`}
                      className="w3-btn"
                    >
                      {item.title}
                    </NavLink>
                    <div className="w3-dropdown-content w3-bar-block w3-card-4">
                      {showDropDown
                        && item.children.map((submenu) => {
                          if (submenu.children.length > 0) {
                            return (
                              <NavLink
                                activeClassName="w3-pink"
                                key={submenu.id}
                                // activeClassName="w3-pink"
                                className="w3-bar-item w3-btn"
                                to={`/${submenu.children[0].path}/${
                                  submenu.children[0].type
                                }`}
                              >
                                {submenu.title}
                              </NavLink>
                            );
                          }
                          return (
                            <NavLink
                              activeClassName="w3-pink"
                              key={submenu.id}
                              // activeClassName="w3-pink"
                              className="w3-bar-item w3-btn"
                              to={`/${submenu.path}/${submenu.type}`}
                            >
                              {submenu.title}
                            </NavLink>
                          );
                        })}
                    </div>
                  </div>
                );
              }
              return (
                <NavLink
                  activeClassName="w3-pink"
                  key={item.id}
                  className="w3-bar-item w3-btn"
                  to={`/${item.path}/${item.type}`}
                >
                  {item.title}
                </NavLink>
              );
            })}
            <NavLink
              activeClassName="w3-pink"
              className="w3-bar-item w3-btn"
              to="/tweet"
            >
              tweet
            </NavLink>
            <NavLink
              activeClassName="w3-pink"
              className="w3-bar-item w3-btn"
              to="/public"
            >
              Public
            </NavLink>
            <NavLink
              activeClassName="w3-pink"
              className="w3-bar-item w3-btn"
              to="/protected"
            >
              Protected
            </NavLink>
            <NavLink
              activeClassName="w3-pink"
              className="w3-bar-item w3-btn"
              to="/protected2"
            >
              Protected2
            </NavLink>
            <NavLink
              activeClassName="w3-pink"
              className="w3-bar-item w3-btn w3-right"
              to="/test"
              style={{ paddingBottom: 0 }}
            >
              <i className="material-icons">
                more_vert
              </i>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  menus: PropTypes.instanceOf(Array).isRequired
};

export default withRouter(Header);
