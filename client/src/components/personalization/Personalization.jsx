import React, { useEffect } from 'react'
import {
    Button,
    Divider as MuiDivider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper as MuiPaper,
    Popover,
    Radio,
    RadioGroup,
    styled,
    Typography as MuiTypography,
} from '@mui/material'
import { CirclePicker } from 'react-color'

import Nav from '../layout/Nav'
import ColorPopover from './ColorPopover'

import { getUserDefault } from '../../utils/defaults'
import { load as loadUser } from '../../services/auth'
import { setPreferences } from '../../services/user'
import { noteToSolfege, noteToScaleDegree } from '../../utils/notes'
import { getAllColors } from '../../utils/colors'

function Personalization() {

    // * ------------------------- *
    // * ------- MUI Vars ------- *
    // * ------------------------- *

    const ColorPaper = styled(MuiPaper)(({theme}) => ({
        width: theme.spacing(20),
        height: theme.spacing(20),
        overflow: 'scroll',
    }))

    const Divider = styled(MuiDivider)(({theme}) => ({
        backgroundColor: theme.palette.primary.darkest,
    }))

    const NavMargin = styled('div')(({theme}) => ({
        marginTop: theme.navMargin.top,
        marginLeft: theme.navMargin.left,
        padding: theme.spacing(5),
    }))

    const NoteColorsButton = styled(Button)(({notecolor, theme}) => ({
        textTransform: 'none',
        backgroundColor: notecolor,
        border: 'solid ' + notecolor,
        '&:hover': {
            backgroundColor: notecolor,
        },
    }))

    const NoteColorsGrid = styled(Grid)(({theme}) => ({

    }))

    const NoteColorsGridItem = styled(Grid)(({theme}) => ({

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

    const [colorPickerAnchor, setColorPickerAnchor] = React.useState(null)
    const [noteConversion, setNoteConversion] = React.useState(() => noteToSolfege)
    const [user, setUser] = React.useState(getUserDefault())

    // get user data
    const getUser = async () => {
        try {
            const res = await loadUser()
            if (res.data) {
                // save user
                setUser(res.data)
                setNoteConversion(res.data.preferences.noteNames == 'solfege' ? () => noteToSolfege : () => noteToScaleDegree)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (user.needsToLoad)
            getUser()

    })

    // handle note names preference change
    const handleNoteNames = async (e) => {
        let prefs = user.preferences
        prefs.noteNames = e.target.value

        try {
            const res = await setPreferences(prefs)
        } catch (error) {
            console.log(error)
        }

        // refresh user data
        await getUser()
    }

    // handle color picker open/close
    const handleColorPicker = (e) => {
        // if closed, open at target. Else close
        if (colorPickerAnchor == null) {
            setColorPickerAnchor(e.currentTarget)
        }
        else setColorPickerAnchor(null)
    }

    // reset note colors
    const resetColors = async () => {
        // check if note colors are not currently == default
        if (user.preferences.noteColors == getUserDefault().preferences.noteColors)
            return
        
        // reset
        let prefs = user.preferences
        prefs.noteColors = getUserDefault().preferences.noteColors
        try {
            const res = await setPreferences(prefs)
        } catch (error) {
            console.log(error)
        }

        // refresh user data
        getUser()
    }

    // * ------------------------- *
    // * ------ Render Vars ------ *
    // * ------------------------- *

    const colorPickerID = colorPickerAnchor ? 'color-picker-popover' : undefined
    const noteColors = React.useMemo(() => {
            return <NoteColorsGrid container gap={2}>
                {user.progress.notes.notes.map((note, index) => (
                    <NoteColorsGridItem item key={index}>
                        <NoteColorsButton
                            variant='contained'
                            size='small'
                            notecolor={user.preferences.noteColors[note]}
                            onClick={(e) => handleColorPicker(e)}
                        >
                            {noteConversion(note)}
                        </NoteColorsButton>
                    </NoteColorsGridItem>
                ))}
            </NoteColorsGrid>
        },
        [user, noteConversion]
    )

    // * ------------------------- *
    // * -------- Return -------- *
    // * ------------------------- *

    return (
        <NavMargin>
            <Nav />

            <Paper>
                <Typography variant='h3'>
                    Personalization
                </Typography>

                <Divider />
                <Spacer />

                {/* Note Names */}
                <Typography variant='h6'>
                    Note Names
                </Typography>
                <FormControl>
                    <RadioGroup
                        defaultValue={user.preferences.noteNames}
                        onChange={handleNoteNames}
                    >
                        <FormControlLabel
                            value='solfege'
                            control={<Radio />}
                            label='Solfège'
                        />
                        <FormControlLabel
                            value='scaleDegrees'
                            control={<Radio />}
                            label='Scale Degrees'
                        />
                    </RadioGroup>
                </FormControl>

                <Spacer />
                <Divider />
                <Spacer />

                {/* Note Colors */}
                <Typography variant='h6'>
                    Note Colors
                </Typography>
                <Spacer />
                
                <ColorPopover update={() => getUser()} user={user}/>
                <Spacer />
                <Button onClick={resetColors}>
                    Reset
                </Button>

            </Paper>

        </NavMargin>
    )

}

export default Personalization