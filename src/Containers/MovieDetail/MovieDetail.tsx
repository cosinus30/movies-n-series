import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    ListItemText,
    ListItemIcon,
    Typography,
    makeStyles,
    createStyles,
    Theme,
    Tabs,
    Tab,
} from "@material-ui/core";
import MDListItem from "@material-ui/core/ListItem";
import MDListItemIcon from "@material-ui/core/ListItemIcon";
import EventIcon from "@material-ui/icons/Event";
import GradeIcon from "@material-ui/icons/Grade";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Avatar } from "../../Components/atoms/Avatar";
import { Chips, ChipsProps } from "../../Components/molecules/Chips";
import { api } from "../../shared/api/api";
import { Credits, MovieDetail as MovieDetailTypes } from "../../shared/types/Movie";

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
    const [genres, setGenres] = useState<any>(null);
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
                const helelo = response?.genres?.reduce(
                    (accumulator, currentValue, currentIndex, array) => {
                        return accumulator.concat({ label: currentValue.name, id: currentValue.id });
                    },
                    [{}]
                );
                setGenres(helelo);
                console.log(helelo);
            })
            .catch((error) => {
                console.error(error);
            });
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
                        <Chips chips={genres?.chips} />
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
                <DialogContentText>{movieDetails?.overview}</DialogContentText>
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
                <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
                    <Tab label="Comments" />
                    <Tab label="Similar" />
                    <Tab label="Recommended" />
                </Tabs>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
});
