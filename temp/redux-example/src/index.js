import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers);
// console.log('store', 'store');
console.log('store', store);
console.log('store.getState()', store.getState());
ReactDOM.render(
<Provider store={store}>
        <App message={"Hello there"} />
</Provider>
, document.getElementById('root'));
registerServiceWorker();
