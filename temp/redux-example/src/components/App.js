import React, { Component } from 'react'; 
import Counter from "./Counter";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import About from './About';

class App extends Component { 
    render() {
    return (
        <Router>
            <div>
                <Header />
                <Route path="/home" component={Home}/>
                <Route path="/about" component={About}/>
                <Counter className="w3-blue" />
            </div>
        </Router>
    );
    }
}
export default App;