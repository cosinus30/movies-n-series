import Container from "@material-ui/core/Container";
import React from "react";
import { CardRow } from "../Containers/CardRow/CardRow";

export const Movies: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <CardRow title="Popular Movies" url="popular" />
            <CardRow title="Trending Movies" />
            <CardRow title="Top-rated Movies" url="top_rated" />
            <CardRow title="Now Playing" url="now_playing" />
            <CardRow title="Upcoming Movies" url="upcoming" />
        </Container>
    );
};
