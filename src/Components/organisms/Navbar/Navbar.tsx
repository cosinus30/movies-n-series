import React from "react";
import Appbar from "@material-ui/core/AppBar";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        navLink: {
            fontSize: "18px",
            "&:hover": {
                textDecoration: "none",
            },
        },
        toolbar: {
            justifyContent: "center",
        },
    });
});

export const Navbar: React.FC = () => {
    const classes = useStyles();
    return (
        <Appbar position="static">
            <Toolbar className={classes.toolbar}>
                <Box marginX={2}>
                    <Link
                        className={classes.navLink}
                        activeClassName={"Mui-selected"}
                        color="inherit"
                        component={RouterLink}
                        to="/movies"
                    >
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
