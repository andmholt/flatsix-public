import React from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import Howl from 'howler'
import {
    Box,
    Button,
    Grid,
    Paper,
    styled,
    Typography,
} from '@mui/material'

function Exercise(props) {

    // * ------------------------- *
    // * ------- MUI Vars ------- *
    // * ------------------------- *

    const drawerWidth = 400
    const fullWidth = 1405

    const ButtonPaper = styled(Paper)(({theme}) => ({
        marginTop: theme.spacing(3),
        backgroundColor: 'white',
    }))

    const ButtonGrid = styled(Grid)(({theme}) => ({
        marginTop: theme.spacing(3),
        justifyContent: 'center',
    }))

    const ButtonGridItem = styled(Grid)(({theme}) => ({
    }))

    const Description = styled(Typography)(({theme}) => ({
        color: theme.palette.primary.darker,
        marginLeft: theme.spacing(0.5)
    }))

    const ExercisePaper = styled(Paper)(({theme}) => ({
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        height: theme.spacing(100),
        backgroundColor: theme.palette.primary.lightest
    }))

    const GridButton = styled(Button)(({theme}) => ({
        width: theme.spacing(11),
        height: theme.spacing(7)
    }))

    const StavePaper = styled(Paper)(({theme}) => ({
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        height: theme.spacing(40),
        overflow: 'hidden',
        transition: "all .5s ease",
        WebkitTransition: "all .5s ease",
        MozTransition: "all .5s ease"
    }))

    const Title = styled(Typography)(({theme}) => ({
        color: theme.palette.primary.darkest
    }))

    // * ------------------------- *
    // * ---- Component Vars ---- *
    // * ------------------------- *

    const controls = useAnimationControls()

    const onClick = (newColor) => {
        controls.start({
            backgroundColor: [newColor, '#fff'],
            transition: {
                duration: 1,
            }
        })
    }

    // * ------------------------- *
    // * -------- Return -------- *
    // * ------------------------- *

    return (
        <Box>
            <ExercisePaper>

                {/* title */}
                <div style={{display: 'flex', width: '100%'}}>
                    <Title variant='h3'>
                        Simple Notes
                    </Title>
                    <div style={{flexGrow: 1}} />
                    <Title variant='h3' sx={{float: 'right'}}>
                        0/10
                    </Title>
                </div>
                <Description>
                    Guess notes one by one
                </Description>

                {/* music display */}
                <StavePaper>
                    <motion.div
                        initial={{backgroundColor: '#fff', height: '100%', width: '100%'}}
                        animate={controls}
                    ></motion.div>
                </StavePaper>

                {/* user buttons */}
                <ButtonGrid container gap={3}>
                    <ButtonGridItem item >
                        <GridButton variant='contained' onClick={(e) => onClick('#09f')}>
                            do
                        </GridButton>
                    </ButtonGridItem>
                    <ButtonGridItem item >
                        <GridButton variant='contained' onClick={(e) => onClick('#f00')}>
                            so
                        </GridButton>
                    </ButtonGridItem>
                </ButtonGrid>

            </ExercisePaper>
        </Box>
    )
}

export default Exercise