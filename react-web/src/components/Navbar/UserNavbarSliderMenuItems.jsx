
import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/icons/logo.png';
import theme from '../../theme';

const UserNavbarSliderMenuItems = ({ menuItems, history, setDrawerOpen }) => (
  <Box
    sx={{
      width: '95vw',
      height: "403px",
      display: "flex",
      flexDirection: 'row',
      justifyContent: "center",
      boxSizing: "border-box"
    }}
  >
    <Box
      sx={{
        width: '70vw',
        height: "auto",
        borderTopLeftRadius: "20px",
        borderBottomLeftRadius: "20px",
        borderLeft: "1px solid #e6e6e6",
        borderTop: "1px solid #e6e6e6",
        borderBottom: "1px solid #e6e6e6",
        padding: "6px 0 0 6px",
        backgroundColor: "#ffffff"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px"
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: 'auto', height: '6rem', cursor: 'pointer' }}
        />
        <Typography
          variant='p'
          sx={{
            fontWeight: "700",
            fontsize: "20px",
            
          }}
        >
          Candy and Peach
        </Typography>
      </Box>

      <List>
        {menuItems.map((item, index) => {
          if (index === menuItems.length - 1) {

            const { accountIcon, bracketIcon, loveIcon } = item.icon;

            return (
              <ListItem
                key={item.route}
                sx={{
                  display: "flex",
                  height: "55px",
                  alignItems: "center",
                  gap: '10px',
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  history.push(item.route);
                  setDrawerOpen(false);
                }}
              >
                {/* Render individual icons for the last item */}
                <img
                  src={accountIcon}
                  alt="Account Icon"
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />
                <ListItemText primary={item.label} />
              </ListItem>
            );
          } else {
            // Default rendering for other items
            return (
              <ListItem
                key={item.route}
                sx={{
                  display: "flex",
                  height: "55px",
                  alignItems: "center",
                  gap: '10px',
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  history.push(item.route);
                  setDrawerOpen(false);
                }}
              >
                <img
                  src={item.icon}
                  alt={`${item.label} Icon`}
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />
                <ListItemText primary={item.label}/>
              </ListItem>
            );
          }
        })}
      </List>

    </Box>

    <Box
      sx={{
        width: "20%",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
      }}
    >
      <CloseIcon
        sx={{
          border: "1px solid #ffffff",
          padding: "4px",
          color: "#ffffff",
          marginTop: "10px",
        }}
        onClick={() => setDrawerOpen(false)}
      />
    </Box>
  </Box>
);

export default UserNavbarSliderMenuItems;
