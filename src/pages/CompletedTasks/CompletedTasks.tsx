import React from "react";
import ListWrapper from "../../components/ListWrapper/ListWrapper";
import useStyles from "./CompletedTasksStyles";

const CompletedTasks: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.AppContainer}>
      <h1>Completed Tasks</h1>
      <div className={classes.AppList}>
        <div className={classes.AppTaskCreator} />
        <ListWrapper isListDone/>
      </div>
    </div>
  );
};

export default CompletedTasks;
