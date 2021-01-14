import { Box, CardActionArea, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import MUCard from "@material-ui/core/Card";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";

export type CardProps = {
    title: string;
    posterPath: string;
    id: number;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        Card: {
            borderRadius: 0,
            boxShadow: "none",
            transition: "all 465ms",
            "&:hover": {
                transform: "scale(1.09)",
            },
        },
    })
);

export const Card: React.FC<CardProps> = (props) => {
    const materialClasses = useStyles();

    return (
        <Box m={1}>
            <MUCard className={materialClasses.Card}>
                <CardActionArea>
                    <img src={"https://image.tmdb.org/t/p/original/" + props.posterPath} className={classes.Image} />
                </CardActionArea>
            </MUCard>
        </Box>
    );
};
