import { configureStore } from "@reduxjs/toolkit";

import profileDataSlice from './profileDataSlice'
import exerciseStatsSlice from "./exerciseStatsSlice";
import exerciseDataSlice from "./exerciseDataSlice";

const store = configureStore({
    reducer: {
        profile: profileDataSlice.reducer,
        exerciseStats: exerciseStatsSlice.reducer,
        exerciseData: exerciseDataSlice.reducer,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;