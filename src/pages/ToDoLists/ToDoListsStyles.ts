import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  AppPageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  AppPageMainTitle: {
    display: "flex",
    justifyContent: "center",
  },
  AppList: {
    marginTop: "20px",
    padding: "30px",
    [theme.breakpoints.down('sm')]: {
      padding: "0px",
    },
  },
  AppTaskCreator: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  AppButton: {
    width: "15%",
    height: "40px",
  },
  AppListDateFilter: {
    width: '350px',
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  AppText: {
    marginRight: '10px'
  },
}));
