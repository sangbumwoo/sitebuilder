import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

class Login extends Component {
  state = { email: 'admin@sitebuilder.com', password: 'admin1234', message: '' };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, message: '' }, () => {
    });
  }

  render() {
    // const { location } = this.props;
    // const { redirectToReferrer } = this.state;
    const { email, password, message } = this.state;
    const {
      onLogin, location, history
    } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };

    // console.log('this.props', this.props);
    // console.log('this.state', this.state);
    // console.log('location.state', location.state);
    // console.log('location.state.from', location.state.from);

    // if (location.state.redirectToReferrer) {
    //   return <Redirect to={from} />;
    // }

    return (
      <div className="w3-row">
        <div className="w3-col" style={{ width: `${30}%` }}>
        &nbsp;
        </div>
        <div className="w3-col" style={{ width: `${40}%` }}>
          <h1 className="w3-center">
          LOGIN
          </h1>

          <form className="w3-container" onSubmit={event => onLogin(email, password, history, event)}>
            <label className="w3-text-blue">
              <b>
              email
              </b>
            </label>
            <input className="w3-input w3-border" name="email" type="email" value={email} onChange={this.handleChange} />
            <label className="w3-text-blue">
              <b>
              password
              </b>
            </label>
            <input className="w3-input w3-border w3-margin-bottom" name="password" type="password" value={password} onChange={this.handleChange} />
            <div className="w3-pink w3-margin-bottom">
              {message}
            </div>
            <button className="w3-btn w3-blue" type="submit">
            Submit
            </button>
          </form>

        </div>
      </div>
    );
  }


  // render() {
  //   const { email, password, message } = this.state;
  //   const { onLogin, history } = this.props;
  //   return (

  //     <div className="w3-row">
  //       <div className="w3-col" style={{ width: `${30}%` }}>
  //         &nbsp;
  //       </div>
  //       <div className="w3-col" style={{ width: `${40}%` }}>
  //         <h1 className="w3-center">
  //           LOGIN
  //         </h1>

  //         <form className="w3-container" onSubmit={event => onLogin(email, password, history, event)}>
  //           <label className="w3-text-blue">
  //             <b>
  //               email
  //             </b>
  //           </label>
  //           <input className="w3-input w3-border" name="email" type="email" value={email} onChange={this.handleChange} />
  //           <label className="w3-text-blue">
  //             <b>
  //               password
  //             </b>
  //           </label>
  //           <input className="w3-input w3-border w3-margin-bottom" name="password" type="password" value={password} onChange={this.handleChange} />
  //           <div className="w3-pink w3-margin-bottom">
  //             {message}
  //           </div>
  //           <button className="w3-btn w3-blue" type="submit">
  //             Submit
  //           </button>
  //         </form>

  //       </div>
  //     </div>
  //   );
  // }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  onLogin: PropTypes.func.isRequired
};

export default withRouter(Login);
