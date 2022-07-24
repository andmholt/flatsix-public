import * as React from 'react';
import {
  Box as MuiBox,
  Button,
  Grid,
  Popover as MuiPopover,
  styled,
} from '@mui/material'
import { CirclePicker } from 'react-color'

import { noteToSolfege, noteToScaleDegree } from '../../utils/notes'
import { getAllColors, hexSixToHexThree } from '../../utils/colors'
import { setPreferences } from '../../services/user'

export default function ColorPopover(props) {

  const Box = styled(MuiBox)(({theme}) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    overflow: 'scroll',
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

  const Popover = styled(MuiPopover)(({theme}) => ({
    height: theme.spacing(30),
    width: theme.spacing(70),
  }))

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [currNote, setCurrNote] = React.useState(null)

  const handleClick = (event, note) => {
    setAnchorEl(event.currentTarget)
    setCurrNote(note)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setCurrNote(null)
  }

  const handleChange = async (color, event) => {
    let prefs = props.user.preferences
    prefs.noteColors[currNote] = hexSixToHexThree(color.hex)
    try {
      const res = await setPreferences(prefs)
    } catch (error) {
      console.log(error)
    }

    handleClose()
    props.update()
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  let noteConversion = props.user.preferences.noteNames == 'solfege' ? noteToSolfege : noteToScaleDegree

  const noteColors = React.useMemo(() => {
    return <NoteColorsGrid container gap={2}>
        {props.user.progress.notes.notes.map((note, index) => (
            <NoteColorsGridItem item key={note}>
                <NoteColorsButton
                    variant='contained'
                    size='small'
                    notecolor={props.user.preferences.noteColors[note]}
                    onClick={(e) => handleClick(e, note)}
                >
                    {noteConversion(note)}
                </NoteColorsButton>
            </NoteColorsGridItem>
        ))}
    </NoteColorsGrid>
},
[props.user, noteConversion]
)

  return (
    <div>
      {noteColors}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box>
          <CirclePicker colors={getAllColors()} onChange={handleChange} />
        </Box>
      </Popover>
    </div>
  );
}
