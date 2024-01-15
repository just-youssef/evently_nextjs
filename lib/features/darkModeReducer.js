import { createSlice } from "@reduxjs/toolkit"

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: { value: true },
    reducers: {
        toggleDarkMode: (state) => {
            state.value = !state.value
            localStorage.setItem('darkMode', state.value)
            // console.log(localStorage.getItem('darkMode'));
            // setTimeout(()=>console.log(JSON.parse(localStorage.getItem('redux')).darkMode), 2000)
        },
        setDarkMode: (state, action) => {
            state.value = action.payload
        }
    },
})

// Extract and export each action creator by name
export const { toggleDarkMode, setDarkMode } = darkModeSlice?.actions
// Export the reducer, either as a default or named export
export default darkModeSlice?.reducer