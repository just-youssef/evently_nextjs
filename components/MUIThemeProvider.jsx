"use client"

import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';

const MUIThemeProvider = ({ children }) => {
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