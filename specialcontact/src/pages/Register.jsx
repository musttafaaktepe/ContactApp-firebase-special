import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  afterRegister,
  registerInformation,
} from "../redux/features/registerSlice";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerInfo = useSelector((state) => state.registerInfo);

  const { firstName, lastName, email, password } = useSelector(
    (state) => state.registerInfo
  );

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function Copyright(props) {
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
  }

  const theme = createTheme();

  const handleSubmit = async (event) => {
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
    if (!emailError && !passwordError) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(auth.currentUser);
        await updateProfile(auth.currentUser, {
          displayName: `${firstName} ${lastName}`,
        });
        alert("signup");
        dispatch(afterRegister());
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  console.log(firstName, lastName, email, password);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) =>
                    dispatch(
                      registerInformation({
                        ...registerInfo,
                        firstName: e.target.value,
                      })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) =>
                    dispatch(
                      registerInformation({
                        ...registerInfo,
                        lastName: e.target.value,
                      })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) =>
                    dispatch(
                      registerInformation({
                        ...registerInfo,
                        email: e.target.value,
                      })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) =>
                    dispatch(
                      registerInformation({
                        ...registerInfo,
                        password: e.target.value,
                      })
                    )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  sx={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={() => navigate("/")}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
