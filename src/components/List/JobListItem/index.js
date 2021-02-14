import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 32,
    padding: 32,
  },
}));

export default function ExamListItem({ data, history }) {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="space-between">
      <Grid item>
        <Typography className={classes.title}>{data.Title}</Typography>
        <Typography className={classes.subTitle}>End in</Typography>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => history.push("/exam/" + data.id)}
          clasName={classes.btn}
        >
          Start test
        </Button>
      </Grid>
    </Grid>
  );
}
