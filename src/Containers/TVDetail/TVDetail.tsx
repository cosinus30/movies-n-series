import React, { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { api } from "../../shared/api/api";
import { ParamTypesId } from "../../shared/types/Params";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from '@material-ui/core/DialogContent'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import { Tabs } from "../../Components/organisms/Tab/Tabs";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Avatar } from "../../Components/atoms/Avatar";
import { ImageWithButton } from "../../Components/atoms/ImageWithButton";
import CloseIcon from '@material-ui/icons/CloseSharp'
import { Chip } from "../../Components/atoms/Chip";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        
    })
})

export const TVDetail: React.FC = () => {
    const [open, setOpen] = useState(true);
    let history = useHistory();
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        history.push("/series");
    };

    let { id } = useParams<ParamTypesId>();

    const { data: tvShowDetails, isFetching: movieDetailsFetching } = useQuery(["getTVShowDetails", id], () =>
        api.tv.getTvShow(id)
    );

    return (
        <Dialog
            open={open}
            maxWidth={"md"}
            fullWidth
            onClose={handleClose}
            scroll="paper"
        >
            <DialogContent>
                {movieDetailsFetching ? (
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
                                {/* <List>
                                    <ListItem text={movieDetails?.release_date}>
                                        <EventIcon color="secondary" />
                                    </ListItem>
                                    <ListItem text={movieDetails?.vote_average}>
                                        <GradeIcon color="secondary" />
                                    </ListItem>
                                </List> */}
                            </Grid>
                        </Grid>
                        <DialogContentText color="textPrimary">
                            <Box marginY={1} paddingY={2}>
                                <Typography variant="body1">{tvShowDetails?.overview}</Typography>
                                {/* <div className={classes.cast}>
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
                                </div> */}
                                <Tabs />
                            </Box>
                        </DialogContentText>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
