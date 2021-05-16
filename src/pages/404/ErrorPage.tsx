import React from "react";
import classes from "./error.module.scss";

const ErrorPage: React.FC = () => {

  return (
    <p className={classes.errorPage}>Error 404</p>
  );
};

export default ErrorPage;
