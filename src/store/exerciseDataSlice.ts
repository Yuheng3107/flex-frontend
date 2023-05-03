import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyExerciseStats } from "../types/stateTypes";


export interface ExerciseRegimeInfo {
    exercises: any[];
    id: 0;
    likers: [];
    media: "";
    name: "";
    posted_at: "";
    poster: 0;
    shared_id: 0;
    shared_type: 0;
    tags: [];
    text: "";
    times_completed: 0

}

export interface ObjExerciseRegimesInfo {
    [key: string]: {
        exercises: any[];
        id: 0;
        likers: [];
        media: "";
        name: "";
        posted_at: "";
        poster: 0;
        shared_id: 0;
        shared_type: 0;
        tags: [];
        text: "";
        times_completed: 0
    }
}

export const emptyExerciseRegime: ExerciseRegimeInfo = {
    exercises: [],
    id: 0,
    likers: [],
    media: "",
    name: "",
    posted_at: "",
    poster: 0,
    shared_id: 0,
    shared_type: 0,
    tags: [],
    text: "",
    times_completed: 0
}

const emptyObjExerciseRegimes: ObjExerciseRegimesInfo = {
    0: emptyExerciseRegime
}
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