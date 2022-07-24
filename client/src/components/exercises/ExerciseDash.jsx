import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
    Box as MuiBox,
    Button,
    ButtonBase,
    Container,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton as MuiListItemButton,
    ListItemIcon,
    Paper,
    styled,
    Tab,
    Tabs,
    Toolbar,
    Typography,
} from '@mui/material'
import { Co2Sharp } from '@mui/icons-material'

// components
import Exercise from './Exercise'
import ExerciseCard from './ExerciseCard'
import ExerciseSidebar from './ExerciseSidebar'
import ExerciseTopBar from './ExerciseTopBar'
import Nav from '../layout/Nav'

// exercises
import SimpleNotes from './SimpleNotes'

// funcs
import { set as setOptionsCategories, initial as initialOptionsCategories } from './currExerciseSlice'
import { getExercises } from '../../services/exercises'

const fullWidth = 1405
const drawerWidth = 400

// * ------------------------- *
// * --- Exercise Display --- *
// * ------------------------- *

const optionsCategoriesDefault = {
    notes: {
        notes: false,
        num: false,
    },
    chords: {
        intervals: false,
        chords: false,
    },
    rhythm: {
        lengths: false,
        meters: false,
    },
}

function ExerciseDisplay(props) {

    const dispatch = useDispatch()
    const params = useParams()

    // holds exercises
    const [notesExercises, setNotesExercises] = React.useState([])
    const [chordsExercises, setChordsExercises] = React.useState([])
    const [rhythmExercises, setRhythmExercises] = React.useState([])

    useEffect(() => {

        // get all notes exercises
        const _getExercises = async () => {
            // only get exercises if need to
            if (!notesExercises.length) {
                try {
                    const res = await getExercises()
                    if (res.data != null) {
                        // go through each exercise, filter into correct category
                        let _notesExs = [], _chordsExs = [], _rhythmExs = []
                        for (const ex of res.data) {
                            switch (ex.category) {
                                case 'notes' :
                                    _notesExs.push(ex)
                                    break
                                case 'chords' :
                                    _chordsExs.push(ex)
                                    break
                                case 'rhythm' :
                                    _rhythmExs.push(ex)
                                    break
                                default :
                                    break
                            }
                        }
                        setNotesExercises(_notesExs)
                        setChordsExercises(_chordsExs)
                        setRhythmExercises(_rhythmExs)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        // get exercise data
        _getExercises()

    })

    const DisplayGrid = styled(Grid)(({theme}) => ({
        width: '100%',
        padding: theme.spacing(5),
        justifyContent: 'center',
    }))

    const notesTabs = [
        {
            // guess notes, 1 by 1
            // each level adds:
            // - new note type
            title: 'Simple Notes',
            body: 'Guess the note.',
            accuracy: 89,
            level: 1,
        },
        {
            // guess notes in sequence
            // each level adds:
            // - new note type (in corresponding to note added in simple notes)
            // - every 3 or so lvls: another note in sequence
            title: 'More Notes',
            body: 'Guess the notes. There are more this time...',
            accuracy: 84,
            level: 1,
        },
        {
            // guess simple melodies
            // lvl 1 starts with more notes (maybe 3 or 4?)
            // each level adds:
            // - new note type every couple of lvls (does not directly correspond to simple 
            //   notes progression, since more notes to begin with)
            // - different rhythms and speed
            title: 'Simple Melodies',
            body: 'Guess the melody.',
            accuracy: 74,
            level: 1,
        },
        {
            title: 'Exercise 4',
            body: 'asdfasdf',
            accuracy: 89,
            level: 2,
        },
        {
            title: 'Exercise 5',
            body: 'asdfasdf',
            accuracy: 73,
            level: 2,
        },
    ]

    let notes = null
    if (notesExercises.length) {
        notes = (
            <DisplayGrid container gap={5}>
                {notesExercises.map((exercise, index) =>
                    <ExerciseCard exercise={exercise} key={index}
    
                    />
                )}
            </DisplayGrid>
        )
    }

    // chords category
    let chords = null
    if (chordsExercises.length) {
        chords = (
            <DisplayGrid container gap={5}>
                {chordsExercises.map((exercise, index) =>
                    <ExerciseCard exercise={exercise} key={index}
    
                    />
                )}
            </DisplayGrid>
        )
    }

    // rhythm category
    let rhythm = null
    if (rhythmExercises.length) {
        rhythm = (
            <DisplayGrid container gap={5}>
                {rhythmExercises.map((exercise, index) =>
                    <ExerciseCard exercise={exercise} key={index}
    
                    />
                )}
            </DisplayGrid>
        )
    }

    // exercise
    let exercise
    switch (params.exercise) {
        case 'Simple Notes' :
            // set exercise
            exercise = (<SimpleNotes options={props.options} />)

            break
        default :
            exercise = null
    }

    // decide what to display
    // if no exercise currently selected, display categories
    let display = notes
    if (params.exercise == null) {
        // set options categories

        if (props.currTab == 'chords')
            display = chords
        else if (props.currTab == 'rhythm')
            display = rhythm
    }
    // else display current exercise
    else display = exercise

    return (
        display
    )
}

// * ------------------------- *
// * ------- MUI Vars ------- *
// * ------------------------- *

const Box = styled(MuiBox)(({theme}) => ({
    width: '100%',
}))

const DisplayBox = styled(MuiBox)(({theme}) => ({
    width: theme.spacing(125.2),
}))

const NavMargin = styled('div')(({theme}) => ({
    marginTop: theme.navMargin.top,
    marginLeft: theme.navMargin.left,
}))

// * ------------------------- *
// * ----- Exercise Dash ----- *
// * ------------------------- *

class ExerciseDash extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currTab: 'notes',

            // controls exercise options
            options: {
                notes: [],
            },

            // determines which option categories are displayed on the sidebar
            optionsCategories: optionsCategoriesDefault,
        }

        // bind funcs
        this.handleTab = this.handleTab.bind(this)
    }

    // handle tab switch
    handleTab(e, newTab) {
        this.setState({currTab: newTab})
    }

    render() {
        return (
            <NavMargin>

                <Nav />
    
                {/* Sidebar */}
                <ExerciseSidebar
                    width={drawerWidth}
                    setOptions={(newOptions) => this.setState({ options: newOptions })}
                />
    
                {/* Top Bar */}
                <ExerciseTopBar onTabChange={this.handleTab} width={fullWidth-drawerWidth}/>
    
                {/* Display */}
                <DisplayBox>
                    <ExerciseDisplay
                        options={this.state.options}
                        currTab={this.state.currTab}
                    />
                </DisplayBox>
    
            </NavMargin>
        )
    }
}

export default ExerciseDash