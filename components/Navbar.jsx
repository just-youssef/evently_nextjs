"use client"

import { Typography, IconButton, Button, Stack } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { useRouter } from "next/navigation";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { toggleDarkMode } from '@lib/features/darkModeReducer';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { clearToken } from '@lib/features/tokenReducer';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const router = useRouter();
  const darkModeState = useSelector((state) => state.darkMode.value)
  const dispatch = useDispatch()

  const token = useSelector((state) => state.userToken.value);

  const logout = () => {
    dispatch(clearToken())
    // router.push('/')
  }

  return (
    <Stack
      direction="row" alignItems="center" justifyContent="space-between"
      sx={{ px: 4, py: 1, boxShadow: 5, bgcolor: "background.paper" }}
    >
      <Stack
        direction="row"
        alignItems="center"
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="refresh"
          onClick={() => { router.push('/') }}
        >
          <EventIcon />
        </IconButton>

        <Typography
          fontSize={25}
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Evently
        </Typography>
      </Stack>

      <Stack direction="row" gap={1} alignItems="center">
        <IconButton onClick={() => dispatch(toggleDarkMode())} color="inherit">
          {darkModeState ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {
          token ?
            <>
            
              <Button
                variant="contained"
                onClick={() => router.push("/addEvent")}
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Add Event
              </Button>
              <Button variant="outlined" onClick={logout} sx={{display: {xs: 'none', sm: 'block'}}}>
                  Logout
              </Button>

              {/* mobile buttons */}
              <IconButton
                onClick={() => router.push("/addEvent")}
                sx={{ display: { sm: 'none' } }}
                color='primary'
              >
                <AddToPhotosIcon />
              </IconButton>
              <IconButton
                onClick={logout}
                sx={{ display: { sm: 'none' } }}
                color='inherit'
              >
                <LogoutIcon />
              </IconButton>
            </>
            : <>
              <Link href="/login">
                <Button variant="contained">
                  Login
                </Button>
              </Link>

              <Typography color="text.secondary">OR</Typography>

              <Link href="/register">
                <Button variant="outlined">
                  Register
                </Button>
              </Link>
            </>
        }
      </Stack>
    </Stack>
  );
}

export default Navbar