import React, { useEffect, useState } from 'react';
// import { Link } from '''dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin, logout, resetPassword } from 'actions/userActions';
import SigninForm from 'components/forms/SigninForm';

import { Snackbar, Button, Grid, Paper, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {

    },
    signin_page_welcome_text: {
        textAlign: "center",
        color: "white",
        fontSize: "1.5rem",
        marginTop: 42,
        marginBottom: 6,
    },
    signin_page_welcome_sub: {
        textAlign: 'center',
        color: 'white',
        fontSize: ' 1rem',
        marginBottom: 32,
    },
    new_para: {

        fontSize: 'medium',
        fontWeight: 600,
    },
    new_heading: {
        fontFamily: 'cursive',
        fontSize: 36,
        marginBottom: 24,
    },
    heading_span: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    signin_page_signup_button: {
        paddingLeft: 32,
        paddingRight: 32,
        textTransform: 'capitalize !important',
        backgroundColor: '#1976d2 !important',
        color: ' white !important',
        minWidth: 500,
        maxWidth: 800,
        marginBottom: 16,
        '&:hover': {
            cursor: "pointer"
        }
    },
    signin_page_brand: {
        fontSize: '1.2rem',
        fontWeight: 800,
        marginBottom: 32,
    },
    signin_page_privacy: {
        color: 'white',
        fontSize: '.8rem',
        fontWeight: 600,

    },
    form_container: {
        backgroundColor: '#1976d2',
        paddingRight: 32,
        paddingLeft: 32,
        paddingTop: 8,
        paddingBottom: 32,
    },
    signin_page_card_details: {
        padding: 24,
    },
    register_content:{
        margin:40
    }

}));

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}
export default function UserAuthPage(props) {
    const classes = useStyles();
    const userSignin = useSelector((state) => state.userSignin);
    const { loading, error, status } = userSignin;
    const dispatch = useDispatch();
    const [snk, setSnk] = useState({});
    const [open, setOpen] = React.useState(false);

    const onSubmit = ({ email, pass }) => {
        console.log('hi', email, pass);
        dispatch(signin(email, pass, props.history));
    };

    const goToSignup = () => {
        dispatch(logout);
        props.history.push('/auth/new');
    };

    // useEffect(() => {
    //     if (Cookie.get('tk')) props.history.replace('/');
    // });
    useEffect(() => {
        console.log('stattt', status, loading);
        // if (status === 200 && !loading) {
        //     if (Cookie.get('signRe') === true) props.history.replace('/');
        // }
        if (error) {
            if (status === 'XXXXX') {
                //already signed up
                // props.history.push("/signin");
            } else if (status === 'xxx') {
                // props.history.push("/verify");  //pending verification
            } else {
                setSnk({ sev: 'error', msg: error.error });
                setOpen(true);
            }
        }
        if (loading) {
            setSnk({ sev: 'info', msg: 'Submitting' });
            setOpen(true);
        }
        return () => {
            //
        };
    }, [loading, error, status, props.history]);

    const resetPasswordOnSubmit = (email) => {
        console.log("res", email)
        dispatch(resetPassword(email));

    }

    //snackbar close
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnk({});
        setOpen(false);
    };
    const showSnackbar = () => {
        return (
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={snk.sev}>
                    {snk.msg}
                </Alert>
            </Snackbar>
        );
    };
    return (
        <Grid container direction="column" alignItems="center" justify="center">
            < Grid item lg={8} md={8} xs>
                <Paper className={classes.paper} square elevation={3}>
                    <Grid container direction="row" >
                        <Grid item className={classes.signin_page_card_details} lg md xs>
                            <Grid className={classes.new_content}>
                                <Typography className={classes.new_heading}>Greetings from Best Enlist</Typography>
                                <Typography className={classes.new_para}>We have a lofty vision: to help every college student and recent graduate to discover their career path.
                            The world of work is constantly changing and evolving.</Typography>
                                <Typography className={classes.new_para}>It has changed a lot since we started working and it will change more shortly. Technology plays an important role and remains one of the main drivers.
                                It is our job to prepare students for what will likely be in the future. Complex problem solving, critical thinking, creative communication, and many more.
                            The valuable skills enlisted by corporates describes all about us.</Typography>
                                <Typography className={classes.new_para}>BestEnlist pairs with new job seekers to create or assist in opportunities that fit their degree, skill, and interest, enriching the job and candidate search more efficiently on all perspectives.</Typography>
                            </Grid>
                            <Grid className={classes.register_content} container direction="column" alignItems="center">
                                <Typography className={classes.signin_page_brand}> New to our Portal ? Click below to signup.</Typography>
                                <Button
                                    onClick={() => goToSignup()}
                                    variant='contained'
                                    className={classes.signin_page_signup_button}
                                    disableElevation
                                >
                                    Create new account
                        </Button>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.form_container} lg={4} md={5} xs>
                            <div>
                                <p className={classes.signin_page_welcome_text}>
                                    Welcome
                            </p>
                                <p className={classes.signin_page_welcome_sub}>
                                    Signin to your account
                            </p>
                                <SigninForm onSubmit={onSubmit} resetPasswordOnSubmit={resetPasswordOnSubmit} />
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </ Grid>
        </Grid>
    );
}