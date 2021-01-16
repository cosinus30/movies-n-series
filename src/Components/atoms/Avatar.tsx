import React from "react";
import MDAvatar, {AvatarProps as MDAvatarProps} from '@material-ui/core/Avatar';
import MDTooltip from '@material-ui/core/Tooltip'
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography"
const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        avatar: {
            margin: theme.spacing(1),
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    })
})


export type AvatarProps = {
    artistName: string,
    artistCharacterName: string,
    artistId: number,
    artistProfilePath: string,
} 

export const Avatar: React.FC<AvatarProps> = (props) => {
    const classes = useStyles();
    return (
        <MDTooltip
            title={
                <React.Fragment>
                    <Typography variant="body2" color="inherit">
                        {props.artistName}
                    </Typography>
                    <em>{props.artistCharacterName}</em>
                </React.Fragment>
            }
            placement="top"
        >
            <MDAvatar
                key={props.artistId}
                className={classes.avatar}
                alt={props.artistName}
                src={"https://image.tmdb.org/t/p/original/" + props.artistProfilePath}
            />
        </MDTooltip>
    );
};