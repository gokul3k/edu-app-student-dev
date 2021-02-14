import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import {
  Stepper,
  Step,
  StepLabel,
  Backdrop,
  CircularProgress,
  Grid,
  Button,
  Paper,
} from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import First from "./firstRoute";
import Second from "./secondRoute";
import Snackbar from "@material-ui/core/Snackbar";
import Third from "./thirdRoute";
import Fourth from "./fourthRoute";
import ExperienceRoute from "./ExperienceRoute";
import MuiAlert from "@material-ui/lab/Alert";
import {
  changeProfileRegAddressInfo,
  submitUserData,
} from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Close } from "@material-ui/icons";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.light,
    backgroundColor: "white",
  },
  root: {
    backgroundImage: "url('../../assets/images/loginbg.png')",
    padding: 16,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "auto",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      padding: 0,
      backgroundColor: "white",
    },
  },
  paper: {
    margin: 16,
    padding: 32,
    scrollbarWidth: "thin",
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      padding: 8,
      width: "100%",
      margin: 0,
    },
  },
}));
const Registration = ({ userProfile, location }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [snk, setSnk] = useState("");
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { profileInfo } = useSelector((state) => state.userProfile)
  const [nextButtonText, setNextButtonText] = useState("Continue");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const steps = [
    "Personal Information",
    "Contact Details",
    "Educational Information",
    "Certifications",
    "Experience",
  ];

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    if (profileInfo)
      if (profileInfo.details)
        if (profileInfo.details.FullName)
          dispatch(submitUserData(history, setLoading, true));
        else
          dispatch(submitUserData(history, setLoading, false));
      else
        dispatch(submitUserData(history, setLoading, false));
    else
      dispatch(submitUserData(history, setLoading, false));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnk("");
    setOpen(false);
  };

  const showSnackbar = () => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={"error"}>
          {snk}
        </Alert>
      </Snackbar>
    );
  };

  const handleNext = () => {
    if (activeStep >= 0) {
      setActiveStep(activeStep + 1);
    }
  };
  useEffect(() => {
    if (location.state && location.state.edit && !profileInfo.details) {
      history.replace('/home')
    }
    return () => {

    }
  }, [])

  const checkIfDataIsNull = () => {
    const {
      userInfo,
      profilePic,
      addressInfo,
      academics,
      degree,
      certifications,
      certificationPic,
    } = userProfile;
    const {
      fullName,
      gender,
      dob,
      regNumber,
    } = userInfo;

    const { residence, permanent } = addressInfo;

    const {
      addressLine1,
      addressLine2,
      city,
      state,
      zipcode,
      phoneNo,
    } = residence;

    const {
      schoolName10,
      cgpa10,
      board10,
      location10,
      schoolName12,
      cgpa12,
      board12,
      location12,
    } = academics;

    if (
      fullName === "" &&
      regNumber === "" &&
      profilePic === ""
    ) {
      return "Personal information";
    }
    if (
      !permanent.addressLine1 &&
      !permanent.addressLine2 &&
      !permanent.city &&
      !permanent.state &&
      !permanent.zipcode &&
      !permanent.phoneNo
    ) {
      return "Contact Details";
    }
    if (
      !addressLine1 &&
      !addressLine2 &&
      !city &&
      !state &&
      !zipcode &&
      !phoneNo
    )
      return "Contact Details";

    if (
      !schoolName10 &&
      !cgpa10 &&
      !board10 &&
      !location10 &&
      !schoolName12 &&
      !cgpa12 &&
      !board12 &&
      !location12
    )
      return "Education Information";

    return false;
  };
  if (location.state && location.state.edit && !userProfile) return null
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      {showSnackbar()}
      {/* <Header /> */}
      {loading && (
        <Backdrop
          className={classes.backdrop}
          open={loading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Paper className={classes.paper}>
        {console.log(location.state)}
        {location.state && location.state.edit === true && (<Grid container direction="row" justify="flex-end">
          <Button size="small" onClick={() => history.replace('/home')} disableElevation variant="contained" color="secondary"><Close />close</Button>
        </Grid>)}
        <Stepper
          activeStep={activeStep}
          orientation={matches ? "horizontal" : "vertical"}
        >
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label} </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 ? (
          <First
            handleNext={() => handleNext()}
            handlePrev={() => handlePrev()}
          />
        ) : activeStep === 1 ? (
          <Second
            handleNext={() => handleNext()}
            handlePrev={() => handlePrev()}
          />
        ) : activeStep === 2 ? (
          <Third
            handleNext={() => handleNext()}
            handlePrev={() => handlePrev()}
          />
        ) : activeStep === 3 ? (
          <Fourth
            handlePrev={() => handlePrev()}
            handleNext={() => handleNext()}
          />
        ) : (
                  <ExperienceRoute
                    handlePrev={() => handlePrev()}
                    handleSubmit={() => handleSubmit()}
                  />
                )}
      </Paper>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitData: (history, setLoading) =>
      dispatch(submitUserData(history, setLoading)),
  };
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
