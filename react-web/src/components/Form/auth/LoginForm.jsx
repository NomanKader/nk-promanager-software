import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Box, Typography, useMediaQuery, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import googleIcon from '../../../assets/icons/googleIcon.png';
import facebookIcon from '../../../assets/icons/facebookIcon.png';
import LoginAPI from '../../../api/Auth/LoginController.js';
import BackdropComponent from '../../Loading/BackDropComponent.jsx';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const history = useHistory();
  const [loading, setLoading] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }
    setLoading(true);
    try {
      const postBody = { email, password };
     await LoginAPI(postBody);
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false)
    }
  };

  const handleSignUp = () => {
    history.push('/auth?type=signUp');
  };

  const handleForgotPassword = () => {
    history.push('/auth?type=forgotPassword');
  };

  return (
    <Box
      sx={{
        width: '65%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: isMobile ? '20px' : '30px',
          fontWeight: '700',
          marginBottom: '20px',
        }}
      >
        Welcome Back 👋
      </Typography>

      {error && (
        <Typography
          sx={{
            color: 'red',
            fontSize: '14px',
            marginBottom: '10px',
            fontFamily: "'Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
          }}
        >
          {error}
        </Typography>
      )}

      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            width: '100%',
            height: 'auto',
          }}
        >
          <Box>
            <p
              style={{
                fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                fontSize: '16px',
              }}
            >
              Enter your Email
            </p>
            <TextField
              variant="outlined"
              placeholder="Example@gmail.com"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: '7px',
                  height: '40px',
                  caretColor: '#F98C6B',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF',
                  '&.Mui-focused fieldset': {
                    borderColor: '#F98C6B',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#000000',
                  fontFamily: "'Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                  fontWeight: '600',
                  fontSize: isMobile ? '10px' : '16px',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#F98C6B80',
                  opacity: 0.7,
                },
                '& .MuiInputBase-input:focus::placeholder': {
                  opacity: 0,
                },
              }}
            />
          </Box>

          <Box>
            <p
              style={{
                fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                fontSize: '16px',
              }}
            >
              Enter your Password
            </p>
            <TextField
              variant="outlined"
              placeholder="At least 8 characters"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                style: {
                  borderRadius: '7px',
                  height: '40px',
                  caretColor: '#F98C6B',
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        color: '#F98C6B',
                      }}
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF',
                  '&.Mui-focused fieldset': {
                    borderColor: '#F98C6B',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#000000',
                  fontFamily: "'Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                  fontWeight: '600',
                  fontSize: isMobile ? '10px' : '16px',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#F98C6B80',
                  opacity: 0.7,
                },
                '& .MuiInputBase-input:focus::placeholder': {
                  opacity: 0,
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember Me"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                  fontSize: isMobile ? '13px' : '15px',
                },
              }}
            />
          </FormGroup>

          <p
            style={{
              margin: '0',
              padding: '0',
              marginTop: isMobile ? '12px' : '7px',
              fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
              color: '#1E4AE9',
              fontSize: isMobile ? '13px' : '15px',
              cursor: 'pointer',
            }}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </p>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#F98C6B',
            color: '#111111',
            height: '35px',
            borderRadius: '5px',
            fontSize: isMobile ? '13px' : '16px',
            paddingX: '35px',
            textTransform: 'capitalize',
            marginTop: '20px',
            fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
            width: '100%',
            fontWeight: '400',
            '&:hover': {
              backgroundColor: '#F98C6B',
            },
          }}
        >
          Log in
        </Button>
      </form>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px"
        }}
      >
        <hr style={{ width: "40%", backgroundColor: "#F98C6B", height: "1px", border: "none" }} />
        <Typography
          sx={{
            color: "#656565",
            fontSize: "15px",
            fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
          }}
        >
          Or
        </Typography>
        <hr style={{ width: "40%", backgroundColor: "#F98C6B", height: "1px", border: "none" }} />
      </Box>

      <Box>
        <Button
          variant="contained"
          startIcon={
            <img
              src={googleIcon}
              alt="Google Icon"
              style={{
                width: "20px", // Adjust the width of the icon
                height: "20px", // Adjust the height of the icon
                marginRight: "8px", // Add some spacing between the icon and text
              }}
            />
          }
          sx={{
            backgroundColor: "#FFFFFF", // Button background color
            color: "#313957", // Button text color
            height: "35px", // Button height
            borderRadius: "5px", // Button border radius
            fontSize: isMobile ? "13px" : "16px", // Button font size
            paddingX: "35px",
            fontWeight: "400",
            textTransform: "capitalize",
            marginTop: "20px",
            fontFamily: "'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
            width: "100%",
            "&:hover": {
              backgroundColor: "#FFFFFF", // Hover background color
            },
          }}
        >
          Sign in with Google
        </Button>

        <Button
          variant="contained"
          startIcon={
            <img
              src={facebookIcon}
              alt="Facebook Icon"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "8px",
              }}
            />
          }
          sx={{
            backgroundColor: "#FFFFFF", // Button background color
            color: "#313957", // Button text color
            height: "35px", // Button height
            borderRadius: "5px", // Button border radius
            fontSize: isMobile ? "13px" : "16px", // Button font size
            paddingX: "35px",
            fontWeight: "400",
            textTransform: "capitalize",
            marginTop: "20px",
            fontFamily: "'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
            width: "100%",

            "&:hover": {
              backgroundColor: "#FFFFFF", // Hover background color

            },
          }}
        >
          Sign in with Facebook
        </Button>
      </Box>

      <Box
        sx={{
          width: '100%',
          textAlign: "center",
          marginTop: '25px'
        }}
      >
        Don't you have an account? <a href=""
          onClick={handleSignUp}
          style={{ textDecoration: 'none' }}>Sign Up</a>
      </Box>
      <BackdropComponent open={loading}/>
    </Box>
  );
};

export default LoginForm;
