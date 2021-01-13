import React from "react";
import Appbar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { Link, Toolbar } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar: React.FC = () => {
    return (
        <Appbar position="static">
            <Toolbar className="toolbar">
                <Button color="inherit" component={RouterLink} to="/movies">
                    Movies
                </Button>
                <Button color="inherit" component={RouterLink} to="/series">
                    Series
                </Button>
                <Button color="inherit" component={RouterLink} to="/about">
                    About
                </Button>
                {/* <div className="social-login">
                    <a
                        className="btn btn-block social-btn google"
                        href="http://localhost:8080/api/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect"
                    >
                        {" "}
                        Login with google{" "}
                    </a>
                </div> */}
            </Toolbar>
        </Appbar>
    );
};
