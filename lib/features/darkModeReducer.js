import { createSlice } from "@reduxjs/toolkit"

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: { value: false },
    reducers: {
        toggleDarkMode: (state) => {
            state.value = !state.value
        },
    },
})

// Extract and export each action creator by name
export const { toggleDarkMode } = darkModeSlice?.actions
// Export the reducer, either as a default or named export
export default darkModeSlice?.reducer