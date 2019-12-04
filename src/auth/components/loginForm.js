import React from "react";
import { withStyles } from "theme";
import { Button, View, Text } from "react-native";
import { TextField } from "form";

const styles = () => {
  return {
    container: {
      marginTop: 30
    },
    textfield: {
      backgroundColor: "white"
    },
    submitButton: {
      color: "white"
    }
  };
};

const LoginForm = ({ classes, onSubmit, ...props }) => (
  <View>
    <Text>Log In</Text>
    <TextField style={classes.textfield} name="identifier" />
    <TextField style={classes.textfield} name="password" />
    <Button onPress={onSubmit} style={classes.submitButton} title={"Log In"} />
  </View>
);

export default withStyles(styles)(LoginForm);
