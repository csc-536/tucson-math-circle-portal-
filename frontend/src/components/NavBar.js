import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
    Avatar,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
} from "@material-ui/core";
import { AccountCircle, Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

const navLinks = [{ name: "Meetings", path: "/meetings" }];

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`,
    },
});

const NavBar = ({ role }) => {
    const classes = useStyles();

    switch (role) {
        case "student":
            navLinks.push({ name: "Profile", path: "/profile" });
            break;
        case "coordinator":
            navLinks.push({ name: "students", path: "#" });
            break;
        default:
            break;
    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container className={classes.navbarDisplayFlex}>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        <Home fontSize="large" />
                    </IconButton>
                    <List
                        component="nav"
                        aria-labelledby="main navigation"
                        className={classes.navDisplayFlex}
                    >
                        {navLinks.map(({ name, path }) => {
                            return (
                                <Link
                                    to={path}
                                    key={name}
                                    className={classes.linkText}
                                >
                                    <ListItem button>
                                        <ListItemText primary={name} />
                                    </ListItem>
                                </Link>
                            );
                        })}
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </List>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
