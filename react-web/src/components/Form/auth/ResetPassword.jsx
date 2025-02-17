import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery, Button, Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import successIcon from '../../../assets/icons/SuccessIcon.png'

const ResetPassword = () => {

  const isMobile = useMediaQuery('(max-width:600px)');
  const history = useHistory();

  const handleSetNewPassword = () => {
    history.push('/auth?type=updatePassword');
  }
  return (
    <Box
      sx={{
        width: isMobile? "65%" : "45%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <img src={successIcon} alt="successIcon" style={{
        width: "70px",
        height: "70px",
        marginBottom: "20px"
      }} />
      <Typography variant="h6" sx={{
        fontSize: isMobile?  "20px" : "30px",
        fontWeight: "700",
      }}>
        Password Reset
      </Typography>

      <p
        style={{
          fontFamily: "'Arial', 'Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
          fontSize: isMobile? "10px" : "13.5px",
          marginTop: "3px",
          lineHeight: '2',
          padding: "0",
          fontWeight:"200"
        }}
      >
        Your password has been successfully reset.<br/> Click confirm to set a new password
      </p>

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
        onClick={handleSetNewPassword}
      >
        Verify
      </Button>
    </Box>
  )
}

export default ResetPassword
