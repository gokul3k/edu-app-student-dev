import {
  makeStyles,
  TextField,
  Grid,
  Button,
  Paper,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import ExperienceForm from "components/forms/ExperienceForm";
import ChipInput from "material-ui-chip-input";
import React, { useState, useEffect } from "react";
import Experience from "./Experience";
import { useSelector, useDispatch } from "react-redux";
import { setExperienceData } from "actions/userActions";
import ExperienceDialog from "components/dialogs/ExperienceDialog";
import api from "api/api";
import { getCredentials } from "services/authService";

const useStyles = makeStyles((theme) => ({
  root: {},
  btnDiv: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
  },
  col: {
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  paper: {
    padding: 8,
    marginTop: 12,
  },
}));
const ExperienceRoute = ({ handleSubmit, handlePrev }) => {
  const classes = useStyles();
  const userProfile = useSelector((state) => state.userProfile);
  const { skills, experiences, about } = userProfile;

  const dispatch = useDispatch();
  const [exps, setExps] = useState([]);
  const [exp, setExp] = useState({});
  const [skillData, setSkillData] = useState([]);
  const [aboutData, setAboutData] = useState("");
  const handleChange = (chips) => {
    setSkillData(chips);
    console.log(chips, " s0fds ", skillData);
  };
  var sk = [];
  useEffect(() => {
    if (userProfile.profileInfo) {
      if (userProfile.profileInfo.skills) {
        var sk = [];
        userProfile.profileInfo.skills.map((item) => {
          sk.push(item.Skill);
        });
        console.log(sk, "vlav");
        setSkillData(sk);
      }

      if (userProfile.profileInfo.about)
        setAboutData(userProfile.profileInfo.about.About);
        else  getDefaultAbout();
      if (userProfile.profileInfo.experiences) {
        var ep = [];
        userProfile.profileInfo.experiences.map((item) => {
          ep.push(
            {
              id: item.id,
              studentId: item.StudentId,
              jobTitle: item.JobTitle,
              companyName: item.CompanyName,
              fromDate: item.FromDate,
              toDate: item.ToDate,
            }
          );
        });
        setExps(ep);
      }
    }
    else  getDefaultAbout();
    return () => { };
  }, []);



  const getDefaultAbout = async () => {
    try {
      const res = await api.post(
        "/getDefaultAboutUs",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCredentials()}`,
          },
        },
        { timeout: 1000 }
      );
      console.log("ABOUT ", res.data);
      if (res.data.response.length > 0) {
        setAboutData(res.data.response[0].About);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addExperience = (values, id) => {
    setExps((exps) => exps.concat(values));
  };
  const delExp = (id) => {
    setExps((data) => data.filter((item, j) => id !== j));
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Add Chips
  const handleAddChip = (chip) => {
    if (!skillData.includes(chip))
      setSkillData(
        [...skillData, chip]
      );
  }
  // Delete Chips
  const handleDeleteChip = (chip) => {
    var temp = []
    skillData.map(item => {
      if (item !== chip)
        temp.push(item)
    })
    setSkillData(
      temp
    );
  }
  return (
    <div className={classes.container}>
      <ExperienceDialog
        addExp={addExperience}
        exp={exp}
        id={exps.length}
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
      />
      <form className={classes.formStyle}>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item className={classes.col}>
            <ChipInput
              label="skills"
              variant="outlined"
              fullWidth
              value={skillData}
              defaultValue={sk}
              placeholder="eg:java ,html"
              helperText="Press enter after a skill"
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip, index) => handleDeleteChip(chip, index)}
            // onChange={(chips) => handleChange(chips)}
            />
          </Grid>
          <Grid item className={classes.col}>
            <TextField
              label="About"
              multiline
              required
              value={aboutData}
              fullWidth
              onChange={(event) => setAboutData(event.target.value)}
              rows={4}
              error={aboutData.length<1}
              helperText={aboutData.length<1?"Please enter value to continue":""}
              placeholder="Type something about you"
              variant="outlined"
            />
          </Grid>
          <Grid item className={classes.col}>
            <Paper className={classes.paper}>
              <Grid container direction="row" justify="space-between">
                <Typography>Add experience</Typography>

                <IconButton onClick={() => setOpen(true)}>
                  <Add color="primary" />
                </IconButton>
              </Grid>
              <Grid>
                {exps.map((e, i) => (
                  <Experience exp={e} id={i} delExp={delExp} />
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <div className={classes.btnDiv}>
          <Button onClick={handlePrev}>Previous</Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
    
            onClick={() => {
              console.log("here", skillData, aboutData, exps);
              dispatch(
                setExperienceData({
                  skills: skillData,
                  aboutMe: aboutData,
                  experiences: exps,
                })
              );
              if(aboutData.length>0)
              handleSubmit();
            }}
          >
            submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceRoute;
