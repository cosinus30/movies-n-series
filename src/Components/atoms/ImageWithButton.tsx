import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        image: {
            objectFit: "cover",
            maxHeight: 360,
            width: "calc(100% + 48px)",
            marginTop: -28,
            marginLeft: -24,
            marginRight: -24,
        },
        imageContainer: {
            position: "relative",
            width: "100%",
            height: "360px",
        },
        imageButton: {
            position: "absolute",
            right: "-2%",
            top: "-2%",
            color: theme.palette.common.white,
            background: theme.palette.primary.main,
            opacity: 0.3,
            "&:hover": {
                background: theme.palette.primary.main,
                opacity: 1,
            },
        },
    })
})

export type ImageWithButtonProps = {
    backdrop_path: string | undefined,
    original_title: string | undefined,
    onClose: () => void,
}


export const ImageWithButton: React.FC<ImageWithButtonProps> = (props) => {

    const classes = useStyles();
    return (
        <div className={classes.imageContainer}>
            <img
                src={"https://image.tmdb.org/t/p/original/" + props.backdrop_path}
                alt={props.original_title}
                className={classes.image}
            />
            <IconButton className={classes.imageButton} onClick={props.onClose}>
                {props.children}
            </IconButton>
        </div>
    );
};
