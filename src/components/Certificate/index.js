/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  makeStyles,
  Avatar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@material-ui/core";
import styles from "./certificate.module.css";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  addCertificateDetails,
  addCertificatePicture,
  removeCertificateDetail,
} from "../../actions/userActions";
import defImage from 'assets/images/uploadimg.svg';

const Certificate = ({
  expanded,
  onChange,
  id,
  addCertificateDetails,
  addCertificatePicture,
  certificateDetails,
  imageData,
}) => {
  const [picture, setPicture] = useState(defImage);
  // const inputFile = useRef(null);

  const [details, setDetails] = useState({});
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (certificateDetails[id]) {
      setDetails({ ...certificateDetails[id] });
    }
  }, [certificateDetails[id],certificateDetails]);

  useEffect(() => {
    setDetails({ ...certificateDetails[id] });

    if (imageData[id - 1]) {
      setPicture(imageData[id - 1]);
      setDefaultImage(imageData[id - 1]);
    }
  }, []);

  const setDefaultImage = (picture) => {
    const reader = new FileReader();
    reader.addEventListener("load", (data) => {
      setPicture(data.target.result);
    });
    reader.readAsDataURL(picture);
  };

  const useStyles = makeStyles({
    textField: {
      marginTop: 16,
    },
    imgStyle: {
      backgroundColor: "#EFECE8",
      color: "#2262c6",
    },
    img:{
        width:250,
        height:250,
        border:"2px solid #2262c6",
        borderRadius:10,
        margin:8,
        alignSelf:"center"
    }
  });

  const selectImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (data) => {
      addCertificatePicture(file);
      setPicture(data.target.result);
    });
    reader.readAsDataURL(file);
  };

  const inputFile = useRef(null);
  const styleObj = useStyles();

  const addDataToStore = (data) => {
    addCertificateDetails({ id: id, ...data });
  };

  return (
    <Accordion>
      <AccordionSummary>
        <p>Enter Certificate Details</p>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="row">
        <form>
        
            <TextField
            fullWidth
              className={styleObj.textField}
              label="Certificate Name"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={details ? details.certificationName : ""}
              onChange={(event) =>
                addDataToStore({
                  certificationName: event.target.value,
                })
              }
            />
            <TextField
              className={styleObj.textField}
              label="Course Completed Date"
              type="date"
              fullWidth
              defaultValue="2000-01-01"
              InputLabelProps={{ shrink: true }}
              value={details ? details.completionDate : ""}
              onChange={(event) =>
                addDataToStore({
                  completionDate: event.target.value,
                })
              }
              variant="outlined"
            />
            <TextField
              className={styleObj.textField}
              label="Validity"
              type="date"
              fullWidth
             
              InputLabelProps={{ shrink: true }}
              value={details ? details.validityDate : ""}
              helperText="Ignore if the certificate has lifetime validity"
              onChange={(event) =>
                addDataToStore({
                  validityDate: event.target.value,
                })
              }
              variant="outlined"
            />
            <TextField
              className={styleObj.textField}
              label="Issuing Authority"
              fullWidth
              value={details ? details.institute : ""}
              InputLabelProps={{ shrink: true }}
              onChange={(event) =>
                addDataToStore({
                  institute: event.target.value,
                })
              }
              variant="outlined"
            />
            {/* <input
              type="file"
              id="file"
              accept="image/*"
              ref={inputFile}
              onChange={selectImage}
              style={{ marginTop: 16, display: "none" }}
            /> */}
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => inputFile.current.click()}
              component="span"
              style={{ marginTop: 16 }}
            >
              Upload
            </Button> */}
    
        </form>
        {/* <img
          className={styleObj.img}
          src={picture}
          onClick={() => inputFile.current.click()}
          alt="upload certificate"
        /> */}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCertificateDetails: (data) => dispatch(addCertificateDetails(data)),
    addCertificatePicture: (data) => dispatch(addCertificatePicture(data)),
    removeCertificateDetail: (data) => dispatch(removeCertificateDetail(data)),
  };
};

const mapStateToProps = (state) => {

  return {
    certificateDetails: state.userProfile.certifications,
    imageData: state.userProfile.certificationPic,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Certificate);
