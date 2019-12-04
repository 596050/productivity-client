import React from "react";
import { Routes } from "router";
import { List, Map } from "immutable";
import {
  authenticatedRoute,
  unauthenticatedRoute,
  LoginContainer,
  SignupContainer
} from "auth";

import { DashboardContainer } from "dashboard";
const routes = List([
  // Map({
  //   component: QuestionFormContainer,
  //   exact: true,
  //   path: "/edit-question/:id"
  // })
  Map({
    component: unauthenticatedRoute(LoginContainer),
    exact: true,
    path: "/login"
  }),
  Map({
    component: unauthenticatedRoute(SignupContainer),
    exact: true,
    path: "/signup"
  }),
  Map({
    component: authenticatedRoute(DashboardContainer),
    exact: true,
    path: "/dashboard"
  })
]);

export default () => <Routes routes={routes} />;
