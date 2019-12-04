import { applyMiddleware, compose, createStore } from "redux";
import { initialState, rootReducer } from "reducers";
import { RouterMiddleware } from "router";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
import { Platform } from "react-native";

let _store;
let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = composeWithDevTools({
    hostname: "localhost",
    name: `${Platform.OS}`,
    port: 9500,
    realtime: true
  });
}

const makeStore = () => {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, RouterMiddleware))
  );
};

export const getStore = reset => {
  if (!_store || reset) {
    _store = makeStore();
  }

  return _store;
};
