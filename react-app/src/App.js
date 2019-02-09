import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Switch, Redirect, withRouter
  // HashRouter as Router, Route, Switch, Redirect, withRouter
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

    // fakeAuth.isAuthenticated = true;
    // fakeAuth.authenticate(() => {
    //   this.setState({ redirectToReferrer: true });
    // });

    // // return;

    console.log('handleLoginSubmit', email, password, event);
    api.post('/user/login', { email, password })
      .then((res) => {
        if (res.status === 200) {
          console.log('res', res);

          const AUTH_TOKEN = res.data.id_token;
          localStorage.setItem('token', AUTH_TOKEN);
          api.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
          this.setState({ user: res.data.user });
          localStorage.setItem('user', JSON.stringify(res.data.user));
          history.push('/home/dashboard');
        } else {
          console.log('Error in login process : ', res.status);
        }
      }).catch((error) => {
        console.log(error);
      });
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
          {/* <div>
            redirectToReferrer:
            {redirectToReferrer ? 'true' : 'false'}
          </div>
          <AuthButton /> */}

          <Header menus={menus} user={user} />
          <Switch>
            {/* <PublicRoute
              path="/tweet"
              layout={FullLayout}
              component={Tweet}
              tweet={testTweet}
            /> */}
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
            <Redirect from="/" exact to="/home/dashboard" />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
