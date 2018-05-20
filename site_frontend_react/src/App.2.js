import React, { Component } from "react";
import "./App.css";
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Link,
  NavLink,
  Redirect,
  Prompt,
  withRouter
} from "react-router-dom";
import Route from "react-router-dom/Route";

const User = params => {
  return <h1> Welcome User {params.username} </h1>;
};

  

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
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
        <p>You are not logged in.</p>
      )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);
const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

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
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}





class App extends Component {
  state = {
    loggedIn: false
  };
  loginHandle = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }));
  };
  render() {
    return <Router>
        <div className="App">
          {/* <div class="w3-bar w3-black">
            <a href="#" class="w3-bar-item w3-button">Home</a> */}
          <div className="w3-bar w3-black">
            <NavLink className="w3-bar-item w3-button" to="/" exact activeStyle={{ color: "green" }}>
              Home
            </NavLink>
            <NavLink className="w3-bar-item w3-button" to="/about" exact activeStyle={{ color: "green" }}>
              About
            </NavLink>
            <NavLink className="w3-bar-item w3-button" to="/user/john" exact activeStyle={{ color: "green" }}>
              User John
            </NavLink>
            <NavLink className="w3-bar-item w3-button" to="/user/peter" exact activeStyle={{ color: "green" }}>
              User Peter
            </NavLink>

            <NavLink className="w3-bar-item w3-button w3-right" to="/login" exact activeStyle={{ color: "green" }}>
              log in
            </NavLink>

            {/* <a className="w3-bar-item w3-button w3-right" onClick={this.loginHandle.bind(this)}>
              {this.state.loggedIn ? "log out" : "log in"}
            </a> */}
          </div>
          {/* <Prompt when={!this.state.loggedIn} message={location => {
              return location.pathname.startsWith("/user") ? "Are you sure?" : true;
            }} /> */}

          <input type="button" value={this.state.loggedIn ? "log out" : "log in"} onClick={this.loginHandle.bind(this)} />

          {/* <Route path="/" exact strict render={() => {
              return <h1>Welcome Home</h1>;
            }} /> */}

          <Route path="/" exact component={Home} />

          <Route path="/login" component={Login} />

          <Route path="/about" render={() => {
              return <h1>Welcome About</h1>;
            }} />
          {/* <Route path="/user/:username" render={({ match }) => (this.state.loggedIn ? <User username={match.params.username} /> : <Redirect to="/" />)} /> */}
        {/* <PrivateRoute path="/user/:username" render={({ match }) => (this.state.loggedIn ? <User username={match.params.username} /> : <Redirect to="/" />)} /> */}
        {/* <PrivateRoute path="/protected" component={Protected} /> */}
        <Route path="/user/:username" exact strict render={({ match }) => (
          this.state.loggedIn ? (<User username={match.params.username} />) : (<Redirect to='/login' />)
        )} />


        <AuthButton />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={Public} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />


        </div>
      </Router>;
  }
}

export default App;
// 02 840 9200 동작 개인납세과 
// 02 815-3494 