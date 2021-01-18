import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import ChevronRightSharp from "@material-ui/icons/ChevronRightSharp";

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
            transition: "all 465ms",
            marginBottom: theme.spacing(2),
            "&:hover": {
                transform: "scale(1.03)",
            },
        },
        content: {
            height: 180,
            lineHeight: "1.2",
            textDecoration: "none",
            overflow: "hidden",
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
                <Card className={classes.card}>
                    <Link to={`/movies/${id}`}>
                        <CardMedia
                            component="img"
                            alt={originalTitle}
                            image={`https://image.tmdb.org/t/p/original/${posterPath}`}
                            className={classes.media}
                        />
                    </Link>
                    <CardContent className={classes.content}>
                        <Typography variant={"subtitle1"}>{title}</Typography>
                        <Typography variant={"caption"}>{overview}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="text" size="small" endIcon={<ChevronRightSharp />}>
                            <Link to={`/movies/${id}`}>See More</Link>
                        </Button>
                    </CardActions>
                </Card>
            )}
        </Grid>
    );
};
