import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Button,
    Divider,
    Drawer,
    Grid,
    IconButton,
    LinearProgress as MuiLinearProgress,
    List as MuiList,
    ListItem,
    styled,
    ToggleButton,
    ToggleButtonGroup,
    Typography as MuiTypography,
} from '@mui/material'
import {
    AccountCircle as AccountCircleIcon,
} from '@mui/icons-material'

import { getUserDefault } from '../../utils/defaults'
import { getLevelColor } from '../../utils/levels'
import { noteToScaleDegree, noteToSolfege } from '../../utils/notes'
import { load as loadUser } from '../../services/auth'
import { load as loadExercise } from '../../services/exercises'
import store from '../../store'

// * ------------------------- *
// * ---- Component Vars ---- *
// * ------------------------- *

const exerciseDefault = {
    title: null,
    description: null,
    options: [],
}

const ExerciseSidebar = (props) => {

    // * ------------------------- *
    // * ------- MUI Vars ------- *
    // * ------------------------- *

    const LinearProgress = styled(MuiLinearProgress)(({theme}) => ({
        width: '100%',
    }))

    const List = styled(MuiList)(({theme}) => ({

    }))

    const ListItemProgress = styled(ListItem)(({theme}) => ({
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    }))

    const ListItemSettings = styled(ListItem)(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'start',
        marginTop: 0,
    }))

    const NoteToggle = styled(ToggleButton)(({notecolor, theme}) => ({
        '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: notecolor,
            opacity: '90%',
        }
    }))

    const NoteToggleGroup = styled(ToggleButtonGroup)(({theme}) => ({

    }))

    const Progress = styled('div')(({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        width: '100%',
    }))

    const ProgressLevel = styled(MuiTypography)(({theme}) => ({
        display: 'flex',
        width: 25,
        height: 25,
        borderRadius: 7,
        color: theme.palette.primary.darkest,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(1.5),
    }))

    const Typography = styled(MuiTypography)(({theme}) => ({
        color: theme.palette.primary.darkest,
    }))

    // * ------------------------- *
    // * ---- Component Funcs ---- *
    // * ------------------------- *

    const [user, setUser] = React.useState(getUserDefault())
    const [exercise, setExercise] = React.useState(exerciseDefault)
    const [notesAlignment, setNotesAlignment] = React.useState(null)

    const params = useParams()

    useEffect(() => {

        // if exercise is loaded, get exercise data and save to state
        const getExercise = async () => {
            if (params.exercise != exercise.title) {
                try {
                    const res = await loadExercise(params.exercise)
                    if (res.data)
                        setExercise(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
        }

        // if no user saved in state, get user data and save to state
        const getUser = async () => {
            if (user.username == null) {
                try {
                    const res = await loadUser()
                    if (res.data)
                        setUser(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
        }

        // execute
        getUser()
        getExercise()

    })

    const handleNotes = (e, newAlignment) => {
        // make sure new note alignment is sorted
        newAlignment = newAlignment.sort()

        // set state
        setNotesAlignment(newAlignment)

        // set options in exercise
        props.setOptions({
            notes: newAlignment
        })
    }


    // * ------------------------- *
    // * ------ Render Vars ------ *
    // * ------------------------- *

    // NOTES
    // if exercise requires notes options, return notes options
    let notes = null
    if (params.exercise != null && exercise != exerciseDefault) {
        notes = (
            <ListItemSettings>
                <Typography variant='h6'>
                    Notes
                </Typography>
                <NoteToggleGroup value={notesAlignment} onChange={handleNotes}>
                    {user.progress.notes.notes.map((note, index) => (
                        <NoteToggle value={note} key={index}
                            notecolor={user.preferences.noteColors[note]}
                        >
                            {noteToSolfege(note)}
                        </NoteToggle>
                    ))}
                </NoteToggleGroup>
            </ListItemSettings>
        )
    }

    // * ------------------------- *
    // * --------- Return -------- *
    // * ------------------------- *

    return (
        <Drawer
            PaperProps={{
                sx: {
                    backgroundColor: 'primary.light',
                    width: props.width,
                    alignContent: 'start',
                    pt: 8
                }
            }}
            variant='permanent'
            anchor='right'
        >

            {/* Profile Info */}
            <List>

                {/* Profile Img */}
                <ListItem sx={{width: '100%', justifyContent: 'center'}}>
                    <IconButton>
                        <AccountCircleIcon sx={{fontSize: 200}}/>
                    </IconButton>
                </ListItem>

                {/* Progress */}
                <ListItemProgress>
                    <ProgressLevel sx={{border: '2px solid ' + getLevelColor(user.levels.notes.level)}}>
                        {user.levels.notes.level}
                    </ProgressLevel>
                    <Progress sx={{color: getLevelColor(user.levels.notes.level)}}>
                        <Typography>
                            Notes
                        </Typography>
                        <LinearProgress value={user.levels.notes.progress} variant='determinate' color='inherit' />
                    </Progress>
                </ListItemProgress>
                <ListItemProgress>
                    <ProgressLevel sx={{border: '2px solid ' + getLevelColor(user.levels.chords.level)}}>
                        {user.levels.chords.level}
                    </ProgressLevel>
                    <Progress sx={{color: getLevelColor(user.levels.chords.level)}}>
                        <Typography>
                            Chords
                        </Typography>
                        <LinearProgress value={user.levels.chords.progress} variant='determinate' color='inherit' />
                    </Progress>
                </ListItemProgress>
                <ListItemProgress>
                    <ProgressLevel sx={{border: '2px solid ' + getLevelColor(user.levels.rhythm.level)}}>
                        1
                    </ProgressLevel>
                    <Progress sx={{color: getLevelColor(user.levels.rhythm.level)}}>
                        <Typography>
                            Rhythm
                        </Typography>
                        <LinearProgress value={user.levels.rhythm.progress} variant='determinate' color='inherit' />
                    </Progress>
                </ListItemProgress>

            </List>
            <Divider />

            {/* Exercise Info */}
            <List>

                {/* Notes */}
                {notes}

                {/* Instrument */}

            </List>
        </Drawer>
    )
}

export default ExerciseSidebar