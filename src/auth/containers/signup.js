import React, { Component } from "react";
import { connect } from "react-redux";
import SignupForm from "../components/signupForm";
import { reduxForm } from "redux-form/immutable";
import { compose, bindActionCreators } from "redux";
import { ApiActions } from "api";

class SignupContainer extends Component {
  render() {
    console.log(this.props.onSubmit);
    return <SignupForm onSubmit={this.props.handleSubmit} />;
  }
}

const mapStateToProps = () => ({});

const actions = {
  signup: ApiActions.signup
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const formOptions = {
  form: "signupForm",
  validate: (values, props) => {
    const errors = {};
    if (!values.get("username")) {
      errors.username = "Username is required";
    }
    if (!values.get("email")) {
      errors.email = "Email is required";
    }
    if (!values.get("password")) {
      errors.password = "Password is required";
    }
    if (values.get("repeatPassword") !== values.get("password")) {
      errors.repeatPassword = "Passwords do not match";
    }
    return errors;
  },
  onSubmit: (values, dispatch, ownProps) => {
    ownProps.signup(values);
  }
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm(formOptions)
)(SignupContainer);
