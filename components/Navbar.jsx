"use client"

import { AppBar, Toolbar, Typography, Switch, IconButton } from '@mui/material';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import { useRouter } from "next/navigation";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { toggleDarkMode } from '@lib/features/darkModeReducer';
import { useDispatch, useSelector } from 'react-redux';


const Navbar = () => {
  const router = useRouter();
  const darkModeState = useSelector((state) => state.darkMode.value)
  const dispatch = useDispatch()

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="refresh"
          onClick={() => { router.push('/') }}
        >
          <AutoModeIcon />
        </IconButton>

        <Typography fontSize={{ xs: 20, sm: 25 }} component="div" sx={{ flexGrow: 1 }}>
          Navbar
        </Typography>

        <Switch
          color='secondary'
          inputProps={{ 'aria-label': 'Switch Color Mode' }}
          onChange={() => dispatch(toggleDarkMode())}
          checked={darkModeState}
        />

        <IconButton onClick={() => dispatch(toggleDarkMode())} color="inherit">
          {darkModeState ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar