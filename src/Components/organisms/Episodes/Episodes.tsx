import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { SeasonDetail, TVDetail } from "../../../shared/types/Tv";
import { ArrowDropDownSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
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
            minHeight: 128
        },
    });
});

interface EpisodesProps {
    tvDetails: TVDetail | undefined;
    seasonDetails: SeasonDetail | undefined;
    seasonNumber: number;
    setSeasonNumber: (seasonNumber: number) => void;
}

export const Episodes: React.FC<EpisodesProps> = ({ tvDetails, seasonDetails, setSeasonNumber, seasonNumber }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const classes = useStyles();

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

    return (
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
                        {tvDetails?.seasons.map((option, index) => (
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
                {seasonDetails?.episodes.map((episode) => {
                    return (
                        <Box key={episode.id} marginY={5}>
                            <Paper  elevation={5} className={classes.episodePaper}>
                                <Grid container alignContent="center" direction="row" wrap="nowrap" spacing={2}>
                                    {episode.still_path && (
                                        <Grid item>
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
                                        <Typography variant="body2">
                                            {episode.overview
                                                ? episode.overview
                                                : `Will be aired on ${episode.air_date}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    );
                })}
            </div>
        </Box>
    );
};
