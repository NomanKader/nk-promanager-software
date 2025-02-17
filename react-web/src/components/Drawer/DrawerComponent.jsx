import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import Logo from "../../assets/icons/logo.png";
import DashboardIcon from "../../assets/icons/DashboardIcon.png";
import LogoutIcon from "../../assets/icons/LogoutIcon.png";
import ProductIcon from "../../assets/icons/ListingIcon.png";
import OrderIcon from "../../assets/icons/order.png";
import AccountIcon from "../../assets/icons/accountIcon.png";
import PromoCodeIcon from "../../assets/icons/promoCode.png";
import DashboardPage from "../../pages/admin/dashboard/DashboardPage";
import ProductPage from "../../pages/admin/product/ProductPage";
import AccountManagementPage from "../../pages/admin/account/AccountManagementPage";
import _LogoutService from "../../service/LogoutService";
import { _AdminAuthorizeService } from "../../service/AuthorizeService";
import "./DrawerStyle.css";
import OrderStatus from "../../pages/common/OrderStatus";
import PromoCodePage from "../../pages/admin/promo/PromoCodePage";
const drawerWidth = 240;

const DrawerComponent = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = _AdminAuthorizeService();
    setUserRole(role);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const imageMapping = {
    Dashboard: DashboardIcon,
    Product: ProductIcon,
    Account: AccountIcon,
    PromoCode: PromoCodeIcon,
    Order: OrderIcon,
    Logout: LogoutIcon,
  };

  const menuItems = ["Dashboard", "Product"];
  if (userRole === "Admin") {
    menuItems.push("Account");
  }
  menuItems.push("Order");
  menuItems.push("PromoCode");

  const handleMenuClick = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <img alt="Sharmal Official Logo" src={Logo} width={100} height={100} />
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
                  ? "linear-gradient(93deg, #F98C6B -18.36%, #e97a58 183.89%)"
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
              <img
                src={imageMapping["Logout"]}
                className="icon"
                alt="Logout Icon"
              />
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
        1: <ProductPage />,
        2: <AccountManagementPage />,
        3: <OrderStatus />,
        4: <PromoCodePage />,
      },
      User: {
        0: <DashboardPage />,
        1: <ProductPage />,
        2: <OrderStatus />,
        4: <PromoCodePage />,
      },
    };
    const userPages = pageMapping[userRole] || {};
    return userPages[selectedIndex] || <DashboardPage />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {selectedIndex !== 0 && (
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {selectedItem}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
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
