import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material';
import theme from '../../../theme';

function IntroComponent() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        width: isMobile? "100%" : "69%",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: isMobile ? "15px" : "25px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
        }}
      >
        Contact Us
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: isMobile ? "10px" : "16px",
          lineHeight: isMobile ? 2.5 : 2.5,
          fontFamily: `'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
          fontWeight: 400,
          color: theme.palette.text.secondary,
        }}
      >
        We’d love to hear from you! Whether you have questions about our products, need assistance with your order, or just want to learn more about our brand, our team is here to help. Our customers’ satisfaction is our top priority, and we strive to respond to all inquiries promptly.

      </Typography>
    </Box>
  )
}

export default IntroComponent