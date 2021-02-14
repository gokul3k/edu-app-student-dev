import React, { useState, useRef } from "react";
import styles from "./SignupForm.module.css";
import { useSelector } from "react-redux";

import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import {
  Form,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
const eye = <FontAwesomeIcon color="white" icon={faEye} />;
const eyeSlash = <FontAwesomeIcon color="white" icon={faEyeSlash} />;
const useStyles = makeStyles({

  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#e53935',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#e53935',
    },
  },
});
const SignupForm = ({ onSubmit }) => {
  const classes = useStyles();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, status, error } = userRegister;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const schema = yup.object().shape({
    email: yup.string().required("Enter valid email").email("Enter valid email"),
    pass: yup
      .string()
      .required("")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    pass2: yup
      .string()
      .required("")
      .oneOf([yup.ref("pass"), null], "Password mismatch"),
    // terms: yup.bool().required("Incomplete form"),
  });
  const formRef = useRef(null);
  //reset form with ref
  const handleReset = () => {
    formRef.current.reset();
    if (loading === false && error) formRef.current.reset(); //TODO
  };

  const submit = (a) => {
    // Do stuff here
    // On success or error:
   
    // handleReset();
    onSubmit(a);
  };

  const renderAlert =(errors,touched) => {
    if(!!errors.email&&(!touched.email))
    return(   <Alert className={`${styles.custom_alert} mx-auto`} variant="danger" >{errors.email}</Alert>);
    if(!!errors.pass&&(!touched.pass))
    return(   <Alert className={`${styles.custom_alert} mx-auto`} variant="danger" >{errors.pass}</Alert>);
    if(!!errors.pass2&&(!touched.pass2))
    return(   <Alert className={`${styles.custom_alert} mx-auto`} variant="danger" >{errors.email}</Alert>);
  }
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        if (true){
          resetForm({
            values: {
              email: "",
              pass: "",
              pass2: "",
              terms: true,
            },
          });
          handleReset()
          }
        submit(values, resetForm);
      }}
      initialValues={{
        email: "",
        pass: "",
        pass2: "",
        terms: true,
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
           {!(errors.pass)&&( <Form.Text className={styles.text_muted}>
              Password must contain at least 8 characters, one uppercase, one
              number and one special case character
            </Form.Text>)}
          </Form.Group>
          <Form.Group controlId="formPasswordConf">
          <Form.Label className={styles.label222}>Confirm password</Form.Label>
          <Form.Control
              className={`${styles.form_input} mx-auto w-100`}
              name="pass2"
              type={passwordShown ? "text" : "password"}
              disabled={loading}
              isInvalid={!!errors.pass2}
              onChange={handleChange}
            />
            <Form.Control.Feedback className={styles.invalid} type="invalid">
              {errors.pass2}
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group>
           <FormControlLabel className={styles.custom_control_label}
        control={
          <Checkbox 
            checked={values.terms}
            onChange={handleChange}
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            inputProps={{ 'aria-label': 'decorative checkbox' }}
            name="terms"
            color="default"
          />
        }
        label="Accept terms and conditions"
      />
          </Form.Group> */}
          <Button
            className={styles.signupform_comp_register_button}
            color="secondary"
            variant="contained"
            disabled={loading}
            disableElevation={true}
            type="submit"
          >
            <Spinner
                className={loading? "my-auto":"d-none"}
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {loading? "":"Register"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
