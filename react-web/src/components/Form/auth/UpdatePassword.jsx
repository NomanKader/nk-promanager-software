import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Box, Typography, useMediaQuery, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import theme from '../../../theme.js';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const UpdatePassword = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowComfirmPassword = () => {
    setShowComfirmPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: isMobile? "65%" : "50%",
        disply: "flex",
        flexDirection: "column"
      }}
    >
      <Typography variant="h6" sx={{
        fontSize: isMobile?  "20px" : "30px",
        fontWeight: "700",
      }}>
        Set New Password
      </Typography>
      <p
        style={{
          fontFamily: "'Arial', 'Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
          fontSize: isMobile? "10px" : "13.5px",
          marginTop: "3px",
          lineHeight: '2',
          padding: "0",
          fontWeight:"300"
        }}
      >
        Create a new password and ensure it differs from <br/> previous one for security
      </p>

      

        <Box>
          <p
            style={{
              fontFamily: "'Amiko',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
              fontSize: "16px"
            }}
          >
            Enter your New Password
          </p>
          <TextField
            variant="outlined"
            placeholder="At least 8 characters"
            fullWidth
            type={showPassword ? 'text' : 'password'} // Toggle between password and text
            InputProps={{
              style: {

                borderRadius: '7px',
                height: '40px',
                caretColor: '#F98C6B', // Set the cursor color to pink
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{
                      color: "#F98C6B", // Set the color of the icon to match the theme
                    }}
                  >
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF", // Default background color
                "&.Mui-focused fieldset": {
                  borderColor: "#F98C6B", // Border color when focused
                },
              },
              "& .MuiInputBase-input": {
                color: "#000000", // Text color for user input
                fontFamily: "'Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                fontWeight: "600",
                fontSize: isMobile ? '10px' : "16px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#F98C6B80", // Placeholder color
                opacity: 0.7, // Default placeholder visibility
              },
              "& .MuiInputBase-input:focus::placeholder": {
                opacity: 0, // Hide placeholder when focused
              },
            }}
          />
        </Box>
        
        <Box>
          <p
            style={{
              fontFamily: "'Amiko',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
              fontSize: "16px"
            }}
          >
            Confirm your New Password
          </p>
          <TextField
            variant="outlined"
            placeholder="At least 8 characters"
            fullWidth
            type={showComfirmPassword ? 'text' : 'password'} // Toggle between password and text
            InputProps={{
              style: {

                borderRadius: '7px',
                height: '40px',
                caretColor: '#F98C6B', // Set the cursor color to pink
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowComfirmPassword}
                    edge="end"
                    sx={{
                      color: "#F98C6B", // Set the color of the icon to match the theme
                    }}
                  >
                    {showComfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF", // Default background color
                "&.Mui-focused fieldset": {
                  borderColor: "#F98C6B", // Border color when focused
                },
              },
              "& .MuiInputBase-input": {
                color: "#000000", // Text color for user input
                fontFamily: "'Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                fontWeight: "600",
                fontSize: isMobile ? '10px' : "16px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#F98C6B80", // Placeholder color
                opacity: 0.7, // Default placeholder visibility
              },
              "& .MuiInputBase-input:focus::placeholder": {
                opacity: 0, // Hide placeholder when focused
              },
            }}
          />
        </Box>

        <Button
        variant="contained"
        sx={{
          backgroundColor: "#F98C6B",
          color: "#111111", 
          height: "40px", 
          borderRadius: "5px", 
          fontSize: isMobile ? '13px' : "16px",
          paddingX: "35px",
          textTransform: "capitalize",
          marginTop: "20px",
          fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
          width: "100%",
          fontWeight: "400",
          fontSize: "16px",
          "&:hover": {
            backgroundColor: "#F98C6B", 
          },
        }}
      >
        Update Password
      </Button>
    </Box>
  )
}

export default UpdatePassword
