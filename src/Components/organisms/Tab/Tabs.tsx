import React, { useEffect, useState } from "react";
import MDTabs from "@material-ui/core/Tabs";
import MDTab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { RecommendationCard } from "../../molecules/Card/RecommendationCard";
import { TabPanel } from "../../molecules/TabPanel/TabPanel";
import { Movies } from "../../../shared/types/Movie";
import { TVListResult } from "../../../shared/types/Tv";

interface TabsProps {
    similarItems: Movies | TVListResult | undefined;
    recommendedItems: Movies | TVListResult | undefined;
    page: "movies" | "series";
}

export const Tabs: React.FC<TabsProps> = ({ similarItems, recommendedItems, page }) => {
    const [value, setValue] = useState(1);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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
                    {similarItems?.results.map((el) => {
                        return (
                            <RecommendationCard
                                key={el.id}
                                id={el.id}
                                title={el.name ? el.name : el.title}
                                originalTitle={el.original_title}
                                overview={el.overview}
                                posterPath={el.poster_path}
                                type={page}
                            />
                        );
                    })}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={1}>
                    {recommendedItems?.results.map((el) => {
                        return (
                            <RecommendationCard
                                key={el.id}
                                id={el.id}
                                title={el.name ? el.name : el.title}
                                originalTitle={el.title}
                                overview={el.overview}
                                posterPath={el.poster_path}
                                type={page}
                            />
                        );
                    })}
                </Grid>
            </TabPanel>
        </div>
    );
};
