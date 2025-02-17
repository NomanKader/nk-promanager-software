import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import logo from '../../assets/icons/logo.png'
import theme from '../../theme';
import homeIcon from '../../assets/icons/homeIcon.png'
import aboutUsIcon from '../../assets/icons/aboutUsIcon.png'
import contactUsIcon from '../../assets/icons/contactUsIcon.png'
import catagoriesIcon from '../../assets/icons/catagoriesIcon.png'
import accountIcon from '../../assets/icons/accountIcon.png'
import UserNavbarSliderMenuItems from './UserNavbarSliderMenuItems';
import UserAccountState from './UserAccountState';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import bracketIcon from '../../assets/icons/bracketIcon.png'


function UserNavbarComponent({ history }) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountState, setAccountState] = useState(false);

  const menuItems = [
    { label: "Home", icon: homeIcon, route: '/' },
    { label: "About Us", icon: aboutUsIcon, route: '/aboutUs' },
    { label: "Contact Us", icon: contactUsIcon, route: '/contactUs' },
    { label: "Categories", icon: catagoriesIcon, route: '/categories' },
    { label: "Log in / Sign Up", icon: {accountIcon,bracketIcon }, route: '/auth?type=logIn' },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem('token'); 
    if (token) {
      setAccountState(true); 
    }
  }, []);
  

  return (
      <AppBar 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          paddingX: isMobile ? '4%' : '',
          backgroundColor: theme.homePage.navbar,
          boxShadow: 'none',
          position: isMobile? "sticky" : "static"
        }}
      >
        <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: isMobile ? 'space-between' : 'center', }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: 'auto', height: '7rem', cursor: 'pointer', marginRight: isMobile ? '' :'30px' }}
            onClick={() => history.push('/')}
          />

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)} >
                <FormatAlignRightIcon sx={{ color: '#000000' }} />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                PaperProps={{
                  sx: {
                    backgroundColor: theme.mobileDrawer.backgroundColor,
                    width: "100vw",
                    height: "auto", 
                    display: "flex",
                    paddingY: "10px",
                    justifyContent: "center",
                    alignItems: "center",

                  },
                }}
                onClose={() => setDrawerOpen(false)}
              >
                <UserNavbarSliderMenuItems menuItems={menuItems} history={history} setDrawerOpen={setDrawerOpen} />
              </Drawer>
            </>
          ) : (
            <Box
              id='navbar'
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '70%',
                gap: '8rem',
                marginLeft: '30px',
        
              }}>
              {menuItems.map((item, index) => (
                index !== menuItems.length - 1 ? (
                  <Typography
                    key={item.route}
                    className='navbarOption'
                    onClick={() => history.push(item.route)}
                    variant='p'
                  >
                    {item.label}
                  </Typography>
                ) : null
              ))}
              <UserAccountState
                accountState={accountState}
                setAccountState={setAccountState}
                renderingData={menuItems[menuItems.length - 1]}
                history= {history}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>

  
  );
}

export default UserNavbarComponent;
