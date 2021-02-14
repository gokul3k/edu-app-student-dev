/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardContent, Grid, Typography, Avatar, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Edit } from "@material-ui/icons";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import SchoolIcon from "@material-ui/icons/School";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  changeProfileRegAddressInfo,
  changeProfileRegInfo,
  changeProfileSchoolInfo,
  setExperienceData,
  addDegreeDetails,
  addCertificateDetails,
  resetProfile,
} from "actions/userActions";
import userImage from "assets/images/user.svg";
import Footer from "components/Footer";
import SimpleLoading from "components/loading/SimpleLoading";
import MyDocument from "components/Resume";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getUserInfo } from "../../../actions/userActions";
import Cookie from 'js-cookie'
import ResponsiveDialog from "components/dialogs/ResponsiveDialog";
import ResDialog from "./ResDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 32,
    paddingBottom: 16,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
  colorBg: {
    backgroundColor: "#023e8a",
    height: 150,
  },
  newPaper: {
    marginTop: 8,
  },
  newPaper1: {
    marginTop: 32,
  },
  card: {
    position: "relative",
  },
  avatar: {
    width: 150,
    height: 150,
    position: "absolute",
    marginTop: -75,
    marginLeft: 18,
  },
  leftMargin: {
    marginLeft: 18,
  },
  subHeading: {
    fontSize: 20,
    marginLeft: 18,
  },
  inline: {
    display: "inline",
  },
  date: {
    fontSize: 12,
  },
  paper: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 4,
    paddingBottom: 4,
    marginLeft: 64,
    marginRight: 64,
    marginTop: 16,
    marginBottom: 16,
    [theme.breakpoints.down("md")]: {
      marginLeft: 16,
      marginRight: 16,
    },
  },
  fullName: {
    fontSize: 22,
    textTransform: "uppercase",
  },
  phone: {
    color: theme.palette.text.secondary,
    fontSize: 16,
  },
  email: {
    color: theme.palette.text.secondary,
    fontSize: 16,
  },
  id: {
    color: theme.palette.text.primary,
    fontSize: 16,
  },
  label: {
    color: "grey",
    marginRight: 4,
  },
  val: {
    fontWeight: "bold",
  },
  heading: {
    margin: 16,
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: 18,
  },
  resumeButton: {
    padding: "8px 16px",
    marginLeft: 64,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: 5,
    maxWidth: 200,
    textAlign: "center",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "black",
      textDecoration: "none",
      color: "white",
    },
  },
}));
const UserProfile = ({ getUserInfo, profileInfo, history }) => {
  const classes = useStyles();
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTimer(true)
    }, 4000);
    if (!(profileInfo.details && profileInfo.details.FullName))
      getUserInfo();

  }, []);

  const {
    details,
    degrees,
    certifications,
    address,
    academics,
    about,
    skills,
    experiences,
  } = profileInfo;
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(userImage);
  const [open, setOpen] = useState(false)
  useEffect(() => {
    console.log("EXPREE ", experiences, skills);
    if (details) {
      var parts = details.Dob.split('-');
      var mydate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      dispatch(
        changeProfileRegInfo({
          fullName: details.FullName,
          gender: details.Gender,
          dob: mydate,
          regNumber: details.RegNumber,
        })
      );
      dispatch(
        changeProfileRegAddressInfo("perm", {
          addressLine1: address[1].AddressLine1,
          addressLine2: address[1].AddressLine2,
          city: address[1].City,
          state: address[1].State,
          zipcode: address[1].Zipcode,
          phoneNo: address[1].PhoneNo,
          type: address[1].Type,
        })
      );
      dispatch(
        changeProfileRegAddressInfo("res", {
          addressLine1: address[0].AddressLine1,
          addressLine2: address[0].AddressLine2,
          city: address[0].City,
          state: address[0].State,
          zipcode: address[0].Zipcode,
          phoneNo: address[0].PhoneNo,
          type: address[0].Type,
        })
      );
      dispatch(
        changeProfileSchoolInfo({
          schoolName10: academics.SchoolName10,
          cgpa10: academics.Cgpa10,
          board10: academics.Board10,
          location10: academics.Location10,
          schoolName12: academics.SchoolName12,
          cgpa12: academics.Cgpa12,
          board12: academics.Board12,
          location12: academics.Location12,
          markType10: academics.MarkType10,
          markType12: academics.MarkType12,
        })
      );
      var sk = [];
      skills.map((item) => {
        sk.push(item.Skill);
      });
      dispatch(
        setExperienceData({
          skills: sk,
          aboutMe: about.About,
          experiences: experiences,
        })
      );
      degrees.map((item, index) => {
        dispatch(
          addDegreeDetails({
            id: `panel${index + 3}`,
            collegeName: item.CollegeName,
            degree: item.Degree,
            location: item.Location,
            cgpa: item.Cgpa,
            markType: item.MarkType
          })
        );
      });
      certifications.map((item, index) => 
         {if(item.validityDate && item.completionDate){
        var parts = item.completionDate.split('-');
        var mydate1 = `${parts[2]}-${parts[1]}-${parts[0]}`
        var parts = item.validityDate.split('-');
        var mydate2 = `${parts[2]}-${parts[1]}-${parts[0]}`
        addCertificateDetails({
          id: index + 1,
          certificationName: item.CertificationName,
          institute: item.Institute,
          completionDate: mydate1,
          validityDate: mydate2,
        });
      }
      });
    }
    return () => { };
  }, [details]);
  useEffect(() => {
    if (Object.keys(profileInfo).length !== 0) {
      setPicture(details.ProfilePic);
    }
  }, [profileInfo]);

  const handleClose =()=>{
    setOpen(false)
  }

  if (Object.keys(profileInfo).length === 0)
    return <SimpleLoading open={true} />;
  else
    return (
      <div className={classes.root}>
        <Grid container className={classes.newPaper} justify="center">
          <Grid item xs={12} sm={8}>
            <Card>
              <CardContent className={classes.card}>
                <div className={classes.colorBg}></div>
                <Avatar
                  src={details.ProfilePic}
                  alt={details.FullName}
                  className={classes.avatar}
                />

                <Grid container justify="flex-end" style={{ marginTop: 14 }}>
                  <ResDialog profileInfo={profileInfo} open={open} handleClose={handleClose} />
                  {timer&&profileInfo.details && profileInfo.details.FullName.length > 1 ? (
                  <Button variant="contained" color="primary" onClick={()=>setOpen(true)}>Get Resume</Button>
                  ):(<Typography>Please wait,Generating Resume...</Typography>)}
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  style={{ marginTop: 28 }}
                >
                  <Grid item direction="column" className={classes.leftMargin}>
                    <Typography className={classes.fullName}>
                      {details.FullName}
                    </Typography>
                    <Typography>{details.Email}</Typography>
                    <Typography>
                      {address[0].AddressLine1}, {address[0].City}
                    </Typography>
                    <Typography>
                      {address[0].State}, Phone {address[0].PhoneNo}
                    </Typography>
                  </Grid>
                  <Grid item direction="column">
                    <Typography style={{marginLeft:18}}>
                      Gender<b>{" "}
                      {details.Gender == "M"
                        ? "MALE"
                        : details.Gender == "F"
                          ? "FEMALE"
                          : "TRANSGENDER"}</b>
                    </Typography>
                    <Typography style={{marginLeft:18}}>Date of Birth <b>{details.Dob}</b></Typography>
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  size="small"
                  color="primary"

                  onClick={() =>
                    history.push({
                      pathname: "/register",
                      state: { edit: true },
                    })
                  }
                  disableElevation
                  style={{ textTransform: "inherit", marginTop: 4, marginLeft: 18 }}
                >
                  <Edit style={{ fontSize: 12 }} />
                &nbsp;&nbsp;Edit
              </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* about */}
        <Grid container className={classes.newPaper1} justify="center">
          <Grid item xs={12} sm={8}>
            <Card>
              <CardContent className={classes.card}>
                <Typography className={classes.subHeading}>Objective</Typography>

                <Typography style={{ marginLeft: 32 }}>{about.About}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container className={classes.newPaper1} justify="center">
          <Grid item xs={12} sm={8}>
            <Card>
              <CardContent className={classes.card}>
                <Typography className={classes.subHeading}>Schooling</Typography>

                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <SchoolIcon />
                    </ListItemAvatar>
                    <ListItemText
                      primary={academics.SchoolName10}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {academics.Board10}, {academics.Location10}
                          </Typography>
                          <Typography variant="body2" className={classes.cgpa}>Cgpa/Percentage:&nbsp;{academics.Cgpa10}</Typography>
                        </React.Fragment>
                      }
                      t
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AccountBalanceIcon />
                    </ListItemAvatar>
                    <ListItemText
                      primary={academics.SchoolName12}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {academics.Board12}, {academics.Location12}
                          </Typography>
                          <Typography variant="body2" className={classes.cgpa}>Cgpa/Percentage:&nbsp;{academics.Cgpa12}</Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container className={classes.newPaper1} justify="center">
          <Grid item xs={12} sm={8}>
            <Card>
              <CardContent className={classes.card}>
                <Typography className={classes.subHeading}>Degrees</Typography>

                <List>
                  {degrees.map((element) => {
                    return (
                      <>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <SchoolIcon />
                          </ListItemAvatar>
                          <ListItemText
                            primary={element.CollegeName}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  {element.Degree}, {element.Location}
                                </Typography>
                                <Typography variant="body2" className={classes.cgpa}>Cgpa/Percentage:&nbsp;{element.Cgpa}</Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {certifications.length > 0 ? (
          <Grid container className={classes.newPaper1} justify="center">
            <Grid item xs={12} sm={8}>
              <Card>
                <CardContent className={classes.card}>
                  <Typography className={classes.subHeading}>
                    Certifications
                </Typography>

                  <List>
                    {certifications.map((element) => {
                      return (
                        <>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <CardMembershipIcon />
                            </ListItemAvatar>
                            <ListItemText
                              primary={element.CertificationName}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                  >
                                    {element.Institute}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : null}

        {experiences.length > 0 ? (
          <Grid container className={classes.newPaper1} justify="center">
            <Grid item xs={12} sm={8}>
              <Card>
                <CardContent className={classes.card}>
                  <Typography className={classes.subHeading}>
                    Experiences
                </Typography>

                  <List>
                    {experiences.map((element) => {
                      return (
                        <>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <CardMembershipIcon />
                            </ListItemAvatar>
                            <ListItemText
                              primary={element.CompanyName}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                  >
                                    {element.JobTitle}
                                  </Typography>
                                  <Typography className={classes.date}>
                                    {element.FromDate} to {element.ToDate.length === 0 ? "Present" : element.ToDate}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : null}

        {skills.length > 0 ? (
          <Grid container className={classes.newPaper1} justify="center">
            <Grid item xs={12} sm={8}>
              <Card>
                <CardContent className={classes.card}>
                  <Typography className={classes.subHeading}>Skills</Typography>

                  <List component="nav" aria-label="secondary mailbox folders">
                    {skills.map((element) => {
                      return (
                        <>
                          <ListItem>
                            <ListItemText primary={element.Skill} />
                          </ListItem>
                          <Divider />
                        </>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : null}


        <Footer />
      </div>
    );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
  };
};

const mapStateToProps = (state) => {
  console.log("The state value is ", state.userProfile.profileInfo);
  return {
    profileInfo: state.userProfile.profileInfo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
