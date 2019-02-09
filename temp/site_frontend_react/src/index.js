import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'; 

ReactDOM.render(
    <BrowserRouter>
        {/* <App /> */}
        <div>
            <Route exact path='/' component={App} />
            <Route path='/home' render={()=>(
                <div>
                    <h1 className="w3-green">Home</h1>
                    <h2>test</h2>
                </div>
            )} />
        </div>
    </BrowserRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
