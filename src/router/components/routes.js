import React, { Component } from "react";
import { Route, Switch } from "react-router";
import ImmutablePropTypes from "react-immutable-proptypes";
import PropTypes from "prop-types";

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: null
    };
  }

  // static RoutePropShape = {
  //   exact: PropTypes.bool,
  //   path: PropTypes.string.isRequired,
  //   component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
  //     .isRequired,
  //   routes: ImmutablePropTypes.listOf(
  //     ImmutablePropTypes.contains(Routes.RoutePropShape)
  //   )
  // };
  //
  // static propTypes = {
  //   notFoundComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  //   routes: ImmutablePropTypes.listOf(
  //     ImmutablePropTypes.contains(Routes.RoutePropShape)
  //   )
  // };

  componentWillMount() {
    this.updateStateComponents(this.props);
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.routes.equals(this.props.routes)) {
      this.updateStateComponents(nextProps);
    }
  }

  updateStateComponents = props => {
    const { routes } = props;
    this.setState({ components: this.flattenRoutes(routes.toJS()) });
  };

  flattenRoutes = (routes, parentPath = "") => {
    const components = [];

    routes.forEach(
      ({ routes, path, component: ComponentProp, ...otherProps }, i) => {
        const key = `${parentPath}${i}`;

        if (Array.isArray(routes)) {
          const children = childProps => (
            <ComponentProp {...childProps} {...otherProps}>
              {this.flattenRoutes(routes, path)}
            </ComponentProp>
          );
          return components.push(
            <Route key={key} path={`${parentPath}${path}`.replace("//", "/")}>
              {children}
            </Route>
          );
        }

        components.push(
          <Route
            component={ComponentProp}
            key={key}
            path={`${parentPath}${path}`.replace("//", "/")}
            {...otherProps}
          />
        );
      }
    );

    return components;
  };

  render = () => (
    <Switch>
      {this.state.components}
      <Route component={this.props.notFoundComponent} />
    </Switch>
  );
}
