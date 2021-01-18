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
import { RecommendationCard } from "../Card/RecommendationCard";

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

export const Tabs: React.FC = (props) => {
    const [value, setValue] = useState(1);
    let { id } = useParams<ParamTypesId>();
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
                            <RecommendationCard
                                key={el.id}
                                id={el.id}
                                title={el.title}
                                originalTitle={el.original_title}
                                overview={el.overview}
                                posterPath={el.poster_path}
                                isLoading={isSimilarMoviesFetching}
                            />
                        );
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Grid container spacing={1}>
                    {recommendedMovies?.results.map((el) => {
                        return (
                            <RecommendationCard
                                key={el.id}
                                id={el.id}
                                title={el.title}
                                originalTitle={el.original_title}
                                overview={el.overview}
                                posterPath={el.poster_path}
                                isLoading={isRecommendedMoviesFetching}
                            />
                        );
                    })}
                </Grid>
            </TabPanel>
        </div>
    );
};
