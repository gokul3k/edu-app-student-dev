import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    width:"100%",
    flex:1
  },
  heading: {
      width:"100%",
      backgroundColor:theme.palette.primary.main,
      fontSize:24,
      fontWeight:"bold",
      padding:4,
      paddingLeft:8,
      color:"white",
      borderRadius:5,
  },subheading:{
      marginTop:4,
      fontSize:14,
      color:"grey",
  }
}));

export default function Instructions({ instructions }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid>
        <Typography className={classes.heading}> Instructions</Typography>
      </Grid>
      <Grid>
          <Typography className={classes.subheading} align="center">
            Please read the instructions carefully
          </Typography>
        <List>
          {instructions.map((item, index) => (
            <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
              <ListItemText primary={`${index + 1}. ${item.Instruction}`} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </div>
  );
}
