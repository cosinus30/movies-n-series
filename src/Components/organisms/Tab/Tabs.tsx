import React, { useState } from "react";
import MDTabs from "@material-ui/core/Tabs";
import MDTab from "@material-ui/core/Tab";
import { useParams } from "react-router-dom";
import { ParamTypesId } from "../../../shared/types/Params";
import { api } from "../../../shared/api/api";
import { useQuery } from "react-query";
import Grid from "@material-ui/core/Grid";
import { RecommendationCard } from "../../molecules/Card/RecommendationCard";
import { TabPanel } from "../../molecules/TabPanel/TabPanel";

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
                <MDTab label="Similar" />
                <MDTab label="Recommended" />
            </MDTabs>
            <TabPanel value={value} index={0}>
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
            <TabPanel value={value} index={1}>
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
