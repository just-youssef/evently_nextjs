"use client"

import { createTheme } from '@mui/material/styles';
import { grey, blue} from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { setDarkMode } from '@lib/features/darkModeReducer';
import { useDispatch, useSelector } from 'react-redux';

const MUIThemeProvider = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const darkModeCache = localStorage.getItem("darkMode");
        if (darkModeCache) dispatch(setDarkMode(JSON.parse(darkModeCache)))
    }, [])

    const darkModeState = useSelector((state) => state.darkMode.value)
    const theme = createTheme({
        typography: {
            fontFamily: 'Cairo',
        },
        palette: {
            mode: darkModeState ? "dark" : "light",
            background: {
                paper: darkModeState ? grey[900] : grey[300],
                default: darkModeState ? "#121212" : grey[200],
            },
            divider: darkModeState ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        },
    });
  
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default MUIThemeProvider