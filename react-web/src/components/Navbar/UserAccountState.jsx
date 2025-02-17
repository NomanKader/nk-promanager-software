import { Typography, Box, Badge } from "@mui/material";
import React, { useContext } from "react";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined"; // Replacing with Order History Icon
import theme from "./../../theme";
import LogoutIcon from "@mui/icons-material/Logout";
import _LogoutService from "./../../service/LogoutService";
import { CartContext } from "../../context/CartContext";

function UserAccountState({
  accountState,
  setAccountState,
  renderingData,
  history,
}) {
  const handleSignUp = () => {
    history.push("/auth?type=logIn");
  };

  const handleLogout = () => {
    setAccountState(false); // Log the user out
    _LogoutService();
  };
  
  const { cartItemCount } = useContext(CartContext);

  return (
    <>
      {accountState ? (
        <Box
          variant="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            color: "#000000",
            gap: "30px",
          }}
        >
          <Badge
            badgeContent={cartItemCount}
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            <ShoppingCartOutlinedIcon
              sx={{
                width: "25px",
                height: "25px",
                "&:hover": {
                  color: theme.palette.hover.main,
                },
              }}
              onClick={() => {
                history.push("/card");
              }}
            />
          </Badge>
          <HistoryOutlinedIcon
            sx={{
              width: "25px",
              height: "25px",
              "&:hover": {
                color: theme.palette.hover.main,
              },
            }}
            onClick={() => {
              history.push("/orderList");
            }}
          />
          <LogoutIcon
            sx={{
              width: "25px",
              height: "25px",
              "&:hover": {
                color: theme.palette.hover.main,
              },
            }}
            onClick={handleLogout}
          />
        </Box>
      ) : (
        <Typography
          variant="p"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "1rem",
            color: "#000000",
            "&:hover": {
              color: theme.palette.hover.main,
            },
          }}
          onClick={handleSignUp}
        >
          <PermIdentityOutlinedIcon
            sx={{
              width: "25px",
              height: "25px",
            }}
          />
          {renderingData.label}
        </Typography>
      )}
    </>
  );
}

export default UserAccountState;
