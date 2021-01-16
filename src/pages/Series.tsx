import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { ReactComponent as UnderConstruction } from "../assets/plug.svg";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        container: {
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        },

        icon: {
            width: 200,
            height: 200,
        },
    });
});

export const Series: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <UnderConstruction className={classes.icon} />
            <br/>
            <Typography color={"secondary"} variant={'h2'}>This page is under construction!</Typography>
        </div>
    );
};
