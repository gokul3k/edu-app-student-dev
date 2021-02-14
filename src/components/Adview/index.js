import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Divider, Grid, Icon, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
  },
  paper: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  sub: {
    fontWeight: 'bold',
    fontSize: 16,
    color:"grey"
  },
  label: {
    fontWeight: 500,
    color: "#2764c4"
  },
  value: {
    color: "grey",
    fontSize: 14,
  }
}));

export default function Adview({ item }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    
      <Paper className={classes.paper} variant="outlined" >
        <Typography className={classes.title} >{item.Designation}</Typography>
        <Grid container direction="row" spacing={3} >
          <Grid item direction="row">
            <Icon></Icon>
            <Typography className={classes.value}>{item.CompanyName}</Typography>
          </Grid>
          <Grid item direction="row">
            <Typography className={classes.value}>{item.Experience}</Typography>
          </Grid>
          <Grid item direction="row">

            <Typography className={classes.value}>{item.Domain}</Typography>
          </Grid>
          <Grid item direction="row">
            <Typography className={classes.value}>{item.PhoneNo}</Typography>
          </Grid>
          <Grid item direction="row">
            <Typography className={classes.value}>{item.Email}</Typography>
          </Grid>
        </Grid>
        <Divider style={{margin:8}} />
        <Grid container direction="column">
          <Typography className={classes.sub}>Qualifications </Typography>
          <Typography className={classes.value}>{item.Skills}</Typography>
        </Grid>
      </Paper>
    </div>
  );
}
