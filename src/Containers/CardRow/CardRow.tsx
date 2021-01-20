import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { ChevronLeftSharp, ChevronRightSharp } from "@material-ui/icons";
import React, { useRef } from "react";
import { Card } from "../../Components/molecules/Card/Card";
import { api } from "../../shared/api/api";
import { movieListingTypes } from "../../shared/api/movie-resource";
import { useQuery } from "react-query";
import { tvListingTypes } from "../../shared/api/tv-resource";
import { TVListResult } from "../../shared/types/Tv";
import { Movies } from "../../shared/types/Movie";

export interface CardRowProps {
    title: string;
    url: movieListingTypes | tvListingTypes;
    api: () => Promise<Movies | TVListResult>;
}

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
            color: theme.palette.secondary.main,
            marginLeft: theme.spacing(4.5),
        },
        titleBar: {
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        },
    })
);

export const CardRow: React.FC<CardRowProps> = (props) => {
    const classes = useStyles();
    const divRef = useRef<HTMLDivElement>(null);

    const query = useQuery(
        props.title,
        () => props.api()
    );

    const { data, error, isFetching } = query;

    const handleScroll = (direction: string) => {
        if (divRef && divRef.current) {
            if (direction === "left") {
                divRef.current.scrollTo({ behavior: "smooth", left: divRef.current.scrollLeft - 440 });
            } else {
                divRef.current.scrollTo({ behavior: "smooth", left: divRef.current.scrollLeft + 440 });
            }
        }
    };

    return (
        <Box marginY={6} color="textPrimary">
            <Typography variant="h4" className={classes.title}>
                {props.title}
            </Typography>
            <Box className={classes.gridRow} marginY={4}>
                <IconButton onClick={() => handleScroll("left")}>
                    <ChevronLeftSharp fontSize="large" color="secondary" />
                </IconButton>
                <Grid container className={classes.gridList} spacing={4} ref={divRef}>
                    {data?.results && data?.results.length > 0 ? data?.results.map((item) => {
                        return (
                            <Card
                                key={item.id}
                                title={item.title}
                                posterPath={item.poster_path}
                                id={item.id}
                                isLoading={isFetching}
                            />
                        );
                    }) : null}
                </Grid>
                <IconButton onClick={() => handleScroll("right")}>
                    <ChevronRightSharp fontSize="large" color="secondary" />
                </IconButton>
            </Box>
        </Box>
    );
};
