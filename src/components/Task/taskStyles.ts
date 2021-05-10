import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";

export const StyledButton = withStyles({
  root: {
    padding: '0',
    minWidth: '5px',
    marginLeft: '10px'
    },
  },
)(Button);
export const StyledIconButton = withStyles({
  root: {
    padding: '0',
    minWidth: '5px',
    marginLeft: '10px'
    },
  },
)(IconButton);

