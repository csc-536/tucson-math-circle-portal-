import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { Toolbar } from "@material-ui/core";
import { AccountCircle, AddBox, Home, People } from "@material-ui/icons";
import { Link } from "react-router-dom";
import TooltipItem from "./TooltipItem";
import SectionMenu from "./SectionMenu";
import { AuthContext } from "../contexts/AuthContext";
import LogoutButton from "./LogoutButton";
import { uniqueId } from "lodash";

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
  } = useContext(AuthContext);

  const links = [];

  if (userLoggedIn) {
    switch (role) {
      case "student":
        links.push({
          title: "Account",
          item: <AccountCircle />,
          path: "/profile",
        });
        break;
      case "admin":
        links.push({
          title: "Create a New Meeting",
          item: <AddBox />,
          path: "/new-meeting",
        });
        links.push({
          title: "All Students",
          item: <People />,
          path: "#",
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
            <Link to={path} key={uniqueId()}>
              <TooltipItem
                edge="end"
                label={title.replace(" ", "-").toLowerCase()}
                title={title}
                item={item}
              />
            </Link>
          ))}
          {userLoggedIn ? <LogoutButton redirectPath="/logout" /> : ""}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
