import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
  componentWillMount() {
    const { onLogout, history } = this.props;
    onLogout(history);
  }

  render() {
    return (
      <div className="w3-row">
        <div className="w3-col" style={{ width: `${30}%` }}>
          &nbsp;
        </div>
        <div className="w3-col" style={{ width: `${40}%` }}>
          <h1 className="w3-center w3-text-pink">
            LOGOUT . . .
          </h1>
        </div>
      </div>
    );
  }
}

Logout.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  onLogout: PropTypes.func.isRequired
};

export default withRouter(Logout);
