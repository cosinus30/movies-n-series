import { makeStyles, createStyles, Theme } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MDListItem from "@material-ui/core/ListItem";
import EventIcon from "@material-ui/icons/Event";
import GradeIcon from "@material-ui/icons/Grade";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Avatar } from "../../Components/atoms/Avatar";
import { Chip } from "../../Components/atoms/Chip";
import { api } from "../../shared/api/api";
import CloseIcon from "@material-ui/icons/Close";
import { useQuery } from "react-query";
import Skeleton from "@material-ui/lab/Skeleton";

interface ParamTypes {
    id: string;
}

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
        paddingZero: {
            paddingTop: 0,
            paddingBottom: 0,
        },
        marginZero: {
            marginTop: 0,
            marginBottom: 0,
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
        imageButton: {
            position: "absolute",
            right: "-2%",
            top: "-2%",
            color: theme.palette.common.white,
            background: theme.palette.primary.main,
            opacity: 0.3,
            "&:hover": {
                background: theme.palette.primary.main,
                opacity: 1,
            },
        },
        icon: {
            minWidth: "32px",
        },
        image: {
            objectFit: "cover",
            maxHeight: 360,
            width: "calc(100% + 48px)",
            marginTop: -28,
            marginLeft: -24,
            marginRight: -24,
        },
        imageContainer: {
            position: "relative",
            width: "100%",
            height: "360px",
        },
        chipArr: {
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            margin: 0,
        },
    });
});

export const ListItem: React.FC<{ text: string | undefined | number }> = (props) => {
    const classes = useStyles();
    return (
        <MDListItem className={classes.paddingZero}>
            <ListItemIcon className={classes.icon}>{props.children}</ListItemIcon>
            <ListItemText className={classes.marginZero}>
                <Typography variant="caption">{props.text}</Typography>
            </ListItemText>
        </MDListItem>
    );
};

export const MovieDetail: React.FC = React.memo(() => {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(1);
    let history = useHistory();
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
        history.push("/movies");
    };

    let { id } = useParams<ParamTypes>();

    const movieDetailQuery = useQuery("getMovieDetails", () => api.movie.getMovie(id));
    const castQuery = useQuery("getCast", () => api.movie.getCast(id));

    const movieDetails = movieDetailQuery.data;
    const movieDetailsFetching = movieDetailQuery.isFetching;
    const credits = castQuery.data;

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
                        <div className={classes.imageContainer}>
                            <img
                                src={"https://image.tmdb.org/t/p/original/" + movieDetails?.backdrop_path}
                                alt={movieDetails?.original_title}
                                className={classes.image}
                            />
                            <IconButton className={classes.imageButton} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <Grid container direction="row" justify="space-between">
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
                            <Tabs value={value} onChange={handleChange} indicatorColor="secondary" centered>
                                <Tab label="Comments" />
                                <Tab label="Similar" />
                                <Tab label="Recommended" />
                            </Tabs>
                        </DialogContentText>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
});
