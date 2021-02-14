import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo2 from "assets/images/logo2.png";

const useStyles = makeStyles((theme) => ({

    image: {

        maxWidth: 200,
        maxHeight: 80

    },
    imageContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: '#efefef',
        padding: '20px',
        marginTop: 28
    },
    heading: {
        color: "#e63946",
        fontSize: 18,
        fontWeight: "bold"
    },
    para: {
        color: '#007bff'
    },
    contents: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }

}));


export default function Footer() {
    const classes = useStyles();
    return (

        <div className={classes.container}>

            <Grid container spacing={3}>
                <Grid item xs className={classes.contents}>
                    <Link to="/home"><p>Privacy Policy</p></Link>
                    <Link to="/home"><p>Terms  Conditions</p></Link>
                </Grid>
                <Grid item xs className={classes.contents}>
                    <h4 className={classes.heading}>Reach To Us</h4>
                    <p className={classes.para}>info@bestenlist.co.in</p>
                </Grid>
                <Grid item xs className={classes.contents}>
                    <div className={classes.imageContainer}>
                        <img src={logo2} className={classes.image} />
                    </div>
                </Grid>
            </Grid>


            {/* <Grid container direction='row' justify='space-around'>
                <Grid item direction='row'>
                    <h4 className={classes.heading}>Important Links</h4>
                    <Link to="/home"><p>Privacy Policy</p></Link>
                    <Link to="/home"><p>Terms  Conditions</p></Link>
                </Grid>
                <Grid item  direction='row'>
                    <h4 className={classes.heading}>Reach To Us</h4>
                    <p className={classes.para}>info@bestenlist.co.in</p>
                </Grid>
                <div className={classes.imageContainer}>
                    <img src={logo2} className={classes.image} />
                </div>
            </Grid> */}
        </div>
    )
}
