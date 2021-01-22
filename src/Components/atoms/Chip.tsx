import React, { useEffect } from "react";
import MDChip from "@material-ui/core/Chip";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        chip: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.main,
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1),
            padding: 0,
            height: 24,

        },
    });
});

export type ChipProps = {
    label: string;
    id: number;
};

export const Chip: React.FC<ChipProps> = (props) => {
    const classes = useStyles();
    return (
        <MDChip label={props.label} className={classes.chip} />
    );
};
