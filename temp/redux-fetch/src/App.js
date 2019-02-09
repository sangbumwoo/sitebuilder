import React, { Component } from 'react';
import './App.css';
import store from './store/'
import RepoSearch from './RepoSearch';


class App extends Component {
  render() {
    return (
      <div className="w3-pink">
        hello
        <RepoSearch store={store} />
      </div>
    );
  }
}

export default App;
