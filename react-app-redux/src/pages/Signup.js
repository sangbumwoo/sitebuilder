import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../api';
// import Config from '../Config';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    email: 'admin@sitebuilder.com', password: 'admin1234', role: 'admin', message: ''
  };

  componentDidMount() {
    api.get('/user/list')
      .then((res) => {
        console.log(res);
        if (res.data.length > 0) {
          this.setState({ role: 'user' });
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, message: '' }, () => {
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    const formData = Object.assign({ }, this.state);
    delete formData.message;
    api.post('/user/signup', formData)
      .then(() => {
        history.push('/login');
      }).catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            this.setState({ message: 'Conflict: email already exist.' });
          }
        }
      });
  }

  render() {
    const { email, password, message } = this.state;
    return (
      <div className="w3-row">
        <div className="w3-col" style={{ width: `${30}%` }}>
          &nbsp;
        </div>
        <div className="w3-col" style={{ width: `${40}%` }}>
          <h1 className="w3-center">
            Signup
          </h1>

          <form className="w3-container" onSubmit={this.handleSubmit}>
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
            {/* <div className="w3-panel w3-pink w3-margin-bottom">
              {message}
            </div> */}
            { message && (
            <div className="w3-panel w3-red w3-display-container">
              <span
                onClick={() => this.setState({ message: '' })}
                className="w3-button w3-red w3-large w3-display-topright"
                role="presentation"
              >
                &times;
              </span>
              <p>
                {message}
              </p>
            </div>
            )}

            <button className="w3-btn w3-blue" type="submit">
              Submit
            </button>
          </form>

        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired
};

export default withRouter(Signup);
