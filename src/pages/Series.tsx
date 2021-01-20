import React from "react";
import Typography from '@material-ui/core/Typography'
import Container from "@material-ui/core/Container"
import { CardRow } from "../Containers/CardRow/CardRow";
import { api } from "../shared/api/api";

export const Series: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <CardRow title="Popular Tv Shows" url="popular" api={() => api.tv.getSeries("popular")}/>
            <CardRow title="Trending Tv Shows" url="trending" api={() => api.tv.getTrending()}/>
            <CardRow title="Top-rated Tv Shows" url="top_rated" api={() => api.tv.getSeries("top_rated")}/>
            <CardRow title="On air" url="on_the_air" api={() => api.tv.getSeries("on_the_air")}/>
        </Container>
    );
};
