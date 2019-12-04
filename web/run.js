import "babel-polyfill";
import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import TrelloClone from "../src/index";

const render = App => {
  const app = (
    <AppContainer>
      <App />
    </AppContainer>
  );

  ReactDOM.render(app, document.getElementById(process.env.APP_MOUNT_ID));
};

if (process.env.NODE_ENV === "development") {
  module.hot.accept("../src/index", () => {
    const TrelloClone = require("../src/index").default;
    render(TrelloClone);
  });
}

render(TrelloClone);
