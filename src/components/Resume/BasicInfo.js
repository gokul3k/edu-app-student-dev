import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import {getUserInfo} from 'services/userService'

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "coloumn",
    flexWrap: "wrap",
  },
  name: {
    fontSize: 11,
  },
  email: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium'
  },
  phone: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium'
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24
  },
  subHeading: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14
  },
  viewGroup: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  }
});

export default ({data}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{data.details.FullName}</Text>
    <View style={styles.viewGroup}>
      <Text style={styles.subHeading}>Email </Text>
      <Text style={styles.email}>{data.details.Email}</Text>
      {/* <Text style={styles.email}>{getUserInfo().email}</Text> */}
    </View>
    <View style={styles.viewGroup}>
      <Text style={styles.subHeading}>Phone </Text>
      <Text style={styles.phone}>{data.address[0].PhoneNo}</Text>
    </View>
  </View>
);