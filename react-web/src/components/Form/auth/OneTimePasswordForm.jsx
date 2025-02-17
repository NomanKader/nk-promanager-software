import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery, Button, Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';

const OneTimePasswordForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0); 
  const isMobile = useMediaQuery('(max-width:600px)');
  const history = useHistory();


  useEffect(() => {
    const inputElements = document.querySelectorAll('input');
    if (inputElements[focusedIndex]) {
      inputElements[focusedIndex].focus(); 
    }
  }, [focusedIndex]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.length <= 1 && !isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1 && value !== '') {
        setFocusedIndex(index + 1);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        setFocusedIndex(index - 1); 
      }
    }
  };

  const handleOPTSuccess = () => {
    history.push('/auth?type=resetPassword');
  };

  return (
    <Box
      sx={{
        width: isMobile? "70%" : "65%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography variant="h6" sx={{
        fontSize: isMobile?  "20px" : "30px",
        fontWeight: "700",
      }}>
        Enter code
      </Typography>

      <p
        style={{
          fontFamily: "'Biryani', 'Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
          fontSize: isMobile? "10px" : "13.5px",
          marginTop: "3px",
          padding: "0"
        }}
      >
        We have sent OTP Code to your email
      </p>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
      }}>
        <Grid container spacing={1}>
          {otp.map((digit, index) => (
            <Grid item key={index}>
              <TextField
                value={digit} 
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    width: isMobile? "5px" : '25px', 
                    height: isMobile? "10px" : '30px',
                    textAlign: 'center',
                    fontSize: '20px',
                    margin: isMobile? '0 2px' :  '0 5px',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderWidth: '2px',
                      borderColor: focusedIndex === index ? '#000000' : '#FF784F',
                      borderRadius: '15px'
                    },
                    '&:hover fieldset': {
                      borderColor: '#000000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000000',
                    },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#F98C6B",
          color: "#111111", 
          height:  "40px", 
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
        onClick={handleOPTSuccess}
      >
        Verify
      </Button>
    </Box>
  );
};

export default OneTimePasswordForm;
