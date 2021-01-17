import React, { useEffect } from "react";
import MDChip from "@material-ui/core/Chip";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        chip: {
            marginRight: theme.spacing(0.5),
            padding: 0,
            height: 24
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
        <MDChip color="secondary" label={props.label} className={classes.chip} />
    );
};
