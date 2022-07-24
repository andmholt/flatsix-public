import React from 'react'
import {
    Divider as MuiDivider,
    Paper as MuiPaper,
    styled,
    Typography as MuiTypography,
} from '@mui/material'

import Nav from './layout/Nav'

function Progress() {

    // * ------------------------- *
    // * ------- MUI Vars ------- *
    // * ------------------------- *

    const Divider = styled(MuiDivider)(({theme}) => ({
        backgroundColor: theme.palette.primary.darkest,
    }))

    const NavMargin = styled('div')(({theme}) => ({
        marginTop: theme.navMargin.top,
        marginLeft: theme.navMargin.left,
        padding: theme.spacing(5)
    }))

    const Paper = styled(MuiPaper)(({theme}) => ({
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(3),
    }))

    const Spacer = styled('div')(({theme}) => ({
        height: theme.spacing(3),
    }))

    const Typography = styled(MuiTypography)(({theme}) => ({
        color: theme.palette.primary.darkest,
    }))

    // * ------------------------- *
    // * ---- Component Vars ---- *
    // * ------------------------- *

    // * ------------------------- *
    // * -------- Return -------- *
    // * ------------------------- *

    return (
        <NavMargin>
            
            <Nav />

            <Paper>

                <Typography variant='h3'>
                    Progress
                </Typography>

                <Divider />
                <Spacer />

            </Paper>

        </NavMargin>
    )

}

export default Progress