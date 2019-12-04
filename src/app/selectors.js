export const STORE_KEY = "app";

export const selectTitle = state => state.getIn([STORE_KEY, "title"]);
