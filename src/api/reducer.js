import {
  LOGIN_ATTEMPT_START,
  LOGIN_ATTEMPT_SUCCESS,
  LOGIN_ATTEMPT_FAILURE,
  SIGNUP_ATTEMPT_START,
  SIGNUP_ATTEMPT_SUCCESS,
  SIGNUP_ATTEMPT_FAILURE,
  UNSET_TOKEN,
  SET_TOKEN,
  GET_USER_PROJECTS_START,
  GET_USER_PROJECTS_SUCCESS,
  GET_USER_PROJECTS_FAILURE,
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE
} from "./actions";
import { Map } from "immutable";

export { STORE_KEY } from "./selectors";
export const initialState = Map({
  url: process.env.API_URL,
  token: null,
  projects: Map({}),
  currentUser: null,

  loading: Map({ auth: null, projects: Map({}), currentUser: null }),
  errors: Map({ auth: null, projects: Map({}), currentUser: null })
});

export const reducer = (state = initialState, { meta, payload, type }) => {
  switch (type) {
    // case CREATE_CARD_START: {
    //   return state
    //     .deleteIn(["errors", "cards", "new"])
    //     .setIn(["loading", "cards", "new"], true);
    // }
    case GET_CURRENT_USER_START: {
      return state
        .deleteIn(["errors", "currentUser"])
        .setIn(["loading", "currentUser"], true);
    }
    case GET_CURRENT_USER_SUCCESS: {
      return state
        .setIn(["loading", "currentUser"], false)
        .set("currentUser", payload);
    }
    case GET_CURRENT_USER_FAILURE: {
      return state
        .setIn(["loading", "currentUser"], false)
        .setIn(["errors", "currentUser"], payload);
    }

    case LOGIN_ATTEMPT_START:
    case SIGNUP_ATTEMPT_START: {
      return state
        .deleteIn(["errors", "auth"])
        .setIn(["loading", "auth"], true);
    }
    case SET_TOKEN:
    case LOGIN_ATTEMPT_SUCCESS:
    case SIGNUP_ATTEMPT_SUCCESS: {
      return state.setIn(["loading", "auth"], false).set("token", payload);
    }
    case LOGIN_ATTEMPT_FAILURE:
    case SIGNUP_ATTEMPT_FAILURE: {
      return state
        .setIn(["loading", "auth"], false)
        .setIn(["errors", "auth"], payload);
    }
    case UNSET_TOKEN: {
      return state.set("token", null);
    }

    case GET_USER_PROJECTS_START: {
      return state.setIn(["loading", "projects", "all"], true);
    }
    case GET_USER_PROJECTS_SUCCESS: {
      return state
        .setIn(["loading", "projects", "all"], false)
        .set("projects", payload);
    }
    case GET_USER_PROJECTS_FAILURE: {
      return state
        .setIn(["loading", "projects", "all"], false)
        .setIn(["errors", "projects", "all"], payload);
    }

    default: {
      return state;
    }
  }
};

//Map({ a: 1, b: 2 }).map(x => 10 * x)
