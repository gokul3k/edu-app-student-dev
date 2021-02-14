import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "coloumn",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 11,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Fredoka',
    textTransform: "uppercase",
  },
  line: {
    backgroundColor: "#DFDFDF",
    height: 1,
    width: '100%'
  },
  educationBlk: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  educationInBlk1: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    flexWrap: 'wrap'
  },
  educationInBlk2: {
    display: 'flex',
    flexDirection: 'column',
    flex: 4,
    flexWrap: 'wrap'
  },
  heading: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
  },
  addressMain: {
    marginTop: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    display: 'flex',
    flexWrap: 'wrap'
  }
});

export default ({ data }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Address</Text>
    <View style={styles.line}></View>
    <View style={styles.educationBlk}>
      <View style={styles.educationInBlk1}>
        <Text style={styles.heading}>Residence</Text>
      </View>
      <View style={styles.educationInBlk2}>
        <Text style={styles.addressMain}>{data.address[0].AddressLine1}</Text>
        <Text style={styles.text}>{data.address[0].AddressLine2}</Text>
        <Text style={styles.text}>{data.address[0].City}, {data.address[0].State}</Text>
      </View>
    </View>
  </View>
);