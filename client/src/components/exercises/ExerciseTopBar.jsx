import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import {
    Tab,
    Tabs,
} from '@mui/material'

function ExerciseTopBar(props) {

    const params = useParams()
    const navigate = useNavigate()

    const [currTab, setCurrTab] = useState('notes')

    const setTabAndCallback = (e, newTab) => {
        // set function component state
        setCurrTab(newTab)
        // callback to dashboard to set state there
        props.onTabChange(e, newTab)
    }

    const handleNav = (e) => {
        // if exercise is already selected, replace history
        if (params.exercise != null)
            navigate('../exercises', {replace: true})
    }
    
    return (
        <Tabs
            variant='fullWidth'
            value={currTab}
            onChange={setTabAndCallback}
            sx={{
                position: 'static',
                p: 0,
                backgroundColor: 'primary.light',
                width: props.width,
                ml: 0,
                border: 'none'
            }}
        >
            <Tab
                label='Notes'
                value='notes'
                onClick={handleNav}
            />
            <Tab
                label='Chords'
                value='chords'
                onClick={handleNav}
            />
            <Tab
                label='Rhythm'
                value='rhythm'
                onClick={handleNav}
            />
        </Tabs>
    )
}

export default ExerciseTopBar