import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "./posts/Home";
import Page from "./posts/Page";
import List from "./posts/List";
import Tabs from "./posts/Tabs";
import Save from "./posts/Save";
import View from "./posts/View";
import NoMatch from "./NoMatch";

const Posts = ({ match }) => {
  return (
    <div>
      <h1>Posts</h1>
      <div className="w3-pink">
        <NavLink
          className="w3-padding"
          activeClassName="w3-green"
          to="/posts/summit/page"
        >
          page
        </NavLink>
        <NavLink
          className="w3-padding"
          activeClassName="w3-green"
          to="/posts/list"
        >
          list
        </NavLink>
        <NavLink
          className="w3-padding"
          activeClassName="w3-green"
          to="/posts/save"
        >
          save
        </NavLink>
        <NavLink
          className="w3-padding"
          activeClassName="w3-green"
          to="/posts/view"
        >
          view
        </NavLink>
      </div>
      <Switch>
        <Route path="/posts/:post/home" component={Home} />
        <Route path="/posts/:post/page" component={Page} />
        <Route path="/posts/:post/list" component={List} />
        <Route path="/posts/:post/tabs" component={Tabs} />
        {/* <Route path="/posts/list" component={List} /> */}
        <Route path="/posts/view" component={View} />
        <Route path="/posts/save" component={Save} />
        <Route path="/posts/save/:id" component={Save} />
        <Route
          exact
          path={match.url}
          render={() => <h3>Please select options</h3>}
        />
        <Route exact component={NoMatch} />
      </Switch>
    </div>
  );
};

export default Posts;
