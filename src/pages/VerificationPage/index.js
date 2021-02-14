import React,{useEffect} from "react";
import styles from './VerificationPage.module.css';
import Cookie from 'js-cookie';

import Image from "react-bootstrap/Image";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { resendEmail } from "../../actions/userActions";

export default function VerificationPage(props) {
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  const dispatch = useDispatch();

    const resendClicked = ( )=>{
        console.log("veripag",userInfo);
        try{
          if(userInfo)
          dispatch(resendEmail(userInfo.email));
          else
          props.history.push('/signup')
        }
        catch(err){
          console.log("errr",err);
        props.history.push('/signup');}
    }

    useEffect(() => {
      Cookie.set("regRE",false);
    } )

  return (
    <div className="container-fluid" style={{paddingTop:"50px"}} >
      <div className="row">
      <div className="card border-0 shadow-sm mb-5 bg-white rounded mx-auto  col-md-5 col-lg-4" style={{ width: "30rem", padding: "32px" }}>
        <Image className="card-img-top" src="/images/message_send.png" />
        <div className="card-body">
          <h5 className="card-title text-center">Verify Email</h5>
        </div>
        <p className="card-text">
          A veification link has been sent to your email address. Please verify to continue
        </p>
        <Button 
            className={styles.resend_button} 
            variant="contained" 
            color="primary" 
            onClick={resendClicked}
            disableElevation >
          Resend
        </Button>
      </div>
    </div>
    </div>
  );
}
