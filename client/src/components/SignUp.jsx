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

import { signUp } from '../services/auth'

import SimpleTopBar from './layout/SimpleTopBar'

function SignUp(props) {

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

    const nameRef = React.useRef('')
    const usernameRef = React.useRef('')
    const emailRef = React.useRef('')
    const passwordRef = React.useRef('')
    const confirmPasswordRef = React.useRef('')

    // submit SignUp data
    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            name: nameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        // attempt user sign up
        try {
            await signUp(userData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <SimpleTopBar />
            <Container>
                <Paper>

                    {/* Title */}
                    <Title variant='h3'>
                        Sign Up
                    </Title>
                    <Divider />
                    <SpacerSmall />

                    {/* SignUp Form */}
                    <form onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                        <FormControl>
                            <TextField
                                variant='outlined'
                                label='Name'
                                inputProps={{sx: {color: 'primary.darkest'}}}
                                inputRef={nameRef}
                            />
                        </FormControl>
                        <SpacerSmall />
                        <FormControl>
                            <TextField
                                variant='outlined'
                                label='Username'
                                inputProps={{sx: {color: 'primary.darkest'}}}
                                inputRef={usernameRef}
                            />
                        </FormControl>
                        <SpacerSmall />
                        <FormControl>
                            <TextField
                                variant='outlined'
                                label='Email'
                                inputProps={{sx: {color: 'primary.darkest'}}}
                                inputRef={emailRef}
                            />
                        </FormControl>
                        <SpacerSmall />
                        <FormControl>
                            <TextField
                                variant='outlined'
                                label='Password'
                                inputProps={{sx: {color: 'primary.darkest'}}}
                                inputRef={passwordRef}
                                type='password'
                            />
                        </FormControl>
                        <SpacerSmall />
                        <FormControl>
                            <TextField
                                variant='outlined'
                                label='Confirm Password'
                                inputProps={{sx: {color: 'primary.darkest'}}}
                                inputRef={confirmPasswordRef}
                                type='password'
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

export default SignUp