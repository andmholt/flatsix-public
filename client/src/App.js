import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import About from './components/About'
import ExerciseDash from './components/exercises/ExerciseDash'
import Favorites from './components/Favorites'
import Help from './components/Help'
import Home from './components/home/Home'
import LogIn from './components/LogIn'
import Me from './components/Me'
import Personalization from './components/personalization/Personalization'
import Progress from './components/Progress'
import SignUp from './components/SignUp'

const theme = createTheme({
    palette: {
        primary: {
            lightest: '#def1f2',
            lighter: '#addddc',
            light: '#addedd',
            main: '#36b3ae',
            dark: '#00857c',
            darker: '#00655c',
            darkest: '#004a40',
            contrastText: '#fbebef',
        },
        secondary: {
            light: '#fbebef',
            main: '#b3363a',
            dark: '#a22f31',
            contrastText: '',
        }
    },
    navMargin: {
        top: 65,
        left: 275,
    },
    /*typography: {
        fontFamily: {

        }
    }*/
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: '0.5s',
            // most basic recommended timing
            standard: '1s',
            // this is to be used in complex animations
            complex: 375,
            // recommended when something is entering screen
            enteringScreen: 225,
            // recommended when something is leaving screen
            leavingScreen: 195,
        },
    }
})

class App extends React.Component {

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    }}
                >
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>

                            {/* General */}
                            <Route path='/' element={<Home />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/exercises' element={<ExerciseDash />} />
                            <Route path='/exercises/:exercise' element={<ExerciseDash />} />
                            <Route path='/favorites' element={<Favorites />} />
                            <Route path='/help' element={<Help />} />
                            <Route path='/logIn' element={<LogIn />} />
                            <Route path='/me' element={<Me />} />
                            <Route path='/personalization' element={<Personalization />} />
                            <Route path='/progress' element={<Progress />} />
                            <Route path='/signUp' element={<SignUp /> } />

                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        )
    }
}

export default App