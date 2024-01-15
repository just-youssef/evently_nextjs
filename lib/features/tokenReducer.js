import { createSlice } from "@reduxjs/toolkit"

const tokenSlice = createSlice({
    name: 'token',
    initialState: { value: "" },
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload
        },
        clearToken: (state) => {
            state.value = ""
        }
    },
})

// Extract and export each action creator by name
export const { setToken, clearToken } = tokenSlice?.actions
// Export the reducer, either as a default or named export
export default tokenSlice?.reducer