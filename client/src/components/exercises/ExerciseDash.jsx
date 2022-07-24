import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
    Box as MuiBox,
    Grid,
    styled,
} from '@mui/material'

// components
import ExerciseCard from './ExerciseCard'
import ExerciseSidebar from './ExerciseSidebar'
import ExerciseTopBar from './ExerciseTopBar'
import Nav from '../layout/Nav'

// exercises
import SimpleNotes from './SimpleNotes'

// funcs
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