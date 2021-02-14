import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  makeStyles,
  FormControlLabel,
  FormLabel,
  Grid,
} from "@material-ui/core";
import styles from "./style.module.css";
import { connect, useSelector } from "react-redux";
import {
  changeProfileRegInfo,
  changeProfilePicture,
} from "../../../actions/userActions";
import moment from 'moment'
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import ImageUploader from "react-images-upload";
import { findByLabelText } from "@testing-library/react";
import usrimg from "assets/images/add-Profile-pic.png";
import { useFormik } from "formik";
import * as Yup from "yup";

const FirstRoute = ({
  userProfile,
  changeProfileRegInfo,
  handleNext,
  handlePrev,
  profilePic,
  changeProfilePicture,
}) => {
  const {
    fullName,
    gender,
    dob,
    regNumber
  } = userProfile;
  const { profileInfo } = useSelector((state) => state.userProfile);
  const inputFile = useRef(null);


  const useStyles = makeStyles({
    textField: { marginTop: 16, maxWidth: 600 },
    btnStyle: {
      backgroundColor: "rgb(39, 101, 195)",
      borderRadius: 10,
      borderWidth: 0,
      color: "white",
      paddingRight: 32,
      paddingLeft: 32,
      paddingTop: 4,
      paddingBottom: 4,
    },
    container: {
      display:"flex",
      justifyContent:"center"
    },
    formStyle:{
      display:"flex",
      flexDirection:"column",

      alignItems:"center"
    },
    img: {
      width: 150,
      height: 150
    }
  });

  const [picture, setPicture] = useState(usrimg);
  const classes = useStyles();
  useEffect(() => {
    if (profileInfo)
      if (profileInfo.details){
        if (profileInfo.details.ProfilePic)
          setPicture(profileInfo.details.ProfilePic);

      }
    return () => {};
  }, []);

  const onDrop = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (data) => {
      setPicture(data.target.result);
      // changeProfilePicture(data.target.result);
      changeProfilePicture(file);
    });
    reader.readAsDataURL(file);
  };

  const setDefaultImage = (picture) => {
    const reader = new FileReader();
    reader.addEventListener("load", (data) => {
      setPicture(data.target.result);
    });
    reader.readAsDataURL(picture);
    return picture;
  };

  const formik = useFormik({
    initialValues: {
      fullName: fullName ? fullName : "",
      gender: gender ? gender : "",
      profileP: profilePic ? setDefaultImage(profilePic) : null,
      dob: dob ? dob : "2000-01-01",
      regNumber: regNumber ? regNumber : "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      gender: Yup.string().required("Select a gender"),
      dob: Yup.date().required("Enter date of birth"),
      // profileP: Yup.mixed().required('Upload a profile picture'),
      regNumber: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      changeProfileRegInfo({
        fullName: values.fullName,
        gender: values.gender,
        dob: values.dob,
        regNumber: values.regNumber
      });
      handleNext();
    },
  });

  return (
    <Grid className={classes.container} alignItems="center">
      <form className={classes.formStyle} onSubmit={formik.handleSubmit}>
        <Grid container direction="column">
        {/* <FormControl component="fieldset" error={!!formik.errors.gender}>
          <img
            onClick={() => inputFile.current.click()}
            className={classes.img}
            src={picture}
            alt="Upload"
            name=""
          />

          <input
            type="file"
            ref={inputFile}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(event) => {
              formik.setFieldValue("profileP", event.currentTarget.files[0]);
              onDrop(event);
            }}
          />
          <FormHelperText style={{ marginTop: "-2px" }}>
            {formik.errors.profileP}
          </FormHelperText>
        </FormControl> */}

        <TextField
          className={classes.textField}
          label="Full Name"
          variant="outlined"
          name="fullName"
          autoFocus
          error={!!formik.errors.fullName && formik.touched.fullName}
          helperText={
            !!formik.errors.fullName && formik.touched.fullName
              ? formik.errors.fullName
              : ""
          }
          onChange={formik.handleChange}
          value={formik.values.fullName}
        />
        {/* <TextField
                    className={classes.textField}
                    label="Father's Name"
                    variant='outlined'
                    name='guardianName'
                    error={
                        !!formik.errors.guardianName &&
                        formik.touched.guardianName
                    }
                    helperText={
                        !!formik.errors.guardianName &&
                        formik.touched.guardianName
                            ? formik.errors.guardianName
                            : ''
                    }
                    value={formik.values.guardianName}
                    onChange={formik.handleChange}
                /> */}
        <FormControl
          className={classes.textField}
          component="fieldset"
          error={!!formik.errors.gender && formik.touched.gender}
        >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            name="gender"
            row
            value={formik.values.gender}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="F" label="Female" control={<Radio />} />
            <FormControlLabel value="M" label="Male" control={<Radio />} />
            <FormControlLabel
              value="O"
              label="Transgender"
              control={<Radio />}
            />
          </RadioGroup>
          <FormHelperText style={{ marginTop: "-2px" }}>
            {!!formik.errors.gender && formik.touched.gender
              ? formik.errors.gender
              : false}
          </FormHelperText>
        </FormControl>

        <TextField
          className={classes.textField}
          label="Date Of Birth"
          type="date"
          variant="outlined"
          name="dob"
          error={!!formik.errors.dob && formik.touched.dob}
          helperText={
            !!formik.errors.dob && formik.touched.dob ? formik.errors.dob : ""
          }
          InputLabelProps={{ shrink: true }}
          value={formik.values.dob}
          onChange={(event) => {
            formik.setFieldValue("dob", event.target.value);
          }}
        />

        <TextField
          className={classes.textField}
          label="College Reg No"
          variant="outlined"
          name="regNumber"
          error={
            !!formik.errors.regNumber &&
            formik.touched.regNumber
          }
          helperText={
            !!formik.errors.regNumber &&
            formik.touched.regNumber
              ? formik.errors.regNumber
              : ""
          }
          value={formik.values.regNumber}
          onChange={formik.handleChange}
        />

        <Button
          className={styles.btn}
          variant="contained"
          color="primary"
          disableElevation
          type="submit"
        >
          Continue
        </Button>
        </Grid>
      </form>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProfilePicture: (data) => dispatch(changeProfilePicture(data)),
    changeProfileRegInfo: (data) => dispatch(changeProfileRegInfo(data)),
  };
};

const mapStateToProp = (state) => {
  return {
    userProfile: state.userProfile.userInfo,
    profilePic: state.userProfile.profilePic,
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(FirstRoute);
