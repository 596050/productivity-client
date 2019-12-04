import { SET_TITLE, SET_NOTIFICATION, CLEAR_NOTIFICATION } from "./actions";
export { STORE_KEY } from "./selectors";
import { Map } from "immutable";

export const initialState = Map({
  title: null
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TITLE: {
      return state.set("title", payload);
    }
    case SET_NOTIFICATION: {
      return state;
    }
    case CLEAR_NOTIFICATION: {
      return state;
    }
    default: {
      return state;
    }
  }
};
