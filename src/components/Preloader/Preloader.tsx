import React from "react";
import preloader from "../../assets/images/preloader.svg";
import classes from "./preloader.module.scss";

const Preloader: React.FC = () => (
  <div className={classes.preloader}>
    <img src={preloader} alt="preloader" />
  </div>
);

export default Preloader;
