import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material';
import theme from './../../../theme';
import { styled } from '@mui/material/styles';

const MapComponent = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: isMobile ? "10px" : "20px",
      }}
    >
      <Typography
        variant='p'
        sx={{
          fontFamily: `'Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
          fontWeight: 700,
          fontSize: isMobile ? "14px" : "18px", // Adjust font size for mobile
          textAlign: "center",
        }}
      >
        “Visit our Stores! We can’t wait to welcome you!”
      </Typography>

      <div style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: isMobile? "auto" : "400px",
        marginTop: "20px",
        borderRadius: "25px"
      }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.4640685682666!2d96.12914161077595!3d16.803318683920896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ebe3bacace09%3A0x822d67502208718e!2sCandy%20%26%20Peach!5e0!3m2!1sen!2sau!4v1732853354456!5m2!1sen!2sau"
          width="85%"
          height= {isMobile ? "300px" :"100%"}
          frameBorder="0"
          style={{
            border: 0,
            borderRadius: "15px", 
            overflow: "hidden", 
          }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          title="Google Map"
        />

      </div>

    </Box>
  )
}

export default MapComponent
