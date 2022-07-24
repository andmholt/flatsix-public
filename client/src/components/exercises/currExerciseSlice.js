import { createSlice } from '@reduxjs/toolkit'

// holds the current exercise. Null if no current exercise
export const currExerciseSlice = createSlice({
    name: 'currExercise',
    initialState: null,
    reducers: {
        set: (state, exercise) => {
            return exercise
        },
    },
})

export const { set } = currExerciseSlice.actions

export default currExerciseSlice.reducer