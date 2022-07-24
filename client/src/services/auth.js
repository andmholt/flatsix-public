import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })

// axios interceptor
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token)
        config.headers.common['X-Auth-Token'] = token
    return config
})

// handle load user
const load = async () => {
    try {
        const res = await API.get(
            '/api/auth/load',
        )
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

// handle user log in
const logIn = async ({email, password}) => {
    try {
        const res = await API.post(
            '/api/auth/logIn',
            {
                email: email,
                password: password,
            }
        )
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

// handle user sign up
const signUp = async ({name, username, email, password}) => {
    try {
        const res = await API.post(
            '/api/auth/signUp',
            {
                name: name,
                username: username,
                email: email,
                password: password,
            }
        )
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export {
    load,
    logIn,
    signUp,
}