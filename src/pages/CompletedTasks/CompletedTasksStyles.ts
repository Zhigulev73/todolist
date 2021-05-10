import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  AppContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  AppList: {
    marginTop: "20px",
    marginBottom: "50px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: "514px",
    padding: "10px",
    boxSizing: "border-box",
    [theme.breakpoints.down('sm')]: {
      minWidth: "0",
    },
  },
  AppTaskCreator: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    alignItems: "flex-end",
  },
  AppButton: {
    width: "150px",
    height: "40px",
  },
}));

export default useStyles;
