import React, { Component } from "react";
import { AppContainer } from "app";
import { getStore } from "store";
import { Provider } from "react-redux";
import { Router } from "router";
import Routes from "routes";
import { AppRegistry } from "react-native";
import { createTheme, ThemeProvider } from "./theme";
import blue from "colors/blue";
import orange from "colors/orange";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange
  }
});

class Main extends Component {
  render() {
    return (
      <Provider store={getStore()}>
        <ThemeProvider theme={theme}>
          <AppContainer>
            <Router>
              <Routes />
            </Router>
          </AppContainer>
        </ThemeProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent("Trello-Clone", Main);
export default Main;
