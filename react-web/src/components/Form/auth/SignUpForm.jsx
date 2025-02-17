import React, { useState } from 'react';
import backgroundImage from '../../../assets/images/SignUpbackground.png';
import { Box, useMediaQuery, Button, Link } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CustomTextField from './../../TextField/CustomTextField';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RegisterAPI from './../../../api/Auth/RegisterController';
import BackdropComponent from '../../Loading/BackDropComponent';
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [township, setTownship] = useState('Yangon');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    history.push('/auth?type=logIn');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');      
      return;
    }
    setLoading(true);
    try {
      const payload = {
        userName: userName,
        userRole : "User",
        email: email,
        phoneNumber: phoneNumber,
        password: confirmPassword,
        Township: township,
        Address: address,
        businessName: "Candy & Peach"
      };

      await RegisterAPI(payload);       
    } catch {
      toast.error('An error occurred during registration. Please try again.');      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: isMobile ? '' : `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: isMobile ? '100%' : '50%',
          backgroundColor: isMobile ? '##FCC5B5' : '#FFFFFF',
          borderRadius: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingY: '50px',
        }}
      >
        <p
          style={{
            fontFamily: "'Amiko',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '500',
            color: '#333333',
            padding: '0',
            margin: '0',
          }}
        >
          Sign Up
        </p>

        <p
          style={{
            fontFamily: "'Arimo',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
            fontSize: isMobile ? '10px' : '13px',
          }}
        >
          If you already have an account, you can{' '}
          <Link style={{ textDecoration: 'none', color: '#1E4AE9' }} onClick={handleLogin}>
            Login Here
          </Link>
        </p>

        {/* Form Starts */}
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: '0 auto', // Centers the form
            }}
          >
            <CustomTextField
              label="Email"
              placeholder="Enter your email address"
              icon={<EmailOutlinedIcon />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <CustomTextField
              label="Username"
              placeholder="Enter your user name"
              icon={<PermIdentityOutlinedIcon />}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />

            <CustomTextField
              label="Phone Number"
              placeholder="Enter your phone number"
              icon={<LocalPhoneOutlinedIcon />}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Box>

          <FormControl
            sx={{
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: '0 auto', // Centers the form
            }}
          >
            <RadioGroup
              row
              value={township}
              onChange={(e) => setTownship(e.target.value)}
              sx={{
                display: 'flex',
                width: '100%',
                gap: '20px',
                justifyContent: 'center',
              }}
            >
              <FormControlLabel
                value="Yangon"
                control={
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: '#FA987A',
                      },
                    }}
                  />
                }
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: isMobile ? '10px' : '15px',
                  },
                }}
                label="Yangon"
              />
              <FormControlLabel
                value="Other Townships"
                control={
                  <Radio
                    sx={{
                      '&.Mui-checked': {
                        color: '#FA987A',
                      },
                    }}
                  />
                }
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: isMobile ? '10px' : '15px',
                  },
                }}
                label="Other Townships"
              />
            </RadioGroup>
          </FormControl>

          <Box
            sx={{
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: '0 auto', // Centers the form
            }}
          >
            <CustomTextField
              label="Address"
              placeholder="Enter your address"
              icon={<FmdGoodOutlinedIcon />}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <CustomTextField
              label="Password"
              placeholder="Enter your password"
              icon={<LockOutlinedIcon />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPassword={true}
              required
            />

            <CustomTextField
              label="Confirm Password"
              placeholder="Confirm your password"
              icon={<LockOutlinedIcon />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isPassword={true}
              required
              error={password !== confirmPassword} // Highlights the field in red if passwords don't match
              helperText={
                password !== confirmPassword && confirmPassword !== ''
                  ? 'Passwords do not match'
                  : ''
              }
            />

          </Box>



          <Button
            type="submit" // Enables form submission
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
              width: '60%',
              fontWeight: '400',              
              '&:hover': {
                backgroundColor: '#F98C6B',
              },
            }}
          >
            Register
          </Button>
        </form>
        {/* Form Ends */}
      </Box>
      <BackdropComponent open={loading}/>
    </Box>
  );
};

export default SignUpForm;
