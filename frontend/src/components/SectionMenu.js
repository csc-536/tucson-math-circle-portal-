import { Button, makeStyles, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  white: {
    color: "white",
    fontWeight: 600,
    fontSize: "16px",
    padding: "10px",
  },
}));

const SectionMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const options = ["All", "Junior (A)", "Junior (B)", "Senior"];

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Select a Level" arrow>
        <Button
          edge="end"
          aria-controls="simple-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClickListItem}
          className={classes.white}
        >
          {options[selectedIndex]} Section
          {options[selectedIndex].toLowerCase() === "all" ? "s" : ""}{" "}
          <ExpandMore />
        </Button>
      </Tooltip>
      <Menu
        id="section-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SectionMenu;
