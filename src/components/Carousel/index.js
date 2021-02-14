import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: 220,
    objectPosition: "center",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
        height:300
      },
  },
}));

export default function Carousel({ carousels }) {
  const classes = useStyles();

  return (
    <div>
      <AliceCarousel
        autoPlay
        autoPlayInterval="3000"
        mouseTracking
        disableButtonsControls
      >
        {carousels.map((item) => (
          <img src={item} className={classes.image} alt="" />
        ))}
      </AliceCarousel>
    </div>
  );
}
