export const STORE_KEY = "router";

export const getLocation = state => state.getIn([STORE_KEY, "location"]);
// export const getLocation = state => state[STORE_KEY].location;
export const getLocationPathname = state =>
  state.getIn([STORE_KEY, "location", "pathname"]);
