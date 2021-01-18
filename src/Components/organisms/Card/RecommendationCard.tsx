import { CardMedia, createStyles, makeStyles, Theme, Typography, CardContent, Grid } from "@material-ui/core";
import React from "react";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            width: "100%",
            height: 180,
            objectFit: "cover",
            objectPosition: "0 0",
        },
        card: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
            height: 360,
            overflow: "hidden",
            transition: "all 465ms",
            marginBottom: theme.spacing(2),
            "&:hover": {
                transform: "scale(1.2)",
                overflow: "scroll",
            },
        },
        content: {
            lineHeight: "1.2",
            textDecoration: "none"
        },
    })
);

export interface CardProps {
    title: string;
    posterPath: string;
    id: number;
    overview: string;
    originalTitle: string;
    isLoading: boolean;
}

export const RecommendationCard: React.FC<CardProps> = (props) => {
    const { title, posterPath, id, overview, isLoading, originalTitle } = props;
    const classes = useStyles();

    return (
        <Grid item xs={6} md={4}>
            {props.isLoading ? (
                <Skeleton animation="pulse" variant="rect" height={320} />
            ) : (
                <Link to={`/movies/${id}`}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt={originalTitle}
                            image={`https://image.tmdb.org/t/p/original/${posterPath}`}
                            className={classes.media}
                        />
                        <CardContent className={classes.content}>
                            <Typography variant={"subtitle1"}>{title}</Typography>
                            <Typography variant={"caption"}>{overview}</Typography>
                        </CardContent>
                    </Card>
                </Link>
            )}
        </Grid>
    );
};
