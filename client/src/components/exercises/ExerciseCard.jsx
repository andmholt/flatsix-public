import React from 'react'
import { Link } from 'react-router-dom'
import {
    Button,
    Box,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    styled,
    Typography,
} from '@mui/material'
import {
    SsidChart as SsidChartIcon
} from '@mui/icons-material'

const ExerciseCard = (props) => {

// * ------------------------- *
// * ------- MUI Vars ------- *
// * ------------------------- *

const ExerciseButton = styled(Button)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    textTransform: 'none',
    overflow: 'hidden',
    transition: theme.transitions.duration.short,
    width: theme.spacing(30),
    minHeight: theme.spacing(30),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lightest,
    alignItems: 'start',
    justifyContent: 'start',
    padding: theme.spacing(2),
    '&:hover': {
        transition: theme.transitions.duration.short,
        color: theme.palette.primary.lightest,
        backgroundColor: theme.palette.primary.dark,
        width: theme.spacing(40),
        height: theme.spacing(40),
    }
}))

const ExDiv = styled(Divider)(({theme}) => ({
    width: '100%',
    borderBottomWidth: 2,
    backgroundColor: 'inherit',
}))

const GridItem = styled(Grid)(({theme}) => ({
}))

    // * ------------------------- *
    // * ---- Component Funcs ---- *
    // * ------------------------- *

    const [hover, setHover] = React.useState(false)

    // * ------------------------- *
    // * ------ Render Vars ------ *
    // * ------------------------- *

    let stats = null
    if (hover) {
        stats = (
            <List>
                <ListItem>
                    <ListItemIcon>
                        <SsidChartIcon />
                    </ListItemIcon>
                    <Typography sx={{alignTest: 'start'}}>
                        Accuracy: {String(props.exercise.accuracy + '%')}
                    </Typography>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <SsidChartIcon />
                    </ListItemIcon>
                    <Typography sx={{alignTest: 'start'}}>
                        Recommended Level: {props.exercise.level}
                    </Typography>
                </ListItem>
            </List>
        )
    }

    // * ------------------------- *
    // * -------- Return -------- *
    // * ------------------------- *

    return (
        <GridItem item>
            <ExerciseButton disableRipple variant='contained'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                //component={Link} to={props.exercise.title}
                component={Link} to='Simple Notes' // for demo only
            >
                <Typography variant='h5'>
                    {props.exercise.title}
                </Typography>
                <ExDiv />
                <div style={{flexGrow: 1}} />
                {stats}
                <div style={{flexGrow: 1}} />
                <Typography  align='left'>
                    {props.exercise.description}
                </Typography>
            </ExerciseButton>
        </GridItem>
    )
}

export default ExerciseCard