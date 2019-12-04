import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ApiActions, ApiSelectors } from "api";
import { Button, LoadingSpinner } from "common";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.currentUser) {
      this.props.getUserProjects(this.props.currentUser.get("_id"));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser && !prevProps.currentUser) {
      this.props.getUserProjects(this.props.currentUser.get("_id"));
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.loading && <LoadingSpinner />}
        <Button onPress={() => {}}>Hello</Button>
      </Fragment>
    );
  }
}

mapStateToProps = state => ({
  loading:
    ApiSelectors.selectAllProjectsLoading(state) ||
    ApiSelectors.selectCurrentUserLoading(state),
  projects: ApiSelectors.selectAllProjects(state),
  projectsErrors: ApiSelectors.selectAllProjectsErrors(state),
  currentUser: ApiSelectors.selectCurrentUser(state),
  currentUserErrors: ApiSelectors.selectCurrentUserErrors(state)
});

const actions = {
  getUserProjects: ApiActions.getUserProjects
};

mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
