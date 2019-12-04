import * as Reducer from "./reducer";
import * as Actions from "./actions";
export { withRouter, Route, Redirect, Switch } from "react-router";
export { default as Router } from "./components/router";
export { default as RouterMiddleware } from "./middleware";
export { default as Routes } from "./components/routes";

export const RouterReducer = Reducer;
export const RouterActions = Actions;
