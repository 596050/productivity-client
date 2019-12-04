import createTheme, { THEME_KEY } from "./createTheme";
import React, { Component } from "react";
import getStylesCreator from "./getStylesCreator";
import PropTypes from "prop-types";
import { v4 } from "uuid";

const withStyles = styles => ChildComponent => {
  const styleId = v4();
  const styleCreator = getStylesCreator(styles, styleId);

  class WithStyles extends Component {
    state = {
      updating: false,
      classes: {},
      theme: {},
      _id: v4()
    };

    static propTypes = {
      ChildComponent: PropTypes.node
    };

    static contextTypes = {
      [THEME_KEY]: PropTypes.object
    };

    componentWillMount() {
      const theme = this.context[THEME_KEY];

      theme.subscribe(this.state._id, this.setClasses);
    }

    componentWillUnmount() {
      const theme = this.context[THEME_KEY];

      theme.unsubscribe(this.state._id);
    }

    setClasses = theme => {
      this.setState({
        theme,
        classes: styleCreator(theme, this.props) || {}
      });
    };

    componentWillUpdate(nextProps, nextState, nextContext) {
      const currentTheme = this.context[THEME_KEY];
      const nextTheme = nextContext[THEME_KEY];

      if (nextState.updating) {
        this.setState({
          updating: false
        });
      }
      if (!this.state.updating && !nextState.updating) {
        this.setState({
          updating: true,
          classes: styleCreator(nextTheme._theme, nextProps)
        });
      }
    }

    render = () => {
      return this.state.theme.layout.width ? (
        <ChildComponent {...this.state} {...this.props} />
      ) : null;
    };
  }
  return WithStyles;
};

export default withStyles;
