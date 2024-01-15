"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkModeReducer";
import { loadState } from "./browser";

const rootReducer = combineReducers({
    darkMode: darkModeReducer,
    //add all your reducers here
},);

export const store = configureStore({
    // devTools: true,
    reducer: rootReducer,
    // preloadedState: loadState(),
});

