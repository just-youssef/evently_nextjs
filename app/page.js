"use client";

import { clearToken } from "@lib/features/tokenReducer";
import { Box, Button, Stack, Typography } from "@mui/material"
import jwt from "jsonwebtoken";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const token = useSelector((state) => state.userToken.value);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const router = useRouter();
  
  const logout = () => {
    dispatch(clearToken())
    router.push('/')
  }

  const fetchUser = async (token) => {
    try {
      const { userID } = jwt.decode(token);

      const res = await fetch(`http://localhost:8000/api/user/${userID}`, {
        method: "GET",
        headers: {
          "x-auth-token": token
        }
      });

      const data = await res.json();
      setUser(data);

      return data
    } catch (error) {
      console.log(error);
    }
  }

  if (token) {
    // get user details
    fetchUser(token);

    return (
      <Stack
        direction="column"
        p={4} my={8} bgcolor='background.paper'
        border={1} borderRadius={1} borderColor="grey.600"
        alignItems="center" boxShadow={8}
        width={{ sm: 2/3, md: 1/2, lg: 1/3 }} mx={{ xs: 2, sm: "auto" }}
      >
        <Typography fontSize={25}>welcome {user?.username}</Typography>
        <Typography fontSize={15} color="text.secondary">{user?.email}</Typography>
        <Button
          size="large"
          sx={{ px: { md: 5 }, mt: 4 }}
          variant="contained"
          onClick={logout}
        >
          Logout
        </Button>
      </Stack>
    )
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 4,
        my: 8,
        bgcolor: 'background.paper',
        border: 1,
        borderRadius: 1,
        borderColor: "grey.600",
        justifyContent: 'space-evenly',
        width: { sm: 2/3, md: 1/2, lg: 1/3 },
        mx: { xs: 2, sm: "auto" },
        boxShadow: 8
      }}
    >
      <Link href="/login">
        <Button
          size="large"
          sx={{ px: { md: 5 } }}
          variant="contained"
        >
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button
          size="large"
          sx={{ px: { md: 5 } }}
          variant="outlined"
        >
          Register
        </Button>
      </Link>
    </Box>
  )
}

export default Home