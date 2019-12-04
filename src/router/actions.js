import { fromJS } from "immutable";
import { getLocation } from "./selectors";
export const NAVIGATE = "NAVIGATE";
export const NAVIGATE_BACK = "NAVIGATE_BACK";
export const NAVIGATE_HOME = "NAVIGATE_HOME";

const navigateAction = location => ({
  type: NAVIGATE,
  payload: location
});

const navigateBackAction = () => ({
  type: NAVIGATE_BACK
});

const navigateHomeAction = () => ({
  type: NAVIGATE_HOME
});

export const navigate = location => (dispatch, getState) => {
  const currentLocation = getLocation(getState());
  if (currentLocation.pathname !== location.pathname) {
    dispatch(navigateAction(fromJS(location)));
  }
};

export const back = navigateBackAction;
export const home = navigateHomeAction;
