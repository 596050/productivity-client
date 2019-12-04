import React, { Component } from "react";
import { ApiActions, ApiSelectors } from "api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RouterActions } from "router";
import { AsyncStorage } from "react-native";

const mapStateToProps = state => {
  return {
    token: ApiSelectors.selectToken(state)
  };
};

const actions = {
  navigate: RouterActions.navigate,
  setToken: ApiActions.setToken,
  getCurrentUser: ApiActions.getCurrentUser
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const authenticatedRoute = RouteComponent => {
  class AuthenticatedRoute extends Component {
    handleRedirect = () => {
      if (!this.props.token) {
        this.props.navigate({ pathname: "/login" });
      } else {
        this.props.getCurrentUser();
      }
    };

    componentDidMount() {
      AsyncStorage.getItem("token").then(token => {
        if (token) {
          return this.props.setToken(token);
        }
        this.handleRedirect();
      });
    }

    componentDidUpdate() {
      this.handleRedirect();
    }

    render = () => {
      return <RouteComponent {...this.props} />;
    };
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthenticatedRoute);
};

export default authenticatedRoute;
