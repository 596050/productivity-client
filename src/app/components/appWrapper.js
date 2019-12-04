import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

const styles = StyleSheet.create({
  appWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  header: {
    height: 25,
    backgroundColor: "black"
  },
  container: {
    // ...StyleSheet.absoluteFillObject,
    // top: 25
  }
});

const AppWrapper = ({ children, appbar = null, ...props }) => {
  return (
    <View {...props} style={[StyleSheet.absoluteFill, styles.appWrapper]}>
      <View style={styles.header} />
      {appbar}
      <ScrollView style={styles.container}>{children}</ScrollView>
    </View>
  );
};

export default AppWrapper;
