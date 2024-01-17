"use client"

import { Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useRouter, redirect } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@lib/features/tokenReducer";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState({ value: false, confirm: false });

  const [usernameError, setUsernameError] = useState({ value: false, msg: "" });
  const [emailError, setEmailError] = useState({ value: false, msg: "" });
  const [passwordError, setPasswordError] = useState({ value: false, msg: "" });
  const [confirmPasswordError, setConfirmPasswordError] = useState({ value: false, msg: "" });

  const token = useSelector((state) => state.userToken.value);
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    setUsernameError({ value: false, msg: "" });
    setEmailError({ value: false, msg: "" });
    setPasswordError({ value: false, msg: "" });
    setConfirmPasswordError({ value: false, msg: "" });

    try {
      const res = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword
        })
      });
      const data = await res.json();

      if (data.error) {
        if (data.error.username) setUsernameError({ value: true, msg: data.error.email })
        if (data.error.email) setEmailError({ value: true, msg: data.error.email })
        if (data.error.password) setPasswordError({ value: true, msg: data.error.password })
        if (data.error.confirmPassword) setConfirmPasswordError({ value: true, msg: data.error.confirmPassword })
      }

      if (res.status === 200) {
        dispatch(setToken(data.jwt))
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (token) redirect("/");

  return (
    <Stack
      component="form" onSubmit={handleRegister}
      direction="column" alignItems="center"
      px={{xs:2, sm:4}} py={6} my={8} gap={1}
      border={1} borderRadius={1} borderColor="grey.600"
      width={{ sm: 2 / 3, md: 1 / 2, lg: 1 / 3 }} mx={{ xs: 3, sm: "auto" }}
      bgcolor="background.paper" boxShadow={8}
    >
      <Typography fontSize={24} color="text.secondary">Register to Evently</Typography>
      <TextField
        id="username" label="Username" variant="outlined" fullWidth required error={usernameError.value} helperText={usernameError.msg}
        sx={{ mb: 1 }} placeholder="example_user26" onChange={e => setUser({ ...user, username: e.target.value })}
      />
      <TextField
        id="email" label="Email" variant="outlined" fullWidth required error={emailError.value} helperText={emailError.msg}
        sx={{ mb: 1 }} placeholder="user@example.com" onChange={e => setUser({ ...user, email: e.target.value })}
      />
      <TextField
        type={showPassword.value ? 'text' : 'password'} error={passwordError.value} helperText={passwordError.msg}
        onChange={e => setUser({ ...user, password: e.target.value })}
        InputProps={{
          endAdornment:
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword({ ...showPassword, value: !showPassword.value })}
              edge="end"
            >
              {showPassword.value ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        }}
        id="password" label="Password" variant="outlined" fullWidth required sx={{ mb: 1 }} />
      <TextField
        type={showPassword.confirm ? 'text' : 'password'} error={confirmPasswordError.value} helperText={confirmPasswordError.msg}
        onChange={e => setUser({ ...user, confirmPassword: e.target.value })}
        InputProps={{
          endAdornment:
            <IconButton
              aria-label="toggle confirm password visibility"
              onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
              edge="end"
            >
              {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        }}
        id="confirmPassword" label="Confirm Password" variant="outlined" fullWidth required sx={{ mb: 1 }} />

      <Button type="submit" variant="contained" size="large" fullWidth>Register</Button>
      <Typography color="text.secondary">Already have account?</Typography>
      <Button variant="outlined" size="large" onClick={() => router.push('/login')} fullWidth>Login</Button>
    </Stack>
  )
}

export default Register