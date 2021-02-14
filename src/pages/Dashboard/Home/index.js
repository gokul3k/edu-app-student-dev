/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button, Divider, Grid, Typography, Card, CardContent, Paper } from "@material-ui/core";
import styles from "./styles.module.css";
import DashboardMetrics from "components/DashboardMetrics";
import UpcomingExamTable from "components/UpcomingExamsTable";
import Adview from "components/Adview";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "actions/userActions";
import { getUpcommingExams } from "actions/examActions";
import api from "api/api";
import { getCredentials } from "services/authService";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "components/Carousel";
import ExamListItem from "components/List/ExamListItem";
import InterviewListItem from "components/List/InterviewListItem";
import SimpleLoading from "components/loading/SimpleLoading";
import Footer from 'components/Footer';
import bannerImage from 'assets/images/banner1.jpg'
import usrimg from 'assets/images/user.svg'
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    // paddingTop:32,
  },
  paper: {
    margin: 32,
    padding: 32,
  },
  title: {
    fontSize: 30,
    color: "#e63946",
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 8,
  },
  subcontainer: {
    paddingLeft: 42,
    paddingRight: 42,
  },
  sideImg: {
    height: 200,
    width: "100%",
  },
  emptyState: {
    fontSize: 15,
    fontWeight: "bold"
  },
  colorBg: {
    backgroundColor: "#023e8a",
    height: 100,
    width: "100%"
  },
  sideCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    marginTop: 50
  },
  name: {
    color: "#e63946",
    fontWeight: "bold",
    marginTop: 50,
    maxWidth: 250,
    wordWrap: "break-word"
  },
  email: {
    color: "#979dac",
    maxWidth: 250,
    wordWrap: "break-word"
  },
  sideCardContents: {
    padding: 18,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start"
  },
  items: {
    color: "#023e8a",
    fontSize: 14
  },
  values: {
    fontSize: 16
  },
  gridItems: {
    marginBottom: 8
  },
  welcome: {
    color: "#023e8a",
    fontWeight: "bold",
    fontSize: 32
  },
  description: {
    letterSpacing: 2,
    fontSize: 14
  },
  info: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const DashboardHome = ({ history }) => {
  const classes = useStyles();
  const { upcomingExams, examloading } = useSelector(
    (state) => state.upcomingExams
  );
  const dispatch = useDispatch();
  const { profileInfo } = useSelector((state) => state.userProfile);
  useEffect(() => {
    dispatch(getUpcommingExams());
    dispatch(getUserInfo());
    getAds();
    getPhotoAds()
    getCountDetails();
    getInterviews();
  }, []);
  const [item, setItem] = useState([]);
  const [examCompletedCount, setExamCompletedCount] = useState(0);
  const [examPendingCount, setExamPendingCount] = useState(0);
  const [interviews, setInterviews] = useState([]);
  const [photoAd, setPhotoAd] = useState()
  const [percent, setPercent] = useState(0)
  const getInterviews = async () => {
    try {
      const res = await api.post(
        "/getInterviews",
        null,
        {
          headers: {
            Authorization: `Bearer ${getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );
      var interviews = res.data.response;
      interviews = interviews.slice(0, 5);
      setInterviews(interviews);
    } catch (error) {
      console.log(error);
    }
  }
  const getAds = async () => {
    try {
      const { data } = await api.post(
        "/getTextAd",
        {},
        {
          headers: {
            Authorization: `Bearer ${getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setItem(data.response.adZone5[0]);
    } catch (err) { }
  };
  const getPhotoAds = async () => {
    try {
      const { data } = await api.post(
        "/getPhotoAd",
        {},
        {
          headers: {
            Authorization: `Bearer ${getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPhotoAd(data.response);
    } catch (err) { }
  };

  const getCountDetails = async () => {
    try {
      const { data } = await api.post("/getCountDetails", null, {
        headers: {
          Authorization: `Bearer ${getCredentials()}`,
          "Content-Type": "application/json",
        },
      });

      setExamCompletedCount(data.response.completedCount);
      setExamPendingCount(data.response.pendingCount);
      setPercent(data.response.percentage)
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.keys(profileInfo).length === 0) return <SimpleLoading open={true} />;


  return (
    <div className={classes.container}>

      <Carousel
        carousels={
          [photoAd ? photoAd.adZone2 ? photoAd.adZone2[0].AdImageUrl : bannerImage : bannerImage,
          photoAd ? photoAd.adZone1 ? photoAd.adZone1[0].AdImageUrl : bannerImage : bannerImage]} />
      <Grid
        container
        direction="row"
        justify="space-between"
        spacing={4}
        className={classes.subcontainer}
      >
        <Grid item lg md>
          <div className={classes.info}>
            <Typography variant="h5" color="default">
              <span className={classes.welcome}>Welcome,</span> {profileInfo.details.FullName}
            </Typography>
            <br />
            <Typography className={classes.description}>
              BestEnlist has a lofty vision: to help you discover a great career path, because the world of work is constantly changing and evolving.
              Through our online assessments bring out the best skills in you for a organization.
              We assist you in finding jobs that fit your degree, skill and interests.
              Feel free to take the assessments tests and interviews...
            </Typography>
          </div>
          <div className={classes.upcoming}>
            <Typography className={classes.title}>Examinations</Typography>
            {examloading
              ? "loading"
              : !upcomingExams ?
                <span className={classes.emptyState}>No exams assigned for you!</span> :
                upcomingExams.length === 0 ? (<span className={classes.emptyState}>No exams assigned for you!</span>) : upcomingExams.map((item, index) =>
                  index < 2 ? (
                    <ExamListItem data={item} history={history} />
                  ) : null
                )}
            {upcomingExams&&upcomingExams.length >= 2 && (<Button
              variant="text"
              color="primary"
              onClick={() => history.push("/home/exams")}
            >
              View More
            </Button>)}
            <br/>
            {examCompletedCount>0&&(<Button variant="outlined" style={{marginTop: 11}} onClick={() => history.push("/home/analysis")}>View Previous Results</Button>)}
          </div>
          <div className={classes.upcoming}>
            <Typography className={classes.title}>
              Interviews
            </Typography>
            {examloading
              ? "loading"
              : !interviews ? <span className={classes.emptyState}>No interviews assigned for you!</span> :
                interviews.length === 0 ? (<span className={classes.emptyState}>No interviews assigned for you!</span>) : interviews.map((item, index) =>
                  index < 2 ? <InterviewListItem data={item} /> : null
                )}
            {interviews.length >=2 && (<Button
              variant="text"
              color="primary"
              onClick={() => history.push("/home/interviews")}
            >
              View More
            </Button>)}
          </div>
          <div className={classes.upcoming} style={{maxWidth:750}}>
            {"CompanyName" in item ? (
              <Adview item={item} style={{ marginTop: "16px" }} />
            ) : null}
          </div>
        </Grid>
        <Grid item lg={3} xs style={{ maxWidth: 300 }} alignItems="center">
          <Paper className={classes.sideCard}>
            <div className={classes.colorBg}></div>
            <img src={(profileInfo.details.ProfilePic) ? (profileInfo.details.ProfilePic != '') ? profileInfo.details.ProfilePic : usrimg : usrimg} className={classes.userImage} />
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography className={classes.name}>{profileInfo.details.FullName}</Typography>
              <Typography className={classes.email}>{profileInfo.details.Email}</Typography>
            </Grid>
            <Divider />
            <div className={classes.sideCardContents}>

              <Grid
                className={classes.gridItems}
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Link to="/home/analysis" className={classes.items}>Exams Completed</Link>
                <Typography className={classes.values}>{examCompletedCount}</Typography>
              </Grid>
              <Grid
                className={classes.gridItems}
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Link to="/home/exams" className={classes.items}>Pending Exams</Link>
                <Typography className={classes.values}>{examPendingCount}</Typography>
              </Grid>
              <Grid
                className={classes.gridItems}
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Link to="/home/analysis" className={classes.items}>Average Score</Link>
               {percent==="NaN"?( <Typography className={classes.values}>NA</Typography>):
               ( <Typography className={classes.values}>{percent}%</Typography>)}
              </Grid>
            </div>
          </Paper>
          {photoAd && photoAd.adZone3 && (
            <img src={photoAd.adZone3[0].AdImageUrl} alt="" className={classes.sideImg} />
          )}
          {photoAd && photoAd.adZone4 && (
            <img src={photoAd.adZone4[0].AdImageUrl} alt="" className={classes.sideImg} />
          )}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default DashboardHome;
