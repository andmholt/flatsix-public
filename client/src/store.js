import { configureStore } from '@reduxjs/toolkit'

import currExerciseReducer from './components/exercises/currExerciseSlice'

export default configureStore({
    reducer: {
        currExercise: currExerciseReducer,
    },
})