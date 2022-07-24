import React from 'react'

import {
    Box as MuiBox,
    Divider as MuiDivider,
    Paper as MuiPaper,
    styled,
    Typography
} from '@mui/material'

import Nav from './layout/Nav'

export default function About() {

    const Body = styled(Typography)(({theme}) => ({

    }))

    const Box = styled(MuiBox)(({theme}) => ({
        marginTop: theme.spacing(4)
    }))

    const Divider = styled(MuiDivider)(({theme}) => ({
        backgroundColor: theme.palette.primary.darkest
    }))

    const NavMargin = styled('div')(({theme}) => ({
        marginTop: theme.navMargin.top,
        marginLeft: theme.navMargin.left,
        padding: theme.spacing(5)
    }))

    const Paper = styled(MuiPaper)(({theme}) => ({
        padding: theme.spacing(3),
        backgroundColor: theme.palette.primary.lightest
    }))

    const Title = styled(Typography)(({theme}) => ({
        color: theme.palette.primary.darkest
    }))

    return (
        <NavMargin>

            <Nav />

            <Paper>
                {/* Title */}
                <Title variant='h2'>
                    About
                </Title>
                <Divider />

                {/* Body */}
                <Box>
                    <Body>
                        Here at flatsix we make your ear better.
                    </Body>
                </Box>
            </Paper>
        </NavMargin>
    )
}