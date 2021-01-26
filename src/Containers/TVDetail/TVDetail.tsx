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
import { ImageWithButton } from "../../Components/atoms/ImageWithButton";
import CloseIcon from "@material-ui/icons/CloseSharp";
import GradeIcon from "@material-ui/icons/GradeSharp";
import EventIcon from "@material-ui/icons/EventAvailableSharp";
import TheaterIcon from "@material-ui/icons/TheatersSharp";
import { Chip } from "../../Components/atoms/Chip";
import { ListItem } from "../../Components/atoms/ListItem";
import { Episodes } from "../../Components/organisms/Episodes/Episodes";
import { Tabs } from "../../Components/organisms/Tab/Tabs";

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

    let { id } = useParams<ParamTypesId>();

    const { data: tvShowDetails, isFetching: isTVShowDetailFetching } = useQuery(["getTVShowDetails", id], () =>
        api.tv.getTvShow(id)
    );

    const { data: tvShowSeasonDetails, isFetching: istvShowSeasonDetailsFetching } = useQuery(
        ["getTvShowSeason", id, seasonNumber],
        () => api.tv.getTvShowSeason(id, seasonNumber)
    );

    const { data: similarTvShows, isFetching: isSimilarTvShowsFetching } = useQuery(["getSimilar", id], () =>
        api.tv.getTvSimilar(id)
    );
    const { data: recommendedTvShows, isFetching: isRecommendedTvShowsFetching } = useQuery(["getRecommended", id], () =>
        api.tv.getTvRecommendations(id)
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
                        <div color="textPrimary">
                            <Box marginY={1} paddingY={2}>
                                <Typography variant="body1">{tvShowDetails?.overview}</Typography>
                                {/* <Tabs /> */}
                            </Box>
                            <Episodes
                                seasonDetails={tvShowSeasonDetails}
                                tvDetails={tvShowDetails}
                                seasonNumber={seasonNumber}
                                setSeasonNumber={setSeasonNumber}
                            />
                        </div>
                        <Tabs page="series" recommendedItems={recommendedTvShows} similarItems={similarTvShows}/>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
