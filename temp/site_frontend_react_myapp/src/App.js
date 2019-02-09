import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Posts from "./routes/Posts";
import Config from "./routes/Config";
import Header from "./components/Header";
import NoMatch from "./routes/NoMatch"
import '../node_modules/w3-css/w3.css';
import './index.css';

const App = () => {
  return <Router>
      <div>
        <Header />
        <div>
          <Switch>
            <Route path="/about/:username" component={About} />
            <Route path="/posts" component={Posts} />
            <Route path="/config" component={Config} />
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
            
          </Switch>
        </div>
      </div>
    </Router>;
};

export default App;
