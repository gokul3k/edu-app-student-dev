/*eslint-disable*/
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Dashboard } from "@material-ui/icons";
import styles from "components/headers/Header/headerLinksStyle.js";
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem
        button
        className={classes.listItem}
        component={"/home" && Link}
        to="/home"
      >
        {/* <ListItemIcon style={{minWidth:30}}>
          <Dashboard className={classes.icon} />
        </ListItemIcon> */}
        <Typography className={classes.listText} >Home</Typography>
      </ListItem>
      <ListItem
        button
        className={classes.listItem}
        component={"/home/aboutus" && Link}
        to="/home/aboutus"
      >
        <Typography className={classes.listText} ><nobr>About Us</nobr></Typography>
      </ListItem>
      <ListItem
        button
        className={classes.listItem}
        component={"/home/exams" && Link}
        to="/home/exams"
      >
        <Typography className={classes.listText} >Exams</Typography>
      </ListItem>      
      <ListItem
        button
        className={classes.listItem}
        component={"/home/interviews" && Link}
        to="/home/interviews"
      >
        <Typography className={classes.listText} >Interviews</Typography>
      </ListItem>
      <ListItem
        button
        className={classes.listItem}
        component={"/home/carrier" && Link}
        to="/home/carrier"
      >
        <Typography className={classes.listText} >Career</Typography>
      </ListItem>
      <ListItem
        button
        className={classes.listItem}
        component={"/home/analysis" && Link}
        to="/home/analysis"
      >
        <Typography className={classes.listText} >Analysis</Typography>
      </ListItem>
      <ListItem
        button
        className={classes.listItem}
        component={"/home/contactus" && Link}
        to="/home/contactus"
      >
        <Typography className={classes.listText} ><nobr>Contact Us</nobr></Typography>
      </ListItem>
    </List>
  );
}
