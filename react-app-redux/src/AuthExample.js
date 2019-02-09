import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';

// //////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    (fakeAuth.isAuthenticated ? (
      <p>
        Welcome!
        {' '}
        <button
          type="button"
          onClick={() => {
            fakeAuth.signout(() => history.push('/'));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>
        You are not logged in.
      </p>
    ))
);

const Public = () => (
  <h3>
Public
  </h3>
);
const Protected = () => (
  <h3>
Protected
  </h3>
);

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    // console.log('this.props.location.state', this.props.location.state);
    const { location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>
          You must log in to view the page at
          {' '}
          {from.pathname}
        </p>
        <button type="button" onClick={this.login}>
          Log in
        </button>
      </div>
    );
  }
}
Login.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired
};


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      console.log('props', props);
      console.log('fakeAuth.isAuthenticated', fakeAuth.isAuthenticated);
      const { history } = props;
      return (fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: history.location }
          }}
        />
      ));
    }
    }
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
  // history: PropTypes.instanceOf(Object).isRequired
};

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li>
          <Link to="/public">
            Public Page
          </Link>
        </li>
        <li>
          <Link to="/protected">
            Protected Page
          </Link>
        </li>
      </ul>
      <Switch>
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </Switch>
    </div>
  </Router>
);


export default AuthExample;
