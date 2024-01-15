"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkModeReducer";

const rootReducer = combineReducers({
    darkMode: darkModeReducer,
    //add all your reducers here
},);

export const store = configureStore({
    reducer: rootReducer,
});

