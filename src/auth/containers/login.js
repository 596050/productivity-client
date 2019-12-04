import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "../components/loginForm";
import { reduxForm } from "redux-form/immutable";
import { compose, bindActionCreators } from "redux";
import { ApiActions } from "api";

class LoginContainer extends Component {
  render() {
    return <LoginForm onSubmit={this.props.handleSubmit} />;
  }
}

const mapStateToProps = () => ({});

const actions = {
  login: ApiActions.login
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const formOptions = {
  form: "loginForm",
  onSubmit: (values, dispatch, ownProps) => {
    ownProps.login(values);
  }
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm(formOptions)
)(LoginContainer);
