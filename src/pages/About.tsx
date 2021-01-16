import React from 'react';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import {ReactComponent as TmdbLogo} from '../assets/tmdb.svg'

export const About: React.FC = () => {
    return (
        <Container maxWidth="md" style={{marginTop: "200px"}}>
            <TmdbLogo />
            <Typography variant="h3" color="secondary">
                This product uses the TMDb API but is not endorsed or certified by TMDb.
            </Typography>
        </Container>
    )
}