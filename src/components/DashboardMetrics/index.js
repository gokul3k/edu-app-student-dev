import React from 'react';
import styles from './dashboardmetrics.module.css';
import {makeStyles} from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core';
const useStyles=makeStyles((theme)=>({
paper:{
    padding:16,
    margin:5,
},
metrics :{
    fontWeight: "bolder",
    fontSize: "small",
    margin: 0,
    textAlign: "center",
},
value :{
    fontWeight: "bolder",
    fontSize: 30,
    margin: 0,
}
}))

const DashboardMetrics = ({ metrics, value }) => {
    const classes = useStyles()
    return (
        <Paper className={classes.paper} square elevation={2}>
        <Grid container direction="column" alignItems="center">
            <p className={classes.value}>{value}</p>
            <p className={classes.metrics}>{metrics}</p>
        </Grid>
        </Paper>
    );
};

export default DashboardMetrics;
