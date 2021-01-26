import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import GradeIcon from "@material-ui/icons/Grade";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Avatar } from "../../Components/atoms/Avatar";
import { Chip } from "../../Components/atoms/Chip";
import { api } from "../../shared/api/api";
import { useQuery } from "react-query";
import Skeleton from "@material-ui/lab/Skeleton";
import { ImageWithButton } from "../../Components/atoms/ImageWithButton";
import CloseIcon from "@material-ui/icons/Close";
import { Tabs } from "../../Components/organisms/Tab/Tabs";
import { ParamTypesId } from "../../shared/types/Params";
import { ListItem } from "../../Components/atoms/ListItem";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            width: "100%",
        },
        dialog: {
            height: "100%",
            overflow: "scroll",
        },
        cast: {
            display: "flex",
            flexWrap: "nowrap",
            listStyle: "none",
            overflow: "auto",
            whiteSpace: "nowrap",
            padding: theme.spacing(0.5),
            margin: 0,
        },
        icon: {
            minWidth: "32px",
        },
        chipArr: {
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            margin: 0,
        },
    });
});

export const MovieDetail: React.FC = React.memo(() => {
    const [open, setOpen] = useState(true);
    let history = useHistory();
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        history.push("/movies");
    };

    let { id } = useParams<ParamTypesId>();

    const { data: movieDetails, isFetching: movieDetailsFetching } = useQuery(["getMovieDetails", id], () =>
        api.movie.getMovie(id)
    );
    const { data: credits } = useQuery(["getCast", id], () => api.movie.getCast(id));

    const { data: similarMovies } = useQuery(["getSimilar", id], () => api.movie.getSimilar(id));
    const { data: recommendedMovies } = useQuery(["getRecommended", id], () => api.movie.getRecommendations(id));

    return (
        <Dialog
            open={open}
            maxWidth={"md"}
            fullWidth
            onClose={handleClose}
            scroll="paper"
            className={classes.dialog}
            PaperProps={{ className: classes.root }}
        >
            <DialogContent>
                {movieDetailsFetching ? (
                    <Skeleton variant="rect" animation="pulse" width="100%" height="480px" />
                ) : (
                    <>
                        <ImageWithButton
                            backdrop_path={movieDetails?.backdrop_path}
                            onClose={handleClose}
                            original_title={movieDetails?.original_title}
                        >
                            <CloseIcon />
                        </ImageWithButton>
                        <Grid container direction="row" wrap="nowrap" justify="space-between">
                            <Grid item>
                                <Typography variant="h5">{movieDetails?.title}</Typography>
                                <Typography variant="subtitle1">{movieDetails?.tagline}</Typography>
                                <div className={classes.chipArr}>
                                    {movieDetails?.genres.map((genre) => {
                                        return <Chip key={genre.id} id={genre.id} label={genre.name} />;
                                    })}
                                </div>
                            </Grid>
                            <Grid item>
                                <List>
                                    <ListItem text={movieDetails?.release_date}>
                                        <EventIcon color="secondary" />
                                    </ListItem>
                                    <ListItem text={movieDetails?.vote_average}>
                                        <GradeIcon color="secondary" />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                        <DialogContentText color="textPrimary">
                            <Box marginY={1} paddingY={2}>
                                <Typography variant="body1">{movieDetails?.overview}</Typography>
                                <div className={classes.cast}>
                                    {credits?.cast?.map((artist) => {
                                        return (
                                            <Avatar
                                                artistCharacterName={artist.character}
                                                artistId={artist.id}
                                                artistName={artist.name}
                                                artistProfilePath={artist.profile_path}
                                                key={artist.id}
                                            />
                                        );
                                    })}
                                </div>
                                <Tabs page="movies" recommendedItems={recommendedMovies} similarItems={similarMovies} />
                            </Box>
                        </DialogContentText>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
});
