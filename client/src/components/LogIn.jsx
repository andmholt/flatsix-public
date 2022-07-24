import React from 'react'
import {
    Button,
    Container as MuiContainer,
    Divider,
    FormControl,
    Paper as MuiPaper,
    styled,
    TextField,
    Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { logIn } from '../services/auth'
import SimpleTopBar from './layout/SimpleTopBar'

function LogIn(props) {

    const navigate = useNavigate()

    const Container = styled(MuiContainer)(({theme}) => ({
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(15)
    }))

    const Paper = styled(MuiPaper)(({theme}) => ({
        backgroundColor: theme.palette.primary.light,
        width: theme.spacing(45),

        padding: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }))

    const Spacer = styled('div')(({theme}) => ({
        height: theme.spacing(5)
    }))

    const SpacerSmall = styled('div')(({theme}) => ({
        height: theme.spacing(3)
    }))

    const Title = styled(Typography)(({theme}) => ({
        color: theme.palette.primary.darkest,
    }))

    const emailRef = React.createRef('')
    const passwordRef = React.createRef('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        // attempt user log in
        try {
            const res = await logIn(userData)
            // if accessToken returned, save to local storage and go to home
            if (res.data.token) {
                localStorage.setItem('authToken', res.data.token)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <SimpleTopBar />
            <Container>
                <Paper>
                    <Title variant='h3'>
                        Log In
                    </Title>
                    <Divider />
                    <SpacerSmall />
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <FormControl variant='standard'>
                            <TextField
                                variant='outlined'
                                label='Email'
                                type='email'
                                inputProps={{sx: {color: 'primary.darkest'}}}
                                inputRef={emailRef}
                            />
                        </FormControl>
                        <SpacerSmall />
                        <FormControl>
                            <TextField
                                variant='outlined'
                                label='Password'
                                type='password'
                                inputProps={{sx: {color: 'primary.darkest'}}}
                                inputRef={passwordRef}
                            />
                        </FormControl>
                        <SpacerSmall />
                        <Button
                            variant='contained'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default LogIn