"use client";

import { setToken } from "@lib/features/tokenReducer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useRouter, redirect } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState({ value: false, msg: "" });
  const [passwordError, setPasswordError] = useState({ value: false, msg: "" });

  const token = useSelector((state) => state.userToken.value) || "";
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError({ value: false, msg: "" });
    setPasswordError({ value: false, msg: "" });

    try {
      const res = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      const data = await res.json();

      if (data.error) {
        if (data.error.email)
          setEmailError({ value: true, msg: data.error.email });
        if (data.error.password)
          setPasswordError({ value: true, msg: data.error.password });
      }

      if (res.status === 200) {
        dispatch(setToken(data.jwt))
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (token) redirect("/");

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 4,
        py: 6,
        my: 8,
        bgcolor: "background.paper",
        border: 1,
        borderRadius: 1,
        borderColor: "grey.600",
        alignItems: "center",
        width: { sm: 2 / 3, md: 1 / 2, lg: 1 / 3 },
        mx: { xs: 2, sm: "auto" },
        boxShadow: 8,
        gap: 1,
      }}
    >
      <Typography fontSize={24} color="text.secondary">
        Login to Evently
      </Typography>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        required
        error={emailError.value}
        helperText={emailError.msg}
        sx={{ mb: 1 }}
        placeholder="user@example.com"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <TextField
        type={showPassword ? "text" : "password"}
        error={passwordError.value}
        helperText={passwordError.msg}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((show) => !show)}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
        }}
        id="password"
        label="Password"
        variant="outlined"
        fullWidth
        required
        sx={{ mb: 1 }}
      />

      <Button type="submit" variant="contained" size="large" fullWidth>
        Login
      </Button>
      <Typography color="text.secondary">Don't have account?</Typography>
      <Button
        variant="outlined"
        size="large"
        onClick={() => router.push("/register")}
        fullWidth
      >
        Register
      </Button>
    </Box>
  );
};

export default Login;
