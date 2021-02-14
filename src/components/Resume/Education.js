import React from "react";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import List, { Item } from './List'

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Fredoka',
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginTop: 6,
    display: 'flex',
    flexWrap: 'wrap'
  },
  text: {
    fontSize: 10,
    marginLeft: 4,
    color: "grey"
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
  }
  //   course:{
  //       border:.5,
  //       borderColor:"black",
  //       padding:4,
  //       borderRadius:10,
  //   }
});

export default function Education({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Education</Text>
      <View style={styles.line}></View>
      <View style={styles.educationBlk}>
        <View style={styles.educationInBlk1}>
          <Text style={styles.heading}>Tenth Education</Text>
        </View>
        <View style={styles.educationInBlk2}>
          <Text style={styles.subHeading}>{data.academics.SchoolName10}, {data.academics.Location10}</Text>
          <List>
            <Item>Cgpa/Percentage : {data.academics.Cgpa10}</Item>
            <Item>Board: {data.academics.Board10}</Item>
          </List>
        </View>
      </View>

      <View style={styles.educationBlk}>
        <View style={styles.educationInBlk1}>
          <Text style={styles.heading}>Twelfth Education</Text>
        </View>
        <View style={styles.educationInBlk2}>
          <Text style={styles.subHeading}>{data.academics.SchoolName12}, {data.academics.Location12}</Text>
          <List>
            <Item>Cgpa/Percentage : {data.academics.Cgpa12}</Item>
            <Item>Board: {data.academics.Board12}</Item>
          </List>
        </View>
      </View>

      <View style={styles.educationBlk}>
        <View style={styles.educationInBlk1}>
          <Text style={styles.heading}>Degree Details</Text>
        </View>
        <View style={styles.educationInBlk2}>
          {
            data.degrees.map(degree => {
              return (
                <View>
                  <Text style={styles.subHeading}>{degree.CollegeName}, {degree.Location}</Text>
                  <List>
                    <Item>Course : {degree.Degree}</Item>
                    <Item>Cgpa/Percentage : {degree.Cgpa}</Item>
                  </List>
                </View>
              )
            })
          }
        </View>
      </View>
    </View>
  );
}
