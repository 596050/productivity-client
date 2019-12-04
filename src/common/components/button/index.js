import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { withStyles } from "theme";
import styles from "./styles";

const LoadingSpinner = ({
  classes,
  children,
  onPress,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[classes.button, style]}>
      {typeof children === "string" && (
        <Text style={[classes.text, textStyle]}>{children}</Text>
      )}
      {typeof children !== "string" && children}
    </TouchableOpacity>
  );
};

export default withStyles(styles)(LoadingSpinner);
