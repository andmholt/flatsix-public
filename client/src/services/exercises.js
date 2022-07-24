import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })

// gets all exercises
const getExercises = async () => {
    try {
        const res = await API.get(
            '/api/exercises/get'
        )
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

// load exercise data given userID
const load = async (exercise) => {
    try {
        const res = await API.get(
            '/api/exercises/load/' + exercise,
        )
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export {
    getExercises,
    load,
}