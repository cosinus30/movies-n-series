import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CardActionArea from "@material-ui/core/CardActionArea";
import React from "react";
import MUCard from "@material-ui/core/Card";
import { Link, useRouteMatch } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

export type CardProps = {
    title: string;
    posterPath: string;
    id: number;
    isLoading: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            borderRadius: 0,
            boxShadow: "none",
            height: 320,
            transition: "all 465ms",
            "&:hover": {
                transform: "scale(1.09)",
            },
        },
        image: {
            objectFit: "cover",
            maxHeight: "100%",
        },
    })
);

export const Card: React.FC<CardProps> = (props) => {
    const materialClasses = useStyles();
    let { path } = useRouteMatch();

    return (
        <Link to={`${path}/${props.id}`}>
            {props.isLoading ? (
                <Skeleton animation="pulse" variant="rect" height={320} />
            ) : (
                <Box m={1}>
                    <MUCard>
                        <CardActionArea className={materialClasses.card}>
                            <img
                                src={"https://image.tmdb.org/t/p/original/" + props.posterPath}
                                className={materialClasses.image}
                            />
                        </CardActionArea>
                    </MUCard>
                </Box>
            )}
        </Link>
    );
};
