import React from 'react'
import {
    Box,
    Paper as MuiPaper,
    styled,
    Typography as MuiTypography,
} from '@mui/material'

import Nav from '../layout/Nav'

const HomeBox = styled(Box)(({theme}) => ({
    height: '100%',
    padding: theme.spacing(5),
}))

const NavMargin = styled('div')(({theme}) => ({
    marginTop: theme.navMargin.top,
    marginLeft: theme.navMargin.left,
}))

const Paper = styled(MuiPaper)(({theme}) => ({
    backgroundColor: theme.palette.primary.light,
}))

const Typography = styled(MuiTypography)(({theme}) => ({
    color: theme.palette.primary.darkest,
}))

class Home extends React.Component {
    render() {
        return (
            <NavMargin>
                <Nav />
                <HomeBox>

                    <Paper>
                        <Typography variant='h3'>
                            Popular Exercises
                        </Typography>
                    </Paper>

                    Homepage
                </HomeBox>
            </NavMargin>
        )
    }
}

export default Home