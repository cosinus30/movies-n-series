import { makeStyles, createStyles, Theme, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Avatar } from "../../Components/atoms/Avatar";
import { Chip } from "../../Components/atoms/Chip";
import { api } from "../../shared/api/api";
import { Credits, MovieDetail as MovieDetailTypes } from "../../shared/types/Movie";
import CloseIcon from "@material-ui/icons/Close";

interface ParamTypes {
    id: string;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
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
        icon: {
            minWidth: "32px",
        },
        image: {
            objectFit: "cover",
            maxHeight: 360,
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
    const [movieDetails, setMovieDetails] = useState<MovieDetailTypes | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
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

    useEffect(() => {
        api.movie
            .getMovie(id)
            .then((response) => {
                setMovieDetails(response);
            })
            .catch((error) => {
                console.error(error);
            });
        return () => {
            setMovieDetails(null);
        };
    }, [id]);

    useEffect(() => {
        api.movie
            .getCast(id)
            .then((response) => {
                setCredits(response);
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        return () => {
            setCredits(null);
        };
    }, [id]);

    return (
        <Dialog
            open={open}
            maxWidth={"md"}
            fullWidth
            onClose={handleClose}
            scroll="paper"
            PaperProps={{ className: classes.root }}
        >
            <img src={"https://image.tmdb.org/t/p/original/" + movieDetails?.backdrop_path} className={classes.image} />
            <DialogTitle id="max-width-dialog-title">
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
            </DialogTitle>
            <DialogContent>
                <DialogContentText color="textPrimary">{movieDetails?.overview}</DialogContentText>
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
            </DialogContent>
        </Dialog>
    );
});
