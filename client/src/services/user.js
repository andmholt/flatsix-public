import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })

// axios interceptor
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token)
        config.headers.common['X-Auth-Token'] = token
    return config
})

// set preferences
const setPreferences = async (newPreferences) => {
    try {
        const res = await API.post(
            '/api/user/setPreferences',
            newPreferences,
        )
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export {
    setPreferences,
}