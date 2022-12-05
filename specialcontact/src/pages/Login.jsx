import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "../assets/GoogleIcon";
import { useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { loginInfos } from "../redux/features/loginInfoSlice";
import { loginSuccess } from "../redux/features/loginInfoSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const loginInfo = useSelector((state)=>state.loginInfo)
  const {loginInformation, email, password} = loginInfo

  const Copyright = (props) => {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  const theme = createTheme();

  const handleSubmit =  async(event) => {
    event.preventDefault();
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(reg)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      alert("ınvalid email");
    }

    if (password.toString().length < 6) {
      setPasswordError(true);
      alert("min 6 ch");
    } else {
      setPasswordError(false);
    }

    if(!emailError && !passwordError){
      try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        dispatch(loginSuccess({...loginInfo, userInfo:user}))
        navigate("/home")
        alert("successfuly login")
      } catch (error) {
        console.log(error.message);
        alert("user not found")
        
      }
    }
    
  };
console.log(loginInfo);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e)=>{dispatch(loginInfos({...loginInfo, email:e.currentTarget.value}))}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{dispatch(loginInfos({...loginInfo, password:e.currentTarget.value}))}}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Button
                sx={{
                  marginTop: "1rem",
                  width: "100%",
                  textTransform: "initial",
                }}
                variant="contained"
              >
                <GoogleIcon color="currentColor" />
                Continue with Google
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link sx={{ cursor:"pointer" }} variant="body2" onClick={() => navigate("/register")}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
