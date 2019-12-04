import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import BackIcon from "../../common/icons/back";
import { withStyles } from "theme";
const styles = (theme, props) => ({
  appBar: {
    backgroundColor: theme.palette.primary[500],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    paddingHorizontal: 24,
    zIndex: 999
    // xlarge: {
    //   backgroundColor: theme.palette.primary[100]
    // }
  },
  title: {
    color: "white",
    paddingHorizontal: 15,
    fontWeight: "600",
    textAlign: "center"
  },
  appBarTouchable: {
    justifyContent: "center",
    height: 30,
    width: 30
  },
  backIcon: {
    height: 20,
    width: 20
  },
  logout: {
    minWidth: 30
  },
  home: {
    color: "white",
    fontWeight: "600"
  }
});

const AppBar = ({ title, onBack, phoneHome, classes }) => {
  return (
    <View style={classes.appBar}>
      <TouchableOpacity style={classes.appBarTouchable} onPress={onBack} />
      <Text style={classes.title}>{title}</Text>
      <TouchableOpacity onPress={phoneHome}>
        <Text style={classes.home}>Home</Text>
      </TouchableOpacity>
      {/* <View style={styles.logout} /> */}
    </View>
  );
};

export default withStyles(styles)(AppBar);
