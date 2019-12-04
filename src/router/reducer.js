import { history } from "./helpers";
import { NAVIGATE, NAVIGATE_BACK } from "./actions";
import { Map } from "immutable";
export { STORE_KEY } from "./selectors";

export const initialState = Map({
  location: Map(history.location)
});

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NAVIGATE: {
      return state.set("location", payload);
      // return { ...state, location: payload };
    }
    default: {
      return state;
    }
  }
};
