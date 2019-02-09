import { applyMiddleware, createStore } from "redux";

const reducer = function(state, action) {
  if (action.type === "INC") {
    return state + action.payload;
  }
  if (action.type === "DEC") {
    return state - action.payload;
  } else if (action.type === "E") {
    throw new Error("AAAA!!!!");
  }

  return state;
};

const logger = (store) => (next) => (action) => {
  console.log("action fired", action);
  next(action)
};

const error = (store) => (next) => (action) => {

  try {
    next(action);
  } catch (error) {
    console.log("AHHHH!!!", error);
  }
};

const middleware = applyMiddleware(logger, error);

// const store = createStore(reducer, 0);
const store = createStore(reducer, 0, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "INC", payload: 1 });
store.dispatch({ type: "INC", payload: 302 });
store.dispatch({ type: "DEC", payload: 1 });
store.dispatch({ type: "INC", payload: 1 });
store.dispatch({ type: "E", payload: 1 });
