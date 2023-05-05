import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyObjExerciseRegimes, ObjExerciseRegimesInfo } from "../types/stateTypes";



//storing of exercise regime info so we don't send the request multiple times
const exerciseDataSlice = createSlice({
    name: 'exerciseData',
    initialState: {
        exerciseRegimesInfo: emptyObjExerciseRegimes
    },
    reducers: {
        setExerciseRegimesInfo: (state, action: PayloadAction<ObjExerciseRegimesInfo>) => {
            console.log(action.payload);
            state.exerciseRegimesInfo = action.payload;
        }
    }
})

export const exerciseDataActions = exerciseDataSlice.actions;

export default exerciseDataSlice;