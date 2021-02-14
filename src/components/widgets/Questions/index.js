import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  current: {
    color: "white",
    backgroundColor: theme.palette.primary.light,
    maxWidth: 50,
    margin: 4,
    padding: 4,
    height: 35,
    width: 35,
    minWidth: 35,
    '&:hover':{
      color:"black",
      backgroundColor:"yellow",
    }
  },
  flag: {
    color: "white",
    backgroundColor: "grey",
    maxWidth: 50,
    minWidth: 35,
    margin: 4,
    padding: 4,
    height: 35,
    width: 35,
    '&:hover':{
      color:"black",
      backgroundColor:"yellow",
    }
  },
  ans: {
    color: "white",
    backgroundColor: "green",
    minWidth: 35,
    maxWidth: 50,
    margin: 4,
    padding: 4,
    height: 35,
    width: 35,
    '&:hover':{
      color:"black",
      backgroundColor:"yellow",
    }
  },
  unans: {
    color:"black",
    backgroundColor: "white",
    minWidth: 35,
    maxWidth: 50,
    margin: 4,
    padding: 4,
    height: 35,
    width: 35,
    '&:hover':{
      color:"black",
      backgroundColor:"yellow",
    }
  },
}));

export default function Questions({ index, response={flag:false}, onButtonClick, current }) {
  const classes = useStyles();

    return (
      <Button
        className={
          response.flag? classes.flag
            : response.ans? classes.ans
            : current=== index? classes.current
            : classes.unans
        }
        disableElevation
        variant={response.ans ? "contained" : "outlined"}
        onClick={()=>onButtonClick(index)}
      >
        {index + 1}
      </Button>
    );
}
