import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
    color: `white`,
    fontWeight: 600,
    fontSize: "16px",
  },
}));

const TooltipItem = ({ item, onClick, title, label, edge }) => {
  const classes = useStyles();
  return (
    <Tooltip title={title} arrow>
      <IconButton
        edge={edge}
        aria-label={label}
        aria-haspopup="true"
        color="inherit"
        className={classes.menuButton}
        onClick={onClick}
      >
        {item}
      </IconButton>
    </Tooltip>
  );
};

export default TooltipItem;
