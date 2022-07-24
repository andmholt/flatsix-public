import React from 'react'

import {
    Box as MuiBox,
    Divider as MuiDivider,
    Paper as MuiPaper,
    styled,
    Typography
} from '@mui/material'

import Nav from './layout/Nav'

export default function Help() {

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
            
        </NavMargin>
    )
}