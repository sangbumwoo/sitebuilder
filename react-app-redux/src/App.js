import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Switch, Redirect, withRouter
} from 'react-router-dom';
import api from './api';
import './App.css';
// import Config from './Config';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Dashboard from './pages/Dashboard';
import Tweet from './pages/Tweet';
import Page from './pages/Page';
import List from './pages/List';
import Save from './pages/Save';
import View from './pages/View';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import TestPage from './pages/TestPage';
import SettingPage from './pages/SettingPage';
import ColumnLayout from './layouts/ColumnLayout';
import FullLayout from './layouts/FullLayout';
import fakeAuth from './components/fakeAuth';

const testTweet = {
  message: 'Something about cats.',
  gravatar: '556b4f55bd62d070b48565c6da8aceaa',
  author: {
    handle: 'catperson',
    name: 'IAMA Cat Person'
  },
  likes: 2,
  retweets: 5,
  timestamp: '2016-07-30 21:24:37'
};

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     // this.isAuthenticated = true;
//     console.log('fakeAuth this', this);
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

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

const Protected2 = () => (
  <h3>
Protected2
  </h3>
);

// class Login extends React.Component {
//   state = {
//     redirectToReferrer: false
//   };

//   login = () => {
//     fakeAuth.isAuthenticated = true;
//     fakeAuth.authenticate(() => {
//       this.setState({ redirectToReferrer: true });
//     });
//   };

//   render() {
//     // console.log('this.props.location.state', this.props.location.state);
//     const { location } = this.props;
//     const { from } = location.state || { from: { pathname: '/' } };
//     const { redirectToReferrer } = this.state;

//     if (redirectToReferrer) {
//       return <Redirect to={from} />;
//     }

//     return (
//       <div>
//         <p>
//           You must log in to view the page at
//           {' '}
//           {from.pathname}
//         </p>
//         <button type="button" onClick={this.login}>
//           Log in
//         </button>
//       </div>
//     );
//   }
// }
// Login.propTypes = {
//   location: PropTypes.instanceOf(Object).isRequired
// };


const PrivateRoute = ({
  component: Component, layout: Layout, menus, redirectToReferrer, ...rest
}) =>
  // console.log('PrivateRoute >>> redirectToReferrer', redirectToReferrer);
  (
    <Route
      {...rest}
      render={(props) => {
        // console.log('props', props);
        console.log('fakeAuth.isAuthenticated', fakeAuth.isAuthenticated);
        const { history } = props;
        return (fakeAuth.isAuthenticated ? (
          <Layout menus={menus}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: history.location, redirectToReferrer }
            }}
          />
        ));
      }
    }
    />
  )
;
// PrivateRoute.propTypes = {
//   component: PropTypes.func.isRequired
//   // history: PropTypes.instanceOf(Object).isRequired
// };


const PublicRoute = ({
  component: Component, layout: Layout, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      console.log('props', props);
      console.log('fakeAuth.isAuthenticated', fakeAuth.isAuthenticated);
      const { history } = props;
      return ((
        <Layout {...rest}>
          <Component {...rest} />
        </Layout>
      ));
    }
    }
  />
);


class App extends Component {
  state = { menus: [], user: { }, redirectToReferrer: false };

  componentDidMount() {
    api.interceptors.request.use((config) => {
      if (!config.headers.common.Authorization && window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location = '/login';
      }
      return config;
    }, (error) => {
      console.log('error');
      return Promise.reject(error);
    });

    api.interceptors.response.use(response => response, (error) => {
      if (window.location.pathname !== '/signup' && window.location.pathname !== '/login') {
        window.location = '/login';
      }
      return Promise.reject(error);
    });

    const AUTH_TOKEN = localStorage.getItem('token');
    if (AUTH_TOKEN) {
      api.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
    }
    const userData = JSON.parse(localStorage.getItem('user'));
    const user = userData || {};
    this.setState({ user });

    api.get('config')
      .then((res) => {
        this.setState({ menus: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleLogin = (email, password, history, event) => {
    event.preventDefault();

    fakeAuth.isAuthenticated = true;
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });

    // return;

    // console.log('handleLoginSubmit', email, password, event);
    // api.post('/user/login', { email, password })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log('res', res);

    //       const AUTH_TOKEN = res.data.id_token;
    //       localStorage.setItem('token', AUTH_TOKEN);
    //       api.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
    //       this.setState({ user: res.data.user });
    //       localStorage.setItem('user', JSON.stringify(res.data.user));
    //       history.push('/home/dashboard');
    //     } else {
    //       console.log('Error in login process : ', res.status);
    //     }
    //   }).catch((error) => {
    //     console.log(error);
    //   });
  }

  handleLogout = (history) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    delete api.defaults.headers.common.Authorization;
    this.setState({ user: {} });
    history.push('/home/dashboard');
  }

  render() {
    const { menus, user, redirectToReferrer } = this.state;
    // console.log('app.js render this.state', this.state.redirectToReferrer ? 'true' : 'false');
    // const {  } = this.state;

    return (
      <Router>

        <div>
          <div>
            redirectToReferrer:
            {redirectToReferrer ? 'true' : 'false'}
          </div>
          <AuthButton />

          <Header menus={menus} user={user} />
          <Switch>
            <PublicRoute
              path="/tweet"
              layout={FullLayout}
              component={Tweet}
              tweet={testTweet}
            />
            <Route
              path="/:boardId/dashboard"
              render={() => (
                <FullLayout>
                  <Dashboard />
                </FullLayout>
              )}
            />
            <Route
              path="/login"
              render={() => (
                <FullLayout>
                  <Login onLogin={this.handleLogin} />
                </FullLayout>
              )}
            />
            <Route
              path="/logout"
              render={() => (
                <FullLayout>
                  <Logout onLogout={this.handleLogout} />
                </FullLayout>
              )}
            />
            <Route
              path="/signup"
              render={() => (
                <FullLayout>
                  <Signup />
                </FullLayout>
              )}
            />

            <Route
              path="/:boardId/page"
              render={() => (
                <ColumnLayout menus={menus}>
                  <Page />
                </ColumnLayout>
              )}
            />
            <Route
              path="/:boardId/list"
              render={() => (
                <ColumnLayout menus={menus}>
                  <List />
                </ColumnLayout>
              )}
            />
            <Route
              path="/:boardId/save/:id?"
              render={() => (
                <ColumnLayout menus={menus}>
                  <Save />
                </ColumnLayout>
              )}
            />
            <Route
              path="/:boardId/view/:id"
              render={() => (
                <ColumnLayout menus={menus}>
                  <View />
                </ColumnLayout>
              )}
            />
            <Route
              path="/:boardId/setting"
              render={() => (
                <ColumnLayout menus={menus}>
                  <SettingPage />
                </ColumnLayout>
              )}
            />
            <Route
              path="/test"
              render={() => (
                <FullLayout>
                  <TestPage />
                </FullLayout>
              )}
            />
            <Route
              path="/public"
              component={Public}
            />
            <Route
              path="/login_new"
              component={Login}
            />
            <PrivateRoute path="/protected" redirectToReferrer={redirectToReferrer} component={Protected} layout={FullLayout} />
            <Redirect from="/" exact to="/home/dashboard" />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
