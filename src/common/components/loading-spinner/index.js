import React from "react";
import { Text } from "react-native";
import { withStyles } from "theme";
import styles from "./styles";

const LoadingSpinner = ({ classes, ...props }) => (
  <Text style={classes.text}>Loading...</Text>
);

export default withStyles(styles)(LoadingSpinner);
