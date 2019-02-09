import { createStore } from 'redux';

const initialState = {
    repos : [],
    searchInputValue: ''
}

const reducer = (state= initialState, action) => {
    console.log('reducer', action);

    switch (action.type) {
      case "SEARCH_INPUT_CHANGE":
        return Object.assign({}, state, { searchInputValue: action.value });
      case "SET_REPOS":
        return Object.assign({}, state, { repos: action.repos });
      default:
        return state;
    }
}

const store = createStore(reducer);

export default store;