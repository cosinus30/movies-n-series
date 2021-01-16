import React, { useState } from "react";
import Appbar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { Box, createStyles, Link, makeStyles, Theme, Toolbar } from "@material-ui/core";
import { NavLink as RouterLink } from "react-router-dom";
import "./Navbar.css";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        navLink: {
            fontSize: '18px',
            "&:hover": {
                textDecoration: "none",
            },
        }
    });
});

export const Navbar: React.FC = () => {
    const classes = useStyles();
    return (
        <Appbar position="static">
            <Toolbar className="toolbar">
                <Box marginX={2}>
                    <Link className={classes.navLink} activeClassName={"Mui-selected"} color="inherit" component={RouterLink} to="/movies">
                        Movies
                    </Link>
                </Box>
                <Box marginX={2}>
                    <Link className={classes.navLink} color="inherit" component={RouterLink} to="/series">
                        Series
                    </Link>
                </Box>
                <Box marginX={2}>
                    <Link className={classes.navLink} color="inherit" component={RouterLink} to="/about">
                        About
                    </Link>
                </Box>
            </Toolbar>
        </Appbar>
    );
};
