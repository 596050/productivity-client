export const STORE_KEY = "api";
export const selectToken = state => state.getIn([STORE_KEY, "token"]);
export const selectUrl = state => state.getIn([STORE_KEY, "url"]);

export const selectAuthErrors = state =>
  state.getIn([STORE_KEY, "errors", "auth"]);
export const selectAuthLoading = state =>
  state.getIn([STORE_KEY, "loading", "auth"]);

export const selectCurrentUserLoading = state =>
  state.getIn([STORE_KEY, "loading", "currentUser"]);
export const selectCurrentUser = state =>
  state.getIn([STORE_KEY, "currentUser"]);
export const selectCurrentUserErrors = state =>
  state.getIn([STORE_KEY, "errors", "currentUser"]);

export const selectAllProjects = state => state.getIn([STORE_KEY, "projects"]);
export const selectAllProjectsLoading = state =>
  state.getIn([STORE_KEY, "loading", "projects", "all"]);
export const selectAllProjectsErrors = state =>
  state.getIn([STORE_KEY, "errors", "projects", "all"]);
