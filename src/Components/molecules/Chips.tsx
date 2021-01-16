import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect } from "react";
import { Chip } from "../atoms/Chip";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        chipArr: {
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            margin: 0,
        },
    });
});

export type ChipsProps = {
    chips: {
        label:string,
        id: number,
    }[] | undefined;
};

export const Chips: React.FC<ChipsProps> = (props) => {
    useEffect(() => {
        console.log("-----HELLO-----")
        console.log(props);
    }, []);

    const classes = useStyles();
    return (
        <div className={classes.chipArr}>
            {props.chips?.map((chip) => {
                <Chip key={chip.id} id={chip.id} label={chip.label} />;
            })}
        </div>
    );
};
