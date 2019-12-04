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
  setToken: ApiActions.setToken
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const unauthenticatedRoute = RouteComponent => {
  class UnAuthenticatedRoute extends Component {
    handleRedirect = () => {
      if (this.props.token) {
        this.props.navigate({ pathname: "/dashboard" });
      }
    };

    componentDidMount() {
      AsyncStorage.getItem("token").then(token => {
        if (token) {
          this.handleRedirect();
        }
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
  )(UnAuthenticatedRoute);
};

export default unauthenticatedRoute;
