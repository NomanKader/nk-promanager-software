import React from 'react'
import { Box, Typography, useMediaQuery, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ForgotpasswordForm = () => {

  const isMobile = useMediaQuery('(max-width:600px)');
  const history = useHistory();
  const handleOPT = () => {
    history.push('/auth?type=OTP')
  }
  return (
    <Box
      sx={{
        width: "65%",
        disply: "flex",
        flexDirection: "column"
      }}
    >
      <Typography variant="h6" sx={{
        fontSize: "30px",
        fontWeight: "700",
    
      }}>
        Forgot Password?
      </Typography>

      <p
        style={{
          fontFamily: "'Biryani',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
          fontSize: "13.5px",
          marginTop: "3px",
          padding: "0"
        }}
      >
        Please enter your email to reset the password
      </p>

      <Box sx={{marginTop: "30px"}}>
          <p
            style={{
              fontFamily: "'Amiko',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
              fontSize: "16px"
            }}
          >
            Enter your Email
          </p>
          <TextField
            variant="outlined"
            placeholder="Example@gmail.com"
            fullWidth
            InputProps={{
              style: {
                borderRadius: "7px",
                height: "45px",
                caretColor: "#F98C6B", // Set the cursor color to pink
              },
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
          backgroundColor: "#F98C6B", // Button background color
          color: "#111111", // Button text color
          height: "40px", // Button height
          borderRadius: "5px", // Button border radius
          fontSize: isMobile ? '13px' : "16px", // Button font size
          paddingX: "35px",
          textTransform: "capitalize",
          marginTop: "20px",
          fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
          width: "100%",
          fontWeight: "400",
          fontSize: "16px",
          "&:hover": {
            backgroundColor: "#F98C6B", // Hover background color
          },
        }}
        onClick={handleOPT}
      >
        Reset Password
      </Button>
    </Box>
  )
}

export default ForgotpasswordForm
