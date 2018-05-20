import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  NavLink,
  Redirect,
  withRouter
} from "react-router-dom";
import Config from "./constant";
import Home from "./components/Home";
import About from "./components/About";
import TopMenus from "./components/TopMenus"
import './App.css';

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


function List(props) {
  return <h1>List {props.url} </h1>;
}

function Page(props_aaa) {
  return <h1>Page {props_aaa.url}</h1>;
}

const Topic = (props, { match }) => {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <List {...props} />;
  }
  return <Page {...props} />;
};  

// function FancyBorder(props) {
//   return (
//     <div style={{border: "10px solid"}} className={"w3-border-" + props.color}>
//       {props.children}
//     </div>
//   );
// }

// function WelcomeDialog() {
//   return (
//     <FancyBorder color="blue">
//       <h1 className="Dialog-title">Welcome</h1>
//       <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
//     </FancyBorder>
//   );
// }

function closeDropdown() {
  console.log('closeDropdown...')
}


function FancyBorder(props) {
  return (
    // <div style={{ border: "10px solid" }} className={"w3-border-" + props.color}>
    //   {props.children}
    // </div>

    <div className="w3-dropdown-hover" onClick={closeDropdown}>
      <button className="w3-button w3-black">
        Hover Over Me!
      </button>
      <div>
        {props.children}
      </div>
    </div>


  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      {/* <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p> */}
      <div className="w3-dropdown-content w3-bar-block w3-border">
        <a href="#" className="w3-bar-item w3-button">
          Link 1
                  </a>
        <a href="#" className="w3-bar-item w3-button">
          Link 2
                  </a>
        <a href="#" className="w3-bar-item w3-button">
          Link 3
                  </a>
        <NavLink className="w3-bar-item w3-button" to={"/topics/rendering"} exact activeStyle={{ color: "green" }}>
          Rendering with React
                  </NavLink>
        <NavLink className="w3-bar-item w3-button" to={"/topics/props-v-state"} exact activeStyle={{ color: "green" }}>
          Props v. State
                  </NavLink>
      </div>

    </FancyBorder>
  );
}

function Toggle() {
  return <h1>Show</h1>
}

class App extends Component {
  constructor() {
    super();
    this.siteTitle = "Site Builder";
    this.menus = [
      { title: "home", to: "/home" },
      { title: "about", to: "/about" }
    ];
    this.isPage = false;
    // this.className = "w3-dropdown-content w3-bar-block w3-border";
    this.isShowDropdown = true;
    this.shouldHide = false;
  }

  isShowDropdown = false;


  closeDropdown() {
    // this.className = "w3-dropdown-content w3-bar-block w3-border w3-hide";
    this.isShowDropdown = false;
    console.log("closeDropdown", this);
  }

  showDropdown() {
    this.isShowDropdown = true;
    console.log("showDropdown", this);    
  }

  state = {isDivShow : false};

  

  render() {
    return <div>
        <Router>
          <div>
          <button onClick={() => { console.log("aaaaa", this.shouldHide); this.shouldHide = true} } className="w3-button w3-blue">
              toggle { this.shouldHide ? 'true' : 'false'}
            </button>
            <div className={this.shouldHide ? "hidden" : ""}>
              This will be hidden if you set <tt>props.shouldHide </tt>
               ... to something truthy.
            </div>
            <hr/>
            <button onClick={() => this.setState({
                  isDivShow: !this.state.isDivShow
                })} className="w3-button w3-green">
              toggle
            </button>
            {this.state.isDivShow ? "true" : "false"}
            {this.state.isDivShow && <Toggle />}
            <h1>
              {this.siteTitle} - {this.isShowDropdown ? "true" : "false"}
            </h1>
            <AuthButton />
            <div className="w3-bar w3-black">
              <NavLink className="w3-bar-item w3-button" to="/public" exact activeStyle={{ color: "green" }}>
                Public Page
              </NavLink>
              <NavLink className="w3-bar-item w3-button" to="/protected" exact activeStyle={{ color: "green" }}>
                Protected Page
              </NavLink>
              <NavLink className="w3-bar-item w3-button" to={"/topics/rendering"} exact activeStyle={{ color: "green" }}>
                Rendering with React
              </NavLink>
              <NavLink className="w3-bar-item w3-button" to={"/topics/props-v-state"} exact activeStyle={{ color: "green" }}>
                Props v. State
              </NavLink>

              <TopMenus menus={this.menus} />

              <div className="w3-dropdown-hover" onMouseOver={this.showDropdown.bind(this)}>
                <button className="w3-button w3-black">
                  Hover {this.isShowDropdown ? "true" : "false"}
                </button>
                {/* <div onClick={this.closeDropdown} className="w3-dropdown-content w3-bar-block w3-border"> */}
                {/* <div onClick={this.closeDropdown.bind(this)} className={this.className}> */}
                {/* <div onClick={this.closeDropdown.bind(this)} className={this.className}> */}
                <div onClick={this.closeDropdown.bind(this)} style={{ display: this.isShowDropdown ? "block" : "none" }} className="w3-dropdown-content w3-bar-block w3-border">
                  {/* <div style={{ display: this.isShowDropdown ? "block" : "none" }} className="w3-dropdown-content w3-bar-block w3-border"> */}
                  <a href="#" className="w3-bar-item w3-button">
                    Link 1 {this.isShowDropdown}
                  </a>
                  <a href="#" className="w3-bar-item w3-button">
                    Link 2
                  </a>
                  <a href="#" className="w3-bar-item w3-button">
                    Link 3
                  </a>
                  <NavLink className="w3-bar-item w3-button" to={"/topics/rendering"} exact activeStyle={{ color: "green" }}>
                    Rendering with React
                  </NavLink>
                  <NavLink className="w3-bar-item w3-button" to={"/topics/props-v-state"} exact activeStyle={{ color: "green" }}>
                    Props v. State
                  </NavLink>
                </div>
              </div>

              <WelcomeDialog />
            </div>
            <Route path="/public" component={Public} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <PrivateRoute path="/protected" component={Protected} />
            {/* <Route path="/topics/:topicId" render={props => <Topic {...props} isLoggedIn={true} />} /> */}
            <Route path="/topics/rendering" render={props => <Topic {...props} isLoggedIn={true} />} />
            <Route path="/topics/props-v-state" render={props => <Topic {...props} isLoggedIn={false} />} />
          </div>
        </Router>
      </div>;
  }
}

export default App;
