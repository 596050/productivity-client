import { Platform } from "react-native";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import warning from "warning";
import indigo from "../colors/indigo";
import pink from "../colors/pink";
import grey from "../colors/grey";
import red from "../colors/red";
import common from "../colors/common";

const BREAKPOINT_CHROME_ADJUSTMENT = Platform.OS === "web" ? 16 : 0;
const THEME_KEY = "__JC_THEME__";

export const light = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.54)",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)",
    icon: "rgba(0, 0, 0, 0.38)",
    divider: "rgba(0, 0, 0, 0.12)",
    lightDivider: "rgba(0, 0, 0, 0.075)"
  },
  input: {
    bottomLine: "rgba(0, 0, 0, 0.42)",
    helperText: "rgba(0, 0, 0, 0.54)",
    labelText: "rgba(0, 0, 0, 0.54)",
    inputText: "rgba(0, 0, 0, 0.87)",
    disabled: "rgba(0, 0, 0, 0.42)"
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    disabled: "rgba(0, 0, 0, 0.26)"
  },
  background: {
    default: grey[50],
    paper: common.white,
    appBar: grey[100],
    contentFrame: grey[200]
  }
};

export const dark = {
  text: {
    primary: "rgba(255, 255, 255, 1)",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)",
    divider: "rgba(255, 255, 255, 0.12)",
    lightDivider: "rgba(255, 255, 255, 0.075)"
  },
  input: {
    bottomLine: "rgba(255, 255, 255, 0.7)",
    helperText: "rgba(255, 255, 255, 0.7)",
    labelText: "rgba(255, 255, 255, 0.7)",
    inputText: "rgba(255, 255, 255, 1)",
    disabled: "rgba(255, 255, 255, 0.5)"
  },
  action: {
    active: "rgba(255, 255, 255, 1)",
    disabled: "rgba(255, 255, 255, 0.3)"
  },
  background: {
    default: "#303030",
    paper: grey[800],
    appBar: grey[900],
    contentFrame: grey[900],
    status: common.black
  }
};

const shades = { dark, light };

const createTypographyTheme = (fontSize, fontWeight, italic, allCaps) => {
  return {
    fontSize,
    fontWeight: `${fontWeight}`,
    fontStyle: italic ? "italic" : null
  };
};

const defaultTheme = {
  layout: {},
  platform: Platform.OS,
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    type: "light",
    text: light.text,
    input: light.input,
    grey,
    action: light.action,
    background: light.background
  },
  spacing: {
    unit: 8
  },
  breakpoints: {
    xsmall: {
      minWidth: 0,
      gutter: 16,
      columns: 4
    },
    small: {
      minWidth: 600,
      gutter: 16,
      columns: 8
    },
    medium: {
      minWidth: 960,
      gutter: 24,
      columns: 12
    },
    large: {
      minWidth: 1280,
      gutter: 24,
      columns: 12
    },
    xlarge: {
      minWidth: 1920,
      gutter: 24,
      columns: 12
    }
  },
  transitions: {
    durations: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
      ripple: 550
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: [0.4, 0, 0.2, 1],
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: [0.0, 0, 0.2, 1],
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: [0.4, 0, 1, 1],
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: [0.4, 0, 0.6, 1]
    }
  },
  typography: {
    fontFamily: "Roboto",
    display4: createTypographyTheme(112, 300, false, false),
    display3: createTypographyTheme(56, 400, false, false),
    display2: createTypographyTheme(45, 400, false, false),
    display1: createTypographyTheme(34, 400, false, false),
    headline: createTypographyTheme(24, 400, false, false),
    title: createTypographyTheme(20, 500, false, false),
    subheading: {
      device: createTypographyTheme(16, 400, false, false),
      desktop: createTypographyTheme(15, 400, false, false)
    },
    body2: {
      device: createTypographyTheme(14, 500, false, false),
      desktop: createTypographyTheme(13, 500, false, false)
    },
    body1: {
      device: createTypographyTheme(14, 400, false, false),
      desktop: createTypographyTheme(13, 400, false, false)
    },
    caption: createTypographyTheme(12, 400, false, false),
    button: createTypographyTheme(14, 400, false, true)
  },
  misc: {
    borderRadius: 2
  }
};

const ThemeProps = {
  breakpoints: PropTypes.shape({
    xsmall: PropTypes.number,
    small: PropTypes.number,
    medium: PropTypes.number,
    large: PropTypes.number,
    xlarge: PropTypes.number
  })
};

export { ThemeProps, THEME_KEY };

class Theme {
  _id = v4();
  _subscriptions = {};
  _theme = {};

  constructor(options) {
    this.parseOptions(options);
  }

  _handleLayout = evt => {
    this._theme.layout = evt.nativeEvent.layout;

    this.setOrientation(this._theme.layout);
    this.setBreakpoint(this._theme.layout);
  };

  parseOptions = options => {
    this._theme = {
      ...defaultTheme,
      ...options,
      palette: {
        ...defaultTheme.palette,
        ...options.palette
      }
    };
  };

  setOrientation = ({ height, width }) => {
    this._theme.orientation = height > width ? "portrait" : "landscape";
  };

  setBreakpoint = ({ width }) => {
    let breakpoint;

    for (const key in this._theme.breakpoints) {
      if (this._theme.breakpoints[key].minWidth > width) {
        break;
      }

      breakpoint = key;
    }

    this._theme.breakpoint = breakpoint;

    this.updateSubscribers();
  };

  updateSubscribers = () => {
    for (const key in this._subscriptions) {
      this._subscriptions[key](this._theme);
    }
  };

  subscribe = (id, cb) => {
    const validCB = typeof cb === "function";

    warning(validCB, "Material: Invalid subscriber passed to Theme.subscribe");

    if (!validCB) {
      return;
    }

    this._subscriptions[id] = cb;

    cb(this._theme);
  };

  unsubscribe = id => {
    const subExists = !!this._subscriptions[id];
    warning(
      subExists,
      "Material: Invalid subscription id referenced in Theme.unsubscribe"
    );

    if (!subExists) {
      return;
    }

    delete this._subscriptions[id];
  };
}

export default options => new Theme(options);
