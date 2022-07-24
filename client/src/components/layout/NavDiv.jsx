import React from 'react'
import {
    Container as MuiContainer,
    styled,
} from '@mui/material'

const Container = styled(MuiContainer)(({theme}) => ({
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(33.4),
    marginRight: 0,
    padding: 0,
    width: theme.spacing(175.6),
    border: 'solid green'
}))

function NavContainer() {
    return (
        <Container
            disableGutters
            maxWidth={false}
        >
        </Container>
    )
}

export default NavContainer