"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkModeReducer";
import tokenReducer from "./features/tokenReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    darkMode: darkModeReducer,
    userToken: tokenReducer
    //add all your reducers here
},);

const presistConfig = {
    key: "root",
    storage,
    version: 1,
}
const persistedReducer = persistReducer(presistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store)

