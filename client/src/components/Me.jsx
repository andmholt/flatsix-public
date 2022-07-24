import React, { useEffect } from 'react'

import {
    Box as MuiBox,
    Button,
    Divider as MuiDivider,
    Paper as MuiPaper,
    styled,
    Typography as MuiTypography,
} from '@mui/material'
import {
    AccountCircle as AccountCircleIcon,
} from '@mui/icons-material'

import { load as loadUser } from '../services/auth'

import Nav from './layout/Nav'

import profileImg from './img/profileImg.png'

function Me() {

    // * ------------------------- *
    // * ------- MUI Vars ------- *
    // * ------------------------- *

    const NavMargin = styled('div')(({theme}) => ({
        marginTop: theme.navMargin.top,
        marginLeft: theme.navMargin.left,
        padding: theme.spacing(5),
    }))

    const Paper = styled(MuiPaper)(({theme}) => ({
        height: theme.spacing(100),
        width: theme.spacing(90),
        padding: theme.spacing(3),
        backgroundColor: theme.palette.primary.lightest
    }))

    const ProfileImg = styled('img')(({theme}) => ({
        width: theme.spacing(20),
    }))

    const ProfileImgButton = styled('div')(({theme}) => ({
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
    }))

    const Typography = styled(MuiTypography)(({theme}) => ({
        color: theme.palette.primary.darkest,
    }))

    // * ------------------------- *
    // * ---- Component Vars ---- *
    // * ------------------------- *

    const [username, setUsername] = React.useState('')

    // * ------------------------- *
    // * ---- Component Funcs ---- *
    // * ------------------------- *

    useEffect(() => {

        // gets and returns user data
        const getUserData = async () => {
            // if no user data, get user data
            if (username == '') {
                try {
                    const res = await loadUser()
                    // set only if valid response
                    if (res.data.username) {
                        setUsername(res.data.username)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        getUserData()
    })

    return (
        <NavMargin>
            <Nav />

            <Paper>

                {/* Top */}
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <ProfileImgButton disableRipple>
                        <ProfileImg
                            src={profileImg}
                            alt=''
                        />
                    </ProfileImgButton>
                    <Typography variant='h3'>
                        {username}
                    </Typography>
                    <div style={{flexGrow: 1}} />
                </div>

                
            </Paper>

        </NavMargin>
    )

}

export default Me