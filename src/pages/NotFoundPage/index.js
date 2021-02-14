import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import notimage from 'assets/images/notfound.png'

export default function NotFoundPage() {
  const classes = useStyles();
  return (
    <div className={classes.imageContainer}>


      <img src={notimage} className={classes.image} />
      <h1>Page not found</h1>
      <p>Look for something else</p>

    </div>

  );
}


const useStyles = makeStyles(() => ({

  image: {

    maxWidth: 'auto',
    maxHeight: 300

  },
  imageContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }

}));
