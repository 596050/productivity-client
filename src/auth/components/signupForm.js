import React from "react";
import { withStyles } from "theme";
import { Button, View, Text } from "react-native";
import { TextField } from "form";

const styles = () => {
  return {
    container: {},
    textfield: {
      backgroundColor: "white"
    },
    submitButton: {
      color: "white"
    }
  };
};

// TODO: How to have a check of password? Should be done on front-end?
const SignupForm = ({ classes, onSubmit, ...props }) => (
  <View>
    <Text>Sign Up</Text>
    <TextField style={classes.textfield} name="email" />
    <TextField style={classes.textfield} name="username" />
    <TextField style={classes.textfield} secureTextEntry name="password" />
    <TextField
      style={classes.textfield}
      secureTextEntry
      name="repeatPassword"
    />
    <Button onPress={onSubmit} style={classes.submitButton} title="Sign Up" />
  </View>
);

export default withStyles(styles)(SignupForm);
