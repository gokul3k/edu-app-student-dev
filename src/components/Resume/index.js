import React from "react";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import styles from "./styles";
import BasicInfo from "./BasicInfo";
import Skills from "./Skills";
import Education from "./Education";
import Address from "./Address";
import About from "./About";
import Experience from "./Experience";
import Poppins from 'assets/fonts/popins.ttf';
import Fredoka from 'assets/fonts/fredoka.ttf';
import Roboto from 'assets/fonts/robotomedium.ttf'
import RobotoBold from 'assets/fonts/robotobold.ttf'

// Create Document Component
Font.register({
  family: "Poppins",
  src: Poppins,
});
Font.register({
  family: "Fredoka",
  src: Fredoka,
});
Font.register({
  family: "Roboto-Medium",
  src: Roboto,
});
Font.register({
  family: "Roboto-Bold",
  src: RobotoBold,
});
Font.registerHyphenationCallback((word) => [word]);
export default function MyDocument({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <BasicInfo data={data} />
          <About about={data.about} />
          <Education data={data} />
          <Address data={data} />
          {data.skills.length>0&&(<Skills data={data.skills}/>)}
          {data.experiences.length>0&&(<Experience data={data.experiences}/>)}
        </View>
      </Page>
    </Document >
  );
}
