import React from 'react'
import { Link } from 'react-router-dom'
import { 
    AppBar as MuiAppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    InputBase,
    List,
    ListItem as MuiListItem,
    ListItemButton as MuiListItemButton,
    ListItemIcon,
    Menu as MuiMenu,
    MenuItem as MuiMenuItem,
    styled,
    Toolbar as MuiToolbar,
    Typography as MuiTypography,
} from '@mui/material'
import {
    AccountCircle as AccountCircleIcon,
    Audiotrack as AudiotrackIcon,
    AutoGraph as AutoGraphIcon,
    BorderColor as BorderColorIcon,
    EmojiEvents as EmojiEventsIcon,
    Help as HelpIcon,
    Home as HomeIcon,
    Info as InfoIcon,
    Search as SearchIcon,
    Star as StarIcon,
} from '@mui/icons-material'

import { load as loadUser } from '../../services/auth'
import { getLevelColor } from '../../utils/levels'

import flatsixLogo from '../../assets/flatsix_logo.png'

// * ------------------------- *
// * ------- MUI VARS ------- *
// * ------------------------- *

const drawerWidth = 275
const toolBarHeight = 65

const AppBar = styled(MuiAppBar)(({theme}) => ({
    zIndex: theme.zIndex.drawer + 1
}))

const ListItem = styled(MuiListItem)(({theme}) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
}))

const ListItemButton = styled(MuiListItemButton)(({theme}) => ({
    paddingLeft: theme.spacing(3)
}))

const LogoHolder = styled('div')(({theme}) => ({
    display: 'flex',
    marginLeft: theme.navMargin.left,
    marginRight: theme.spacing(4),
    maxHeight: theme.spacing(6),
    maxWidth: theme.spacing(30),
}))

const Menu = styled(MuiMenu)(({theme}) => ({
}))

const MenuItem = styled(MuiMenuItem)(({theme}) => ({
}))

const Toolbar = styled(MuiToolbar)(({theme}) => ({
    ml: theme.navMargin.left,
    height: toolBarHeight,
}))

const ToolbarSpacer = styled('div')(({theme}) => ({
    width: theme.navMargin.left
}))

const Typography = styled(MuiTypography)(({theme}) => ({
}))

const Username = styled(MuiTypography)(({theme}) => ({
    marginLeft: theme.spacing(2),
}))

// * ------------------------- *
// * ---------- Nav ---------- *
// * ------------------------- *

// default config for user levels data
const levelDefault = {
    level: 1,
    progress: 0,
}

// default config for user data
const userDefault = {
    username: null,
    levels: {
        overall: levelDefault,
        notes: levelDefault,
        chords: levelDefault,
        rhythm: levelDefault,
    },
}

class Nav extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // component states
            logInOpen: false,
            menuAnchor: null,
            signUpOpen: false,

            // user states
            user: userDefault,
        }

        // bind funcs
        this.handleLogIn = this.handleLogIn.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
        this.handleMenuOpen = this.handleMenuOpen.bind(this)
        this.handleMenuClose = this.handleMenuClose.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
    }

    // * ------------------------- *
    // * ------- Nav Funcs ------- *
    // * ------------------------- *

    async componentDidMount() {
        // if user logged in, get user profile data
        if (localStorage.getItem('authToken')) {
            try {
                const res = await loadUser()
                if (res.data)
                    this.setState({ user: res.data })
            } catch (error) {
                console.log(error)
            }
        }
    }

    handleLogIn() {
        // if log in closed, open log in and close menu
        if (!this.state.logInOpen)
            this.setState({
                logInOpen: true,
                menuAnchor: null,
            })
        // else close log in
        if (this.state.logInOpen)
            this.setState({
                logInOpen: false,
            })
    }

    // log out user
    handleLogOut() {
        localStorage.removeItem('authToken')
        this.setState({ user: null })
    }

    // open log in / sign up / log out menu
    handleMenuOpen(e) {
        this.setState({menuAnchor: e.currentTarget})
    }

    // close log in / sign up / log out menu
    handleMenuClose() {
        this.setState({menuAnchor: null})
    }

    handleSignUp() {
        this.setState({signUpOpen: !this.state.signUp})
    }

    // * ------------------------- *
    // * ------ Nav Render ------ *
    // * ------------------------- *

    render() {

        // * ------------------------- *
        // * ------ Render Vars ------ *
        // * ------------------------- *

        let menu = null
        // is user not logged in, render logIn/signUp menu
        if (this.state.user == userDefault) {
            menu = (
                <Menu 
                    variant='menu'
                    open={Boolean(this.state.menuAnchor)}
                    anchorEl={this.state.menuAnchor}
                    onClose={this.handleMenuClose}
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
            )
        }
        // else if user logged in, render log out menu
        else {
            menu = (
                <Menu 
                    variant='menu'
                    open={Boolean(this.state.menuAnchor)}
                    anchorEl={this.state.menuAnchor}
                    onClose={this.handleMenuClose}
                    MenuListProps={{
                        sx: {
                            backgroundColor: 'primary.light'
                        }
                    }}
                >
                    <MenuItem onClick={this.handleLogOut}>
                        <Typography>
                            Log Out
                        </Typography>
                    </MenuItem>
                </Menu>
            )
        }

        let username = null
        // if user logged in, display username on nav bar
        if (this.state.user != userDefault) {
            username = (
                <Username>
                    {this.state.user.username}
                </Username>
            )
        }

        // * ------------------------- *
        // * ----- Render Return ----- *
        // * ------------------------- *

        return (
            <div style={{width: '100%', height: '100%'}}>

                {/* Header */}
                <AppBar>
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
                        <Box sx={{
                            display: 'flex',
                            backgroundColor: 'primary.darker',
                            borderRadius: 5,
                            overflow: 'hidden',
                            justifyContent: 'center'
                        }}>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1, width: 400 }}
                                inputProps={{sx: {color: 'primary.contrastText'}}}
                                placeholder="Search..."
                            />
                        </Box>
                        <div style={{flexGrow: 1}}></div>
                        <Button onClick={this.handleMenuOpen} variant='' sx={{textTransform: 'none'}}>
                            <AccountCircleIcon
                                fontSize='large' 
                                sx={{
                                    border: '1px solid ' + getLevelColor(this.state.user.levels.overall.level),
                                    borderRadius: 100,
                                    backgroundColor: getLevelColor(this.state.user.levels.overall.level),
                                }}
                            />
                            {username}
                        </Button>
                        {menu}
                    </Toolbar>
                </AppBar>

                {/* Sidebar */}
                <Drawer
                    PaperProps={{
                        sx: {
                            zIndex: 1300,
                            backgroundColor: 'primary.main',
                            width: drawerWidth
                        }
                    }}
                    variant='permanent'
                    anchor='left'
                >
                    <List sx={{pt: 0}}>
                        <ListItem sx={{height: toolBarHeight}}>
                        </ListItem>
                        <Divider />

                        {/* Main */}
                        <ListItem
                            disablePadding
                            sx={{
                                display: 'block'
                            }}
                        >
                            <ListItemButton component={Link} to='/'>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <Typography>
                                    Home
                                </Typography>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <EmojiEventsIcon />
                                </ListItemIcon>
                                <Typography>
                                    Daily Challenge
                                </Typography>
                            </ListItemButton>
                            <ListItemButton component={Link} to='/exercises'>
                                <ListItemIcon>
                                    <AudiotrackIcon />
                                </ListItemIcon>
                                <Typography>
                                    Exercises
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                        {/* Profile */}
                        <ListItem
                            disablePadding
                            sx={{
                                display: 'block'
                            }}
                        >
                            <ListItemButton component={Link} to='/me'>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <Typography>
                                    Me
                                </Typography>
                            </ListItemButton>
                            <ListItemButton component={Link} to='/favorites'>
                                <ListItemIcon>
                                    <StarIcon />
                                </ListItemIcon>
                                <Typography>
                                    Favorites
                                </Typography>
                            </ListItemButton>
                            <ListItemButton component={Link} to ='/personalization'>
                                <ListItemIcon>
                                    <BorderColorIcon />
                                </ListItemIcon>
                                <Typography>
                                    Personalization
                                </Typography>
                            </ListItemButton>
                            <ListItemButton component={Link} to ='/progress'>
                                <ListItemIcon>
                                    <AutoGraphIcon />
                                </ListItemIcon>
                                <Typography>
                                    Progress
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                        {/* Friends */}
                        <ListItem
                            disablePadding
                            sx={{
                                display: 'block'
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    pt: 1,
                                    pl: 2
                                }}
                            >
                                Friends
                            </Typography>
                        </ListItem>
                        <Divider />

                        {/* More */}
                        <ListItem
                            disablePadding
                            sx={{
                                display: 'block'
                            }}
                        >
                            <ListItemButton component={Link} to='/about'>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <Typography>
                                    About
                                </Typography>
                            </ListItemButton>
                            <ListItemButton component={Link} to='/help'>
                                <ListItemIcon>
                                    <HelpIcon />
                                </ListItemIcon>
                                <Typography>
                                    Help
                                </Typography>
                            </ListItemButton>
                        </ListItem>

                    </List>
                </Drawer>
            </div>
        )
    }
}

export default Nav