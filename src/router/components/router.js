import React, { Component } from "react";
import { history } from "../helpers";
import { Router as ReactRouter } from "react-router";

class Router extends Component {
  render() {
    return <ReactRouter history={history} {...this.props} />;
  }
}

export default Router;
