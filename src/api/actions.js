import { get, post, setUnauthorizedHandler } from "./helpers";
import { Map } from "immutable";
import { AsyncStorage } from "react-native";

export const UNSET_TOKEN = "UNSET_TOKEN";
export const SET_TOKEN = "SET_TOKEN";

export const GET_CURRENT_USER_START = "GET_CURRENT_USER_START";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_FAILURE = "GET_CURRENT_USER_FAILURE";

export const LOGIN_ATTEMPT_START = "LOGIN_ATTEMPT_START";
export const LOGIN_ATTEMPT_SUCCESS = "LOGIN_ATTEMPT_SUCCESS";
export const LOGIN_ATTEMPT_FAILURE = "LOGIN_ATTEMPT_FAILURE";

export const SIGNUP_ATTEMPT_START = "SIGNUP_ATTEMPT_START";
export const SIGNUP_ATTEMPT_SUCCESS = "SIGNUP_ATTEMPT_SUCCESS";
export const SIGNUP_ATTEMPT_FAILURE = "SIGNUP_ATTEMPT_FAILURE";

export const GET_USER_PROJECTS_START = "GET_USER_PROJECTS_START";
export const GET_USER_PROJECTS_SUCCESS = "GET_USER_PROJECTS_SUCCESS";
export const GET_USER_PROJECTS_FAILURE = "GET_USER_PROJECTS_FAILURE";

const unsetTokenAction = () => ({
  type: UNSET_TOKEN
});

const setTokenAction = token => ({
  type: SET_TOKEN,
  payload: token
});

const getCurrentUserStartAction = () => ({
  type: GET_CURRENT_USER_START
});

const getCurrentUserSuccessAction = user => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user
});

const getCurrentUserFailureAction = error => ({
  type: GET_CURRENT_USER_FAILURE,
  payload: error
});

const loginAttemptStartAction = credentials => ({
  type: LOGIN_ATTEMPT_START,
  payload: credentials
});

const loginAttemptSuccessAction = token => ({
  type: LOGIN_ATTEMPT_SUCCESS,
  payload: token
});

const loginAttemptFailureAction = error => ({
  type: LOGIN_ATTEMPT_FAILURE,
  payload: error
});

const signupAttemptStartAction = credentials => ({
  type: SIGNUP_ATTEMPT_START,
  payload: credentials
});

const signupAttemptSuccessAction = user => ({
  type: SIGNUP_ATTEMPT_SUCCESS,
  payload: user
});

const signupAttemptFailureAction = error => ({
  type: SIGNUP_ATTEMPT_FAILURE,
  payload: error
});

const getUserProjectsStartAction = userId => ({
  type: GET_USER_PROJECTS_START,
  payload: userId
});

const getUserProjectsSuccessAction = projects => ({
  type: GET_USER_PROJECTS_SUCCESS,
  payload: projects
});

const getUserProjectsFailureAction = error => ({
  type: GET_USER_PROJECTS_FAILURE,
  payload: error
});

export const unsetToken = unsetTokenAction;
setUnauthorizedHandler(unsetToken);
export const setToken = token => dispatch => {
  AsyncStorage.setItem("token", token);
  return dispatch(setTokenAction(token));
};

export const getCurrentUser = () => dispatch => {
  const dispatchedActions = [dispatch(getCurrentUserStartAction())];
  dispatchedActions.push(
    dispatch(
      get(
        "/users/me",
        user => {
          return getCurrentUserSuccessAction(user);
        },
        err => getCurrentUserFailureAction(err)
      )
    )
  );
  return dispatchedActions;
};

export const login = credentials => dispatch => {
  const dispatchedActions = [dispatch(loginAttemptStartAction(credentials))];
  dispatchedActions.push(
    dispatch(
      post(
        "/authenticate",
        credentials,
        token => {
          AsyncStorage.setItem("token", token);
          return loginAttemptSuccessAction(token);
        },
        err => loginAttemptFailureAction(err)
      )
    )
  );
  return dispatchedActions;
};

export const signup = credentials => dispatch => {
  const dispatchedActions = [dispatch(signupAttemptStartAction(credentials))];
  dispatchedActions.push(
    dispatch(
      post(
        "/users",
        credentials,
        token => {
          return signupAttemptSuccessAction(token);
        },
        err => signupAttemptFailureAction(err)
      )
    )
  );
  return dispatchedActions;
};

export const getUserProjects = userId => dispatch => {
  const dispatchedActions = [dispatch(getUserProjectsStartAction(userId))];
  dispatchedActions.push(
    dispatch(
      get(
        `/users/${userId}/projects`,
        projects => {
          return getUserProjectsSuccessAction(projects);
        },
        err => getUserProjectsFailureAction(err)
      )
    )
  );
  return dispatchedActions;
};
