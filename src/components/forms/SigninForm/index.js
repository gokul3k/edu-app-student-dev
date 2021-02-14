import React, { useState, useRef, useEffect } from "react";
import styles from "./SigninForm.module.css";
import PasswordResetDialog from "../../dialogs/PasswordResetDialog";
import { useSelector } from "react-redux";

import { Form, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";

import Alert from "react-bootstrap/Alert";  

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon color="white" icon={faEye} />;
const eyeSlash = <FontAwesomeIcon color="white" icon={faEyeSlash} />;

const SigninForm = ({ onSubmit,resetPasswordOnSubmit }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading } = userSignin;

  const [passwordShown, setPasswordShown] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Enter valid email")
      .email("Email is not valid"),
    pass: yup.string().required("Enter password"),
  });
  const formRef = useRef(null);
  const handleReset = () => {
    formRef.current.reset();
  };
  const submit = (a) => {
    // Do stuff here
    // On success or error:
    
    handleReset();
    onSubmit(a);
  };
  const renderAlert = (errors, touched) => {
    if (!!errors.email && !touched.email)
      return (
        <Alert className={`${styles.custom_alert} mx-auto`} variant="danger">
          {errors.email}
        </Alert>
      );
    if (!!errors.pass && !touched.pass)
      return (
        <Alert className={`${styles.custom_alert} mx-auto`} variant="danger">
          {errors.pass}
        </Alert>
      );
    if (!!errors.pass2 && !touched.pass2)
      return (
        <Alert className={`${styles.custom_alert} mx-auto`} variant="danger">
          {errors.email}
        </Alert>
      );
  };
  return (
    <div>
    <PasswordResetDialog resetPasswordOnSubmit={resetPasswordOnSubmit} handleClickOpen={handleClickOpen} handleClose={handleClose} open={openDialog}/>
    <Formik
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        if (loading === false) {
          resetForm({
            values: {
              email: "",
              pass: "",
              terms: false,
            },
          });
          handleReset();
        }
        submit(values, resetForm);
      }}
      initialValues={{
        email: "",
        pass: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form ref={formRef} noValidate onSubmit={handleSubmit}>
          {/* {renderAlert(errors,touched)} */}

          <Form.Group controlId="formBasicEmail">
            <Form.Label className={styles.label222}>Email</Form.Label>
            <Form.Control
              className={`${styles.form_input} mx-auto w-100`}
              name="email"
              isInvalid={!!errors.email}
              onChange={handleChange}
              disabled={loading}
              type="email"
              required
            />
            <Form.Control.Feedback className={styles.invalid} type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className={styles.label222}>Password</Form.Label>
            <i className="float-right" onClick={togglePasswordVisiblity}>
              {passwordShown ? eye : eyeSlash}
            </i>
            <Form.Control
              className={`${styles.form_input} mx-auto w-100`}
              name="pass"
              type={passwordShown ? "text" : "password"}
              disabled={loading}
              isInvalid={!!errors.pass}
              onChange={handleChange}
            />
            <Form.Control.Feedback className={styles.invalid} type="invalid">
              {errors.pass}
            </Form.Control.Feedback>
            <Button className={`${styles.password_reset_button}`} onClick={()=>setOpenDialog(true)}>Forgot password?</Button>
          </Form.Group>
          <Button
            className={styles.login_button}
            color="secondary"
            variant="contained"
            disabled={loading}
            disableElevation={true}
            type="submit"
          >
            <Spinner
              className={loading ? "my-auto" : "d-none"}
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {loading ? "" : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default SigninForm;
