import { Box, Button, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import { ChevronLeftSharp, ChevronRightSharp } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { Movies } from "../../shared/types/Movie";
import { Card } from "../../Components/Card/Card";
import { api } from "../../shared/api/api";

export type CardRowProps = {
    title: string;
    url?: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridRow: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        gridList: {
            overflow: "auto",
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: "translateZ(0)",
            display: "flex",
            whiteSpace: "nowrap",
            flexDirection: "row",
            flexWrap: "nowrap",
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        },
    })
);

export const CardRow: React.FC<CardRowProps> = (props) => {
    const classes = useStyles();
    const divRef = useRef<HTMLDivElement>(null);
    const [movies, setMovies] = useState<Movies | null>(null);

    const handleScroll = (direction: string) => {
        if (divRef && divRef.current) {
            if (direction === "left") {
                divRef.current.scrollTo({ behavior: "smooth", left: divRef.current.scrollLeft - 440 });
            } else {
                divRef.current.scrollTo({ behavior: "smooth", left: divRef.current.scrollLeft + 440 });
            }
        }
    };

    useEffect(() => {
        // if (props.url) {
        //     api.movie.getMovies(props.url)
        //     .then((response) => {
        //         setMovies(response)
        //     })
        // }
        // else {
        //     api.movie.getTrending()
        //     .then((response) => {
        //         setMovies(response)
        //     })
        // }
    }, [props.url]);

    return (
        <Box marginY={6}>
            <Typography variant="h4">{props.title}</Typography>
            <Box className={classes.gridRow} marginY={4}>
                <IconButton onClick={() => handleScroll("left")}>
                    <ChevronLeftSharp fontSize="large" />
                </IconButton>
                <Grid container className={classes.gridList} spacing={4} ref={divRef}>
                    {movies?.results.map((movie) => {
                        return <Card key={movie.id} title={movie.title} posterPath={movie.poster_path} id={movie.id} />;
                    })}
                </Grid>
                <IconButton onClick={() => handleScroll("right")}>
                    <ChevronRightSharp fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    );
};
