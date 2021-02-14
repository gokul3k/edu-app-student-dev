import React from "react";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: "flex",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 11,
    flexWrap: "wrap"
  },
  title: {
    fontSize: 14,
    fontFamily: 'Fredoka',
    textTransform: "uppercase",
    marginBottom: 8
  },
});

export default ({ about = "" }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Objective</Text>
    <Text style={styles.text} break>
      {about.About}
    </Text>
  </View>
);
