import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/Form/auth/LoginForm.jsx';
import { Box, useMediaQuery } from '@mui/material';
import authLogo from '../../assets/images/authLogo.png';
import ForgotpasswordForm from '../../components/Form/auth/ForgotpasswordForm.jsx';
import OneTimePasswordForm from '../../components/Form/auth/OneTimePasswordForm.jsx';
import ResetPassword from '../../components/Form/auth/ResetPassword.jsx';
import SignUpForm from '../../components/Form/auth/SignUpForm.jsx';
import UpdatePassword from './../../components/Form/auth/UpdatePassword';

const AuthPage = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const authType = queryParams.get('type');
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F98C6B80",
        display: "flex",
      }}
    >
      {
        !(isMobile || authType === 'signUp') && (
          <Box
            sx={{
              width: "50%",
              backgroundImage: `url(${authLogo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )
      }


      <Box
        sx={{
          width: (isMobile || authType === 'signUp') ? "100%" :  "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {authType === 'logIn' && <LoginForm />}
        {authType === 'forgotPassword' && <ForgotpasswordForm />}
        {authType === 'OTP' && <OneTimePasswordForm />}
        {authType === 'resetPassword' && <ResetPassword />}
        {authType === 'updatePassword' && <UpdatePassword />}
        {authType === 'signUp' && <SignUpForm/>}
      </Box>
    </Box>
  );
};

export default AuthPage;
