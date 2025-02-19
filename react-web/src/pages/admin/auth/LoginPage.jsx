import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import CopyrightComponent from "../../../components/Copyright/CopyrightComponent";
import theme from "../../../theme";
import BackdropComponent from "../../../components/Loading/BackDropComponent";
import LoginAPI from "../../../api/Auth/LoginController";
import logo from '../../../assets/images/logo.jpg';
import { _EncryptService } from "../../../service/EncryptDecryptService";
import {toast} from 'react-toastify';

export default function LoginPage({ history }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postBody = { email: email, password: _EncryptService(password) };

    setLoading(true);
    try {
      await LoginAPI(postBody,toast);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

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
            backgroundImage: `url(${logo})`,
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
            <Lock sx={{ fontSize: 50, color: theme.palette.primary.main }} />
            <Typography component="h1" variant="h5" mt={2}>
              Welcome Back
            </Typography>
            <Typography>
              Sign in to admin dashboard
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  height: '35px',
                  borderRadius: '5px',
                  fontSize: '16px',
                  paddingX: '35px',
                  textTransform: 'capitalize',
                  marginTop: '20px',
                  fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                  width: '100%',
                  fontWeight: '400',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                disabled={!email || !password} // Disable if email or password is empty
              >
                Sign In
              </Button>
              <Box sx={{ mt: 5 }}>
                <Typography textAlign="center" variant="body2">
                  Privacy Policy | Cookie Policy | Terms of Use
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <CopyrightComponent />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <BackdropComponent open={loading} />
    </ThemeProvider>
  );
}
