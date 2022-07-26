import React from 'react'
import { Link } from 'react-router-dom'
import {
    AppBar as MuiAppBar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Toolbar as MuiToolbar,
    Typography,
} from '@mui/material'
import {
    AccountCircle as AccountCircleIcon,
} from '@mui/icons-material'

import flatsixLogo from '../../assets/flatsix_logo.png'

const AppBar = styled(MuiAppBar)(({theme}) => ({

}))

const LogoHolder = styled('div')(({theme}) => ({
    display: 'flex',
    maxHeight: theme.spacing(6),
    maxWidth: theme.spacing(30),
}))

const Toolbar = styled(MuiToolbar)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    height: theme.navMargin.top
}))

function SimpleTopBar() {
    const [menuAnchor, setMenuAnchor] = React.useState(null)

    const handleMenuOpen = (e) => {
        setMenuAnchor(e.currentTarget)
    }

    const handleMenuClose = () => {
        setMenuAnchor(null)
    }

    return (
        <Toolbar>
            <LogoHolder>
                <Button component={Link} to='/'
                    sx={{
                        ml: 4,
                        mr: 4
                    }}>
                    <img src={flatsixLogo} style={{
                    maxWidth: '100%', maxHeight: '100%'}}/>
                </Button>
            </LogoHolder>
            <div style={{flexGrow: 1}}></div>
            <IconButton onClick={handleMenuOpen}>
                <AccountCircleIcon fontSize='large' />
            </IconButton>
            <Menu 
                variant='menu'
                open={Boolean(menuAnchor)}
                anchorEl={menuAnchor}
                onClose={handleMenuClose}
                MenuListProps={{
                    sx: {
                        backgroundColor: 'primary.light'
                    }
                }}
            >
                <MenuItem component={Link} to='/logIn'>
                    <Typography>
                        Log In
                    </Typography>
                </MenuItem>
                <MenuItem component={Link} to='/signUp'>
                    <Typography>
                        Sign Up
                    </Typography>
                </MenuItem>
            </Menu>
        </Toolbar>
    )
}

export default SimpleTopBar