import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  DialogActions,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@emotion/react";
import ProfileDialogComponent from "../Dialog/user/ProfileDialogComponent";
import theme from "../../theme";
import Logo from "../../assets/images/logo.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "../../assets/icons/dashboardIcon.png";
import LogoutIcon from "../../assets/icons/logoutIcon.png";
import ProductIcon from "../../assets/icons/listingIcon.png";
import CategoryIcon from "../../assets/icons/listingIcon.png";
import BusinessIcon from "../../assets/icons/listingIcon.png";
import OrderIcon from "../../assets/icons/orderIcon.png";
import AccountIcon from "../../assets/icons/accountIcon.png";

import DashboardPage from "../../pages/admin/dashboard/DashboardPage";
import AccountManagementPage from "../../pages/admin/account/AccountManagePage";
import ProductPage from "../../pages/admin/product/ProductPage";

import _LogoutService from "../../service/LogoutService";
import { _AdminAuthorizeService } from "../../service/AuthorizeService";
import "./DrawerStyle.css";
import { _DecryptService } from "../../service/EncryptDecryptService";
import { jwtDecode } from "jwt-decode";
import { UpdateAccountProfileAPI, UpdatePasswordAPI } from "../../api/Auth/AccountController";

const drawerWidth = 240;

const DrawerComponent = (props) => {
  const { window } = props;
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const role = _AdminAuthorizeService();
    setUserRole(role);
    var token = sessionStorage.getItem("token");
    var decryptedToken = _DecryptService(token);
    var decodeToken = jwtDecode(decryptedToken);
    console.log("DecodeToken", decodeToken);
    var encryptUsername = decodeToken.User_Name;
    var decryptUsername = _DecryptService(encryptUsername);
    setProfileData((prev) => ({
      ...prev,
      name: decryptUsername,
      password: "",
      confirmPassword: "",
    }));
  }, []);
  const handleProfileOpen = () => setOpenProfileDialog(true);
  const handleProfileClose = () => setOpenProfileDialog(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (mode) => {
    //call the related apis as per project.
    // mode=='profile'?UpdateAccountProfileAPI():UpdatePasswordAPI()
    console.log("Updated profile:", profileData);
    // when mode is password , password and confirm password should not be empty and must same 
    // when mode is profile, name should not be empty
    if (mode === "password") {
      if (profileData.password === "" || profileData.confirmPassword === "") {
        alert("Password and Confirm Password cannot be empty");
        return;
      }
      if (profileData.password !== profileData.confirmPassword) {
        alert("Password and Confirm Password do not match");
        return;
      }
      UpdatePasswordAPI(profileData, setOpenProfileDialog);
    } else {
      if (profileData.name === "") {
        alert("Name cannot be empty");
        return;
      }
      UpdateAccountProfileAPI(profileData, setOpenProfileDialog);
    }
    // For demonstration purposes, we'll just log the profile data
    console.log("Profile updated:", profileData);
    // You can replace this with your actual update logic
    // For example, you might want to call an API to update the profile
    // and show a success message
    // alert("Profile updated successfully");
    // For demonstration purposes, we'll just log the profile data
    // You can replace this with your actual update logic 
    setOpenProfileDialog(false)
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const imageMapping = {
    Dashboard: DashboardIcon,
    Product: ProductIcon,
    Account: AccountIcon,
    Category: CategoryIcon,
    Sale: OrderIcon,
    Logout: LogoutIcon,
    Business: BusinessIcon,
  };

  const menuItems = [];
  if (userRole === "Admin") {
    menuItems.push("Dashboard", "Account", "Product", "Category", "Sale");
  } else if (userRole === "SuperAdmin") {
    menuItems.push("Business");
  }

  const handleMenuClick = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <img alt="Logo" src={Logo} width={100} height={100} />
      </Box>
      <List>
        {menuItems.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleMenuClick(text, index)}
            sx={{
              background:
                selectedItem === text
                  ? "linear-gradient(93deg, #2981b8 -18.36%, #2db9dd 183.89%)"
                  : "transparent",
              color: selectedItem === text ? "white" : "inherit",
            }}
          >
            <ListItemButton>
              <img
                src={imageMapping[text]}
                className={selectedItem === text ? "icon-invert" : "icon"}
                alt={`${text} Icon`}
              />
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: "auto" }}>
        <Divider />
        <List>
          <ListItem key="Logout" disablePadding onClick={_LogoutService}>
            <ListItemButton>
              <img src={LogoutIcon} className="icon" alt="Logout Icon" />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const renderPage = () => {
    const pageMapping = {
      Admin: {
        0: <DashboardPage />,
        1: <AccountManagementPage />,
        2: <ProductPage />,
        3: <></>,
        4: <></>,
      },
      SuperAdmin: {
        0: <></>,
      },
    };
    return pageMapping[userRole]?.[selectedIndex] || <DashboardPage />;
  };

  return (
    <ThemeProvider theme={theme}>
      <ProfileDialogComponent
        open={openProfileDialog}
        onClose={handleProfileClose}
        profileData={profileData}
        setProfileData={setProfileData}
        onUpdate={handleProfileUpdate}
      />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{
            width: {
              sm: drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
            },
            ml: { sm: drawerOpen ? `${drawerWidth}px` : 0 },
            transition: "all 0.3s",
          }}
        >
          {/* <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {selectedItem}
            </Typography>
          </Toolbar> */}
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {selectedItem}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit" onClick={handleProfileOpen}>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            width: { sm: drawerOpen ? drawerWidth : 0 },
            flexShrink: { sm: 0 },
            transition: "width 0.3s",
          }}
          aria-label="drawer"
        >
          {/* Mobile Drawer */}
          <Drawer
            container={container}
            variant="temporary"
            open={!drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Desktop Drawer */}
          <Drawer
            variant="persistent"
            open={drawerOpen}
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: "100%",
            transition: "margin 0.3s",
          }}
        >
          <Toolbar />
          {renderPage()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

DrawerComponent.propTypes = {
  window: PropTypes.func,
};

export default DrawerComponent;
