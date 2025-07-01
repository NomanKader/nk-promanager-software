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
import logo from "../../../assets/icons/logo.png";
import { _EncryptService } from "../../../service/EncryptDecryptService";
import { toast } from "react-toastify";
import Footer from "../../../components/Footer/Footer";
import bgImage from "../../../assets/images/bgImage.png";

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
      await LoginAPI(postBody, toast);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
  sx={{
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    px: 2,
    backdropFilter: "blur(4px)",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // optional overlay
  }}
>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 420,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          {/* Logo instead of lock icon */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 80,
              height: 80,
              mb: 2,
            }}
          />

          <Typography component="h1" variant="h5" mt={1}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Sign in to ProManager Software
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ width: "100%" }}
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
                mt: 2,
                mb: 2,
                height: 40,
                textTransform: "capitalize",
                fontWeight: 600,
              }}
              disabled={!email || !password}
              onClick={()=>history.push("/admin/manage")}
            >
              Sign In
            </Button>

            <Typography
              textAlign="center"
              variant="body2"
              color="text.secondary"
              mt={2}
            >
              Privacy Policy | Cookie Policy | Terms of Use
            </Typography>
            <Box mt={1}>
              <CopyrightComponent />
            </Box>
          </Box>
        </Paper>
      </Box>

      <BackdropComponent open={loading} />
      <Footer/>
    </ThemeProvider>
  );
}
