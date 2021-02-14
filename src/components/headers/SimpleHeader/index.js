import React from "react";
import styles from "./SimpleHeader.module.css";

import { Navbar, Nav } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

export default function SimpleHeader({goToLogin,goToSignup,loc}) {

  return (
    <div className={styles.header}>
      <Navbar style={{backgroundColor:"white"}} expand="lg">
        <Navbar.Brand style={{color:"#1976d2"}}>BestEnlist Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
              <Button className={styles.header_button} onClick={loc==="signin"?goToLogin:goToSignup}>Signin</Button>
              <Divider orientation="vertical" flexItem />
              <Button className={styles.header_button} onClick={loc==="login"?goToLogin:goToSignup}>Signup</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
