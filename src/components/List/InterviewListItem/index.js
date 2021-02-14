import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Divider, Grid, Paper, Typography } from "@material-ui/core";
import InterviewDialog from 'components/dialogs/InterviewDialog'
import moment from "moment"
const useStyles = makeStyles((theme) => ({
  title: {
    color: "white",
        fontWeight: "bold",
        fontSize: 18,
        padding:5,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        backgroundColor: "#023e8a",
  },
  paper: {
    padding: 8,
    marginBottom: 24,
    maxWidth: 750
  },
  btn: {
  },
  subTitle: {
    color: "grey",
    fontSize: 16,
  },
  highlight: {
    color: theme.palette.primary.main,
    fontSize: 16,
    textTransform:"capitalize"
  },
  divider:{
    marginTop:7,
    marginBottom:13
  },
  subHeading:{
    marginLeft: 25,
    fontWeight:"bold"
  }
}));

export default function InterviewListItem({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper className={classes.paper} elevation={3} >
      <Grid container direction="row" justify="space-between">
        <Grid item lg xs>
          <Typography className={classes.title}>{data.InterviewName}</Typography>
          <Divider className={classes.divider}></Divider>
          <Typography variant="body1" color="textPrimary" className={classes.subHeading}>Details:</Typography>
          <ul>
            <li><Typography className={classes.subTitle}>Conducted by&nbsp;:&nbsp; <span className={classes.highlight}>{data.InterviewBy}</span></Typography></li>
            <li><Typography className={classes.subTitle}>Status &nbsp;:&nbsp;<span className={classes.highlight}>{data.Status}</span></Typography></li>
            {data.result&&data.Status==="selected"&&(<li><Typography className={classes.subTitle}>Reason For Selection &nbsp;:&nbsp;<span className={classes.highlight}>{data.result.Reason}</span></Typography></li>)}
            {data.result&&data.Status==="rejected"&&(<li><Typography className={classes.subTitle}>Reason For Rejection &nbsp;:&nbsp;<span className={classes.highlight}>{data.result.Reason}</span></Typography></li>)}
            {data.result&&data.Status==="postponed"&&(<li><Typography className={classes.subTitle}>Postponeded Date &nbsp;:&nbsp;<span className={classes.highlight}>{moment(data.result.PostponedDate).format("MMM Do YYYY")}</span></Typography></li>)}
            {data.result&&data.Status==="selected"&&(<li><Typography className={classes.subTitle}>Date of Joining &nbsp;:&nbsp;<span className={classes.highlight}>{moment(data.result.joiningDate).format("MMM Do YYYY")}</span></Typography></li>)}
            {data.result&&data.Status==="selected"&&(<li><Typography className={classes.subTitle}>Salary Package &nbsp;:&nbsp;<span className={classes.highlight}>{data.result.Salary}</span></Typography></li>)}
            {data.result&&(<li><Typography className={classes.subTitle}>Improvements &nbsp;:&nbsp;<span className={classes.highlight}>{data.result.Improvements}</span></Typography></li>)}
          </ul>
            {data.Status!=="postponed"&&(<br/>)}
        </Grid>
        {/* <Grid item lg={2}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleClickOpen}
          clasName={classes.btn}
        >
          View
        </Button>
      </Grid> */}
      </Grid>
      <InterviewDialog open={open} handleClose={handleClose} data={data} />
    </Paper>
  );
}
