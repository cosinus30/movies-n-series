import React, { useState } from "react";
import MDTabs from "@material-ui/core/Tabs";
import MDTab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Movies } from "../../../shared/types/Movie";
import { useParams } from "react-router-dom";
import { ParamTypesId } from "../../../shared/types/Params";
import { api } from "../../../shared/api/api";
import { useQuery } from "react-query";
import { Card, CardContent, CardMedia, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        media: {
            width: "100%",
            height: 180,
            objectFit: "cover",
            objectPosition: "0 0"
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
            },
        }
    });
});

export const Tabs: React.FC = (props) => {
    const [value, setValue] = useState(1);

    let { id } = useParams<ParamTypesId>();
    const classes = useStyles();
    const { data: similarMovies, isFetching: isSimilarMoviesFetching } = useQuery(["getSimilar", id], () =>
        api.movie.getSimilar(id)
    );
    const { data: recommendedMovies, isFetching: isRecommendedMoviesFetching } = useQuery(["getRecommended", id], () =>
        api.movie.getRecommendations(id)
    );

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        if (newValue === 1) {
        }
        setValue(newValue);
    };

    return (
        <div>
            <MDTabs value={value} onChange={handleChange} indicatorColor="secondary" centered>
                <MDTab label="Comments" />
                <MDTab label="Similar" />
                <MDTab label="Recommended" />
            </MDTabs>
            <TabPanel value={value} index={0}>
                Comments
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={1}>
                    {similarMovies?.results.map((el) => {
                        return (
                            <Grid item xs={6} md={4} key={el.id}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        component="img"
                                        alt={el.original_title}
                                        image={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
                                        className={classes.media}
                                    />
                                    <CardContent>
                                        <Typography variant={"subtitle1"}>{el.title}</Typography>
                                        <Typography variant={"caption"}>{el.overview}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ul>
                    {recommendedMovies?.results.map((el) => {
                        return <li>{el.title}</li>;
                    })}
                </ul>
            </TabPanel>
        </div>
    );
};
