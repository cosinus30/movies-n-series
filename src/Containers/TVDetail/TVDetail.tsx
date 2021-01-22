import React, { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { api } from "../../shared/api/api";
import { ParamTypesId } from "../../shared/types/Params";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ImageWithButton } from "../../Components/atoms/ImageWithButton";
import CloseIcon from "@material-ui/icons/CloseSharp";
import GradeIcon from "@material-ui/icons/GradeSharp";
import EventIcon from "@material-ui/icons/EventAvailableSharp";
import TheaterIcon from "@material-ui/icons/TheatersSharp";
import { Chip } from "../../Components/atoms/Chip";
import { ListItem } from "../../Components/atoms/ListItem";
import { ArrowDropDownSharp } from "@material-ui/icons";

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
        menu: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
        },
        menuButton: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.secondary.main,
            },
        },
        menuItem: {
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
            },
        },
        episodePaper: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            minHeight: 128,
        },
    });
});

export const TVDetail: React.FC = () => {
    const [open, setOpen] = useState(true);
    let history = useHistory();
    const classes = useStyles();
    const [seasonNumber, setSeasonNumber] = useState<number>(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClose = () => {
        setOpen(false);
        history.push("/series");
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setSeasonNumber(index);
        setAnchorEl(null);
    };

    let { id } = useParams<ParamTypesId>();

    const { data: tvShowDetails, isFetching: isTVShowDetailFetching } = useQuery(["getTVShowDetails", id], () =>
        api.tv.getTvShow(id)
    );

    const { data: tvShowSeasonDetails, isFetching: istvShowSeasonDetailsFetching } = useQuery(
        ["getTvShowSeason", id, seasonNumber],
        () => api.tv.getTvShowSeason(id, seasonNumber)
    );

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
                {isTVShowDetailFetching ? (
                    <Skeleton variant="rect" animation="pulse" width="100%" height="480px" />
                ) : (
                    <>
                        <ImageWithButton
                            backdrop_path={tvShowDetails?.backdrop_path}
                            onClose={handleClose}
                            original_title={tvShowDetails?.name}
                        >
                            <CloseIcon />
                        </ImageWithButton>
                        <Grid container direction="row" justify="space-between">
                            <Grid item>
                                <Typography variant="h5">{tvShowDetails?.name}</Typography>
                                <Typography variant="subtitle1">{tvShowDetails?.tagline}</Typography>
                                <div>
                                    {tvShowDetails?.genres.map((genre) => {
                                        return <Chip key={genre.id} id={genre.id} label={genre.name} />;
                                    })}
                                </div>
                            </Grid>
                            <Grid item>
                                <List>
                                    <ListItem key={1} text={tvShowDetails?.first_air_date}>
                                        <EventIcon color="secondary" />
                                    </ListItem>
                                    <ListItem key={2} text={tvShowDetails?.vote_average}>
                                        <GradeIcon color="secondary" />
                                    </ListItem>
                                    <ListItem key={3} text={tvShowDetails?.type}>
                                        <TheaterIcon color="secondary" />
                                    </ListItem>
                                    <ListItem key={4} text={tvShowDetails?.status}>
                                        <GradeIcon color="secondary" />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                        <DialogContentText color="textPrimary">
                            <Box marginY={1} paddingY={2}>
                                <Typography variant="body1">{tvShowDetails?.overview}</Typography>
                                {/* <Tabs /> */}
                            </Box>
                            <Box paddingY={2}>
                                <Grid container justify="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle1">EPISODES</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            aria-controls="simple-menu"
                                            variant="contained"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                            className={classes.menuButton}
                                            endIcon={<ArrowDropDownSharp />}
                                        >
                                            Season {" " + (seasonNumber + 1)}
                                        </Button>
                                        <Menu
                                            id="lock-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleCloseMenu}
                                            PaperProps={{ className: classes.menu }}
                                        >
                                            {tvShowDetails?.seasons.map((option, index) => (
                                                <MenuItem
                                                    key={option.id}
                                                    selected={index === seasonNumber}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                    className={classes.menuItem}
                                                >
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Grid>
                                </Grid>
                                <div>
                                    {tvShowSeasonDetails?.episodes.map((episode, index) => {
                                        return (
                                            <Paper elevation={2} className={classes.episodePaper}>
                                                <Grid
                                                    container
                                                    alignContent="center"
                                                    direction="row"
                                                    wrap="nowrap"
                                                    spacing={2}
                                                >
                                                    {episode.still_path && (
                                                        <Grid item spacing={0}>
                                                            <img
                                                                src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
                                                                height="100%"
                                                                width="192px"
                                                            />
                                                        </Grid>
                                                    )}
                                                    <Grid item>
                                                        <Typography variant="h2">{episode.episode_number}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1">{episode.name}</Typography>
                                                        <Typography variant="body2">{episode.overview ? episode.overview : `Will be aired on ${episode.air_date}` }</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        );
                                    })}
                                </div>
                            </Box>
                        </DialogContentText>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
