import React, { useEffect, useState } from 'react';
// import { Link } from '''dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from 'actions/userActions';
import SignupForm from 'components/forms/SignupForm';

import { Snackbar, Button, Grid, Paper, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Cookie from 'js-cookie';
import accImage from 'assets/images/undraw_certification_aif8.png'


const useStyles = makeStyles((theme) => ({
    signup_welcome_text:{
        textAlign: 'center',
        color: 'white',
        fontSize: '1.5rem',
        marginTop:42 ,
        marginBottom:32,
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
export default function Signup(props) {
    const classes = useStyles();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, status } = userRegister;

    const dispatch = useDispatch();
    //for snack
    const [snk, setSnk] = useState({});
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    //form onsubmit
    const onSubmit = ({ email, pass2 }) => {
        console.log('hi', email, pass2);
        dispatch(register(email, pass2));
    };

    //if submit status is changed
    useEffect(() => {
        console.log('useEff', userRegister);
        if (status === 200 && !loading) {
            if (Cookie.get('regRe')) props.history.push('/verify');
        }
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
    }, [loading, error, status, userRegister, props.history]);

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

    const goToLogin = () => {
        props.history.push('/auth');
    };
    return (
        <Grid container direction="column" alignItems="center" justify="center">
            < Grid item lg={8} md={12}>
                <Paper className={classes.paper} square elevation={3}>
                    <Grid container direction="row" >
                        <Grid item className={classes.signin_page_card_details} lg>
                            <Grid className={classes.new_content}>
                           <img src={accImage} style={{maxWidth:500}}/>
                            </Grid>
                            <Grid className={classes.register_content} container direction="column" alignItems="center">
                                <Typography className={classes.signin_page_brand}>BestEnlist Portal</Typography>
                                <Button
                                    onClick={() => goToLogin()}
                                    variant='contained'
                                    className={classes.signin_page_signup_button}
                                    disableElevation
                                >
                                    Already have an account? Login
                        </Button>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.form_container} lg={4}>
                        <div>
                            <p className={classes.signup_welcome_text}>
                                Welcome
                            </p>
                            {/* {SignupForm()} */}
                            <SignupForm onSubmit={onSubmit} />
                            {/* <div
                                style={{
                                    display: 'flex',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    margin: '16px',
                                }}
                            >
                                <Link className={styles.signup_page_toc}>
                                    Terms and conditions
                                </Link>
                            </div> */}
                        </div>
                        </Grid>
                    </Grid>
                </Paper>
            </ Grid>
        </Grid>
    );
}