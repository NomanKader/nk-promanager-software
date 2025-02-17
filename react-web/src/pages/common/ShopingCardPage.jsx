import React, { useContext, useEffect, useId, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent.jsx";
import theme from "../../theme.js";
import { _DecryptService } from "../../service/EncryptDecryptService.js";
import _JWTDecodeService from "../../service/JWTDecodeService.js";
import {
  GetAddToCartListAPI,
  RemoveProductFromAddToCart,
} from "../../api/product/ProductController.js";
import AlertBoxComponent from "../../components/Alert/AlertBoxComponent.jsx";
import { CartContext } from "../../context/CartContext.js";

const ShopingCardPage = ({ history }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [open ,setOpen] = useState(false)
  const { setCartItemCount } = useContext(CartContext);


  // Initial quantities

  const getImageUrl = (image, productId) => {
    const BusinessName = _DecryptService(
      _JWTDecodeService(_DecryptService(sessionStorage.getItem("token")))
        .BusinessName
    );

    const baseEndpoint = process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;
    if (!baseEndpoint || !productId || !image) {
      return ""; // Return an empty string if any required data is missing
    }
    return `${baseEndpoint}/Upload/Ecommerce/${BusinessName}/${productId}/${image}`;
  };

  const removeFromAddToCart = async (id) => {
    try {
      const userToken = sessionStorage.getItem("token");
      if (!userToken) {
        console.error("User token not found");
        return;
      }
      const userId = _DecryptService(
        _JWTDecodeService(_DecryptService(userToken)).UserId
      );

      const response = await RemoveProductFromAddToCart(userId, id, setLoading);
      console.log("suces", response);
      if (response.respCode === 200) {
        await getAddToCartList();
        setCartItemCount(response.cartItemCount);
      }
    } catch (error) {
      console.error("Error fetching add to cart list:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAddToCartList = async () => {
    try {
      setCartItems([]);
      setLoading(true);
      const userToken = sessionStorage.getItem("token");
      if (!userToken) {
        console.error("User token not found");
        return;
      }

      const userId = _DecryptService(
        _JWTDecodeService(_DecryptService(userToken)).UserId
      );

      const response = await GetAddToCartListAPI(userId, setLoading);
      const data = response.cartList.map((item) => ({
        ...item,
        Amount: item.unitPrice * item.quantity, // Add calculated field
      }));
      setCartItems(data);
      console.log("id", cartItems[0].cartId);
    } catch (error) {
      console.error("Error fetching add to cart list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddToCartList();
  }, []); // Empty dependency

  const handleQuantityChange = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
              Amount:
                item.unitPrice *
                (action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1)), // Update Amount dynamically
            }
          : item
      )
    );
  };
  const handleContinuseShop = () => {
    history.push("/");
    window.scrollTo(0, 0);
  };

  const handlePayment = (formData, total) => {
    if (formData && formData.length > 0) {
      history.push({
        pathname: "/payment",
        state: { formData, total },
      });
      window.scrollTo(0, 0);
    } else {
      setOpen(true);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );

  return (
    <ThemeProvider theme={theme}>
      <UserNavbarComponent history={history} />
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            zIndex: 9999, // Ensure it appears above all content
          }}
        >
          <CircularProgress size={60} color="primary" />
        </Box>
      )}

      <AlertBoxComponent
        open={open}
        onClose={() => setOpen(false)}
        title="Information"
        messageParts={[
          { text: "Your cart is empty! Please add items to proceed. " },
        ]}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "1200px",
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, marginBottom: "20px" }}
          >
            Shopping Cart
          </Typography>

          {/* Column Titles */}
          <Box
            sx={{
              display: isMobile ? "none" : "flex",
              alignItems: "center",
              gap: "20px",
              padding: "10px 0",
              borderBottom: "2px solid #F98C6B",
              fontWeight: 700,
            }}
          >
            <Typography sx={{ flex: 1 }}>Product</Typography>
            <Typography
              sx={{ minWidth: "100px", textAlign: "center", flex: 0.5 }}
            >
              Price
            </Typography>
            <Typography
              sx={{ minWidth: "100px", textAlign: "center", flex: 0.5 }}
            >
              Quantity
            </Typography>
            <Typography
              sx={{ minWidth: "100px", textAlign: "center", flex: 0.5 }}
            >
              Total
            </Typography>
            <Box sx={{ minWidth: "20px" }}></Box>{" "}
            {/* Spacer for the remove button */}
          </Box>

          {/* Cart Items */}
          {cartItems.length > 0
            ? cartItems.map((item) => (
                <Box key={item.id} sx={{ marginBottom: "20px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      padding: "20px 0",
                      flexDirection: "row",
                    }}
                  >
                    {/* Product Image */}
                    <Box
                      component="img"
                      src={getImageUrl(item.productImage, item.productId)}
                      alt="Product"
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />

                    {/* Wrapper Box */}
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                      }}
                    >
                      {/* Product Info */}
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700 }}>
                          {item.productName}
                        </Typography>
                        <Typography>Size: {item.size}</Typography>
                        <Typography>Color: {item.color}</Typography>
                      </Box>

                      {/* Price */}
                      <Box sx={{ flex: 0.5 }}>
                        <Typography>
                          {item.unitPrice.toLocaleString()} MMK
                        </Typography>
                      </Box>

                      {/* Quantity */}
                      <Box sx={{ flex: 0.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <IconButton
                            style={{
                              borderRadius: 20,
                              backgroundColor: theme.palette.primary.main,
                            }}
                            size="small"
                            onClick={() =>
                              handleQuantityChange(item.id, "increase")
                            }
                          >
                            <AddIcon />
                          </IconButton>
                          <Typography>{item.quantity}</Typography>
                          <IconButton
                            style={{
                              borderRadius: 20,
                              backgroundColor: theme.palette.primary.main,
                            }}
                            size="small"
                            onClick={() =>
                              handleQuantityChange(item.id, "decrease")
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Total */}
                      <Box sx={{ flex: 0.5, textAlign: "center" }}>
                        <Typography>
                          {item.Amount.toLocaleString()} MMK
                        </Typography>
                      </Box>
                    </Box>

                    {/* Remove Button */}
                    <Box sx={{ flex: 0.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <IconButton
                          style={{
                            borderRadius: 20,
                          }}
                          size="small"
                          onClick={() => removeFromAddToCart(item.id)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                  <Divider
                    sx={{ borderColor: "#F98C6B", borderWidth: "1px" }}
                  />
                </Box>
              ))
            : !loading && (
                <Box
                  sx={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#555",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#3F51B5" }}
                  >
                    No items added to the cart yet.
                  </Typography>
                </Box>
              )}

          {/* Total Section */}
          <Box sx={{ marginTop: "20px", textAlign: "right" }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Total: {calculateTotal().toLocaleString()} MMK
            </Typography>
          </Box>

          {/* Actions */}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              gap: "20px",
              justifyContent: isMobile ? "center" : "flex-end",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F98C6B",
                "&:hover": {
                  backgroundColor: "#f9846b",
                },
                textTransform: "capitalize",
              }}
              onClick={() =>
                handlePayment(cartItems, calculateTotal())
              }
            >
              Check Out
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#F9D6C1",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#f9c6b1",
                },
                textTransform: "capitalize",
              }}
              onClick={handleContinuseShop}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ShopingCardPage;
