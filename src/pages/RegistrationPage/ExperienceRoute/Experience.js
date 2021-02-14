import { Grid, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import React,{useEffect} from "react";
import moment from 'moment'

const useStyles = makeStyles((theme) => ({

  date:{
    fontSize:16,
    fontStyle:"italic"
  },
  title:{
    fontSize:18,
    fontWeight:"bold",
  },
  company:{
    color:"grey"
  },
  row:{
    display:"flex",
    flexDirection:"row",
    marginLeft:12,
    marginRight:12,
    alignItems:"center"
  }
}));

export default function Experience({ exp, delExp, id }) {
  const classes = useStyles();



  return (
    <div>
      <Grid container direction="row" alignItems="center" spacing={7}>
        <Grid item>
          <IconButton>
            <Close color="secondary" onClick={() => delExp(id)} />
          </IconButton>
        </Grid>
        <div className={classes.row}>
          <Typography className={classes.date}>{moment(exp.fromDate).format('MMM, YYYY')}</Typography>
          <Typography style={{marginLeft:7,marginRight:7}}>-</Typography>
          <Typography className={classes.date}>{exp.toDate.length===0?"Present":moment(exp.toDate).format('MMM, YYYY')}</Typography>
        </div>
        <div className={classes.row} >
            <Typography className={classes.title} style={{marginRight:4}}>{exp.jobTitle}{","} </Typography>
            <Typography className={classes.company}>{exp.companyName}</Typography>
        </div>
      </Grid>
    </div>
  );
}
