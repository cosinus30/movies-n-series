import Container from "@material-ui/core/Container";
import React from "react";
import { CardRow } from "../Containers/CardRow/CardRow";
import { api } from "../shared/api/api";

export const Movies: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <CardRow title="Popular Movies" url="popular" api={() => api.movie.getMovies("popular")}/>
            <CardRow title="Trending Movies" url="trending" api={() => api.movie.getTrending()}/>
            <CardRow title="Top-rated Movies" url="top_rated" api={() => api.movie.getMovies("top_rated")}/>
            <CardRow title="Now Playing" url="now_playing" api={() => api.movie.getMovies("now_playing")}/>
            <CardRow title="Upcoming Movies" url="upcoming" api={() => api.movie.getMovies("upcoming")}/>
        </Container>
    );
};
