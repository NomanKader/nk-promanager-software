// NotFoundPage.jsx
import React from 'react';
import { Box, Typography, Button, Container, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';
import theme from '../../theme';
const NotFoundPage = () => {  

  return (
    <ThemeProvider theme={theme}>
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: '150px',
          mb: 3,
        }}
      />

      {/* 404 Error Text */}
      <Typography
        variant="h1"
        sx={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: theme.palette.primary.main,
        }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>

      {/* Decorative Icon/Illustration */}
      <Box
        sx={{
          width: '80%',
          maxWidth: '400px',
          height: '2px',
          backgroundColor: theme.palette.primary.main,
          my: 4,
        }}
      />

      {/* Go Home Button */}
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="secondary"
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: '25px',
          fontSize: '1rem',
          textTransform: 'none',
          boxShadow: `0px 4px 12px ${theme.palette.secondary.main}30`,
        }}
      >
        Go to Homepage
      </Button>
    </Container>
    </ThemeProvider>
  );
};

export default NotFoundPage;
