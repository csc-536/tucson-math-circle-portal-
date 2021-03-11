import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Toolbar } from "@material-ui/core";
import { AccountCircle, AddBox, Home, People } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { isLoggedIn, loggedInRole } from "../utils";
import TooltipItem from "./TooltipItem";
import SectionMenu from "./SectionMenu";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const {
    auth: { userLoggedIn, role },
    setAuth,
  } = useContext(AuthContext);

  const links = [];

  if (userLoggedIn) {
    switch (role) {
      case "student":
        break;
      case "coordinator":
        links.push({
          title: "Create A New Meeting",
          item: <AddBox />,
          path: "/new-meeting",
        });
        links.push({
          title: "All Students",
          item: <People />,
          path: "#",
        });
        links.push({
          title: "Account",
          item: <AccountCircle />,
          path: "/profile",
        });
        break;
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/meetings">
            <TooltipItem
              edge="end"
              label="home"
              title="All Meetings"
              item={<Home />}
            />
          </Link>
          <Typography variant="h5" className={classes.title}>
            Tucson Math Circle
          </Typography>
          {userLoggedIn ? <SectionMenu /> : ""}
          {links.map(({ title, item, path }, i) => (
            <Link to={path} key={`${title}-${i}`}>
              <TooltipItem
                edge="end"
                label={title.replace(" ", "-").toLowerCase()}
                title={title}
                item={item}
              />
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
