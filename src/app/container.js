import React, { Component } from "react";
import { View } from "react-native";
import AppWrapper from "./components/appWrapper";
import AppBar from "./components/appBar";
import { connect } from "react-redux";
import { selectTitle } from "./selectors";
import { RouterActions } from "router";
import { bindActionCreators } from "redux";
import { setNotification } from "./actions";
import { AsyncStorage } from "react-native";
import { ApiActions } from "api";

class AppContainer extends Component {
  componentWillMount() {
    this.props.setNotification();
    AsyncStorage.getItem("token").then(token => {
      this.props.setToken(token);
    });
  }

  phoneHome = () => event => {
    this.props.navigate({ pathname: "/" });
  };

  render() {
    const { children, title } = this.props;
    return (
      <AppWrapper
        appbar={
          <AppBar
            title={title}
            onBack={this.props.back}
            phoneHome={this.phoneHome()}
          />
        }
      >
        {children}
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: selectTitle(state)
  };
};

const actions = {
  back: RouterActions.back,
  navigate: RouterActions.navigate,
  setNotification,
  setToken: ApiActions.setToken
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
