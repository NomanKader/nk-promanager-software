import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import theme from '../../../theme';

const ContactUsContactInformation = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: "90%",
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: isMobile ? '20px' : '0', // Add spacing between boxes on mobile
      }}
    >
      <Box
        sx={{
          width: isMobile ? '100%' : '40%', // Full width on mobile
          height: "auto",
          paddingY: "20px",
          paddingX: isMobile? '5px' : "30px",
          borderRadius: "15px",
          backgroundColor: theme.palette.Card.main,
          textAlign: isMobile ? 'center' : 'left', // Center text on mobile
        }}
      >
        <p styled={{}}>Email Us</p>
        <p
          style={{
            lineHeight: "2",
            fontSize: isMobile ? "10px" : "16px",
          }}
        >
          Got a question or feedback? Drop us a line,<br /> we’ll get back to you within 24-48 hours.<br />Email: candypeachlocal@gmail.com
        </p>
      </Box>

      <Box
        sx={{
          width: isMobile ? '100%' : '40%', // Full width on mobile
          height: "auto",
          paddingY: "20px",
          paddingX: isMobile? '5px' : "30px",
          borderRadius: "15px",
          border: `1.5px solid ${theme.palette.Card.main}`,
          textAlign: isMobile ? 'center' : 'left', // Center text on mobile
        }}
      >
        <p style={{ padding: 0, marginBottom: 0,  }}>Call Us</p>
        <p
          style={{
            lineHeight: "2",
            padding: 0,
            margin: 0,
            fontSize: isMobile ? "10px" : "16px",
          }}
        >
          Prefer to speak directly to someone? Our <br /> customer service
          team is available during <br /> business hours to assist our customer.<br />Phone Number: + 95 9 969 621206
        </p>
      </Box>
    </Box>
  );
};

export default ContactUsContactInformation;
