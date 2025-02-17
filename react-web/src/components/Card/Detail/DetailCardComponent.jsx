import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  useMediaQuery,
  Button,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useContext, useState } from "react";
import image from "../../../assets/images/detail/image.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { _DecryptService } from "../../../service/EncryptDecryptService";
import _JWTDecodeService from "../../../service/JWTDecodeService";
import theme from "../../../theme";
import AlertBoxComponent from "../../Alert/AlertBoxComponent";
import { AddToCartAPI } from "../../../api/product/ProductController";
import { CartContext } from "../../../context/CartContext";

// Styled Radio Button
const StyledRadioButton = styled(Button)(({ theme, selected }) => ({
  height: "60px",
  borderRadius: "50%",
  border: selected
    ? `2px solid ${theme.palette.primary.main}`
    : `1px solid ${theme.palette.primary.main}`,
  backgroundColor: selected ? theme.palette.primary.light : "#f9f9f9",
  color: selected ? theme.palette.primary.contrastText : "#333",
  textTransform: "none",
  fontSize: "1rem",
  display: "flex",
  fontWeight: "700",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: selected ? theme.palette.primary.main : "#e0e0e0",
  },
}));

const DetailCardComponent = ({ item, history }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const availableSizes = item.size.split(",");
  const availableColors = item.color.split(",");
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [sizeExpanded, setSizeExpanded] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textLoading, setTextLoading] = useState(false);
  const { setCartItemCount } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);

  const handleToggle = (setExpandedName) => {
    setExpandedName((prev) => !prev);
  };

  const handleBuy = async (item) => {
    const userToken = sessionStorage.getItem("token");
    if (!userToken) {
      throw new Error("User token not found");
    }

    const userId = _DecryptService(
      _JWTDecodeService(_DecryptService(userToken)).UserId
    );
    if (!selectedColor || !selectedSize) {
      setOpen(true);
      return;
    }
    console.log("afafaa", item);
    const data = {
      cartId: "",
      userId: userId,
      productCode: item.productCode,
      productId: item.productId,
      productName: item.productTitle,
      unitPrice: item.price,
      quantity: item.quantity,
      Amount: item.price * quantity,
      color: selectedColor,
      size: selectedSize,
      materials: item.materials,
    };
    history.push({
      pathname: "/payment",
      state: { formData: data, total: data.Amount },
    });
  };

  const handleAddToCart = async (item) => {
    console.log("productCode", item.productCode);
    try {
      setTextLoading(true);
      const userToken = sessionStorage.getItem("token");
      if (!userToken) {
        throw new Error("User token not found");
      }

      const userId = _DecryptService(
        _JWTDecodeService(_DecryptService(userToken)).UserId
      );

      if (!selectedColor || !selectedSize) {
        setOpen(true);
        return;
      }

      const data = {
        UserId: userId,
        ProductCode: item.productCode,
        ProductId: item.productId,
        Color: selectedColor,
        Size: selectedSize,
        Materials: item.materials,
        Quantity: quantity,
      };
      const response = await AddToCartAPI(data, setLoading);
      if (response.respCode === 200) {
        setCartItemCount(response.cartItemCount);
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setShowMessage(true);
    } finally {
      setTextLoading(false);
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };
  const getImageUrl = (item, index) => {
    if (!item?.dataLst || !item.dataLst[index]) {
      return "";
    }

    const baseEndpoint = process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;
    const productId = item.dataLst[index].product_Id;
    const imageName = item.dataLst[index].image;
    const businessName = item.dataLst[index].businessName;

    if (!baseEndpoint || !productId || !imageName) {
      return "";
    }
    console.log(
      `${baseEndpoint}/Upload/Ecommerce/${businessName}/${productId}/${imageName}`
    );
    return `${baseEndpoint}/Upload/Ecommerce/${businessName}/${productId}/${imageName}`;
  };

  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) =>
      action === "increase" ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: isMobile ? "0" : "20px",
      }}
    >
      <AlertBoxComponent
        open={open}
        onClose={() => setOpen(false)}
        title="Choose Your Perfect Fit"
        messageParts={[
          { text: "To ensure the perfect choice, please choose both a " },
          { text: "color", color: "#F98C6B", bold: true },
          { text: " and a " },
          { text: "size", color: "#6B7BF9", bold: true },
          { text: " before proceeding." },
        ]}
      />
      <Typography
        sx={{
          width: isMobile ? "90%" : "80%",
          textAlign: "left",
        }}
      >
        Home {">"} {item.productTitle}
      </Typography>

      <Box
        sx={{
          width: isMobile ? "80%" : "70%",
          height: "auto",
          margin: "20px 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "20px" : "15%",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {/* Left: Image Section */}
          <Card
            sx={{
              width: isMobile ? "90%" : "35%",
              backgroundColor: "transparent",
              boxShadow: "none",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Align thumbnails and image evenly
            }}
          >
            <Box
              sx={{
                flex: isMobile ? "1" : "0 0 50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Main Image */}
              <Card
                sx={{
                  width: isMobile ? "90%" : "100%",
                  height: isMobile ? 400 : 500,
                  overflow: "hidden",
                  borderRadius: "8px",
                  position: "relative",
                  cursor: "zoom-in",
                }}
              >
                <CardMedia
                  component="img"
                  image={getImageUrl(item, mainImageIndex)}
                  alt={`Main Image ${mainImageIndex}`}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                />
              </Card>

              {/* Thumbnails */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                {/* Backward Icon */}
                <IconButton
                  onClick={() =>
                    mainImageIndex > 0 && setMainImageIndex((prev) => prev - 1)
                  }
                  disabled={mainImageIndex === 0}
                  sx={{
                    zIndex: 1,
                    backgroundColor:
                      mainImageIndex > 0
                        ? theme.palette.primary.main
                        : "transparent",
                    color: mainImageIndex > 0 ? "#fff" : "rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      backgroundColor:
                        mainImageIndex > 0
                          ? "rgba(0, 0, 0, 0.7)"
                          : "transparent",
                    },
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  {item.dataLst?.map((_, index) => (
                    <Card
                      key={index}
                      onClick={() => setMainImageIndex(index)}
                      sx={{
                        width: "60px",
                        height: "60px",
                        cursor: "pointer",
                        border:
                          mainImageIndex === index
                            ? "2px solid #F98C6B"
                            : "1px solid #ccc",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={getImageUrl(item, index)}
                        alt={`Thumbnail ${index}`}
                        sx={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Card>
                  ))}
                </Box>

                {/* Forward Icon */}
                <IconButton
                  onClick={() =>
                    mainImageIndex < item.dataLst.length - 1 &&
                    setMainImageIndex((prev) => prev + 1)
                  }
                  disabled={mainImageIndex === item.dataLst.length - 1}
                  sx={{
                    zIndex: 1,
                    backgroundColor:
                      mainImageIndex < item.dataLst.length - 1
                        ? theme.palette.primary.main
                        : "transparent",
                    color:
                      mainImageIndex < item.dataLst.length - 1
                        ? "#fff"
                        : "rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      backgroundColor:
                        mainImageIndex < item.dataLst.length - 1
                          ? "rgba(0, 0, 0, 0.7)"
                          : "transparent",
                    },
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Box>
          </Card>

          {/* Right: Details Section */}
          <Box
            sx={{
              width: isMobile ? "90%" : "50%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "space-between", // Align buttons at the bottom
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Typography
                sx={{ fontSize: isMobile ? "20px" : "25px", fontWeight: "700" }}
              >
                {item.productTitle}
              </Typography>
              <Typography>{formatNumber(item.price)} MMK</Typography>
              <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                Available Sizes
              </Typography>

              {/* Available Sizes */}
              <RadioGroup
                name="size-group"
                value={selectedSize}
                row
                sx={{
                  justifyContent: "flex-start",
                  gap: "5px",
                }}
              >
                {availableSizes.map((size) => (
                  <FormControlLabel
                    key={size}
                    value={size}
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <StyledRadioButton
                        selected={selectedSize === size}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </StyledRadioButton>
                    }
                  />
                ))}
              </RadioGroup>

              {/* Available Colors */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                  Available Colors
                </Typography>
                <RadioGroup
                  name="color-group"
                  value={selectedColor}
                  row
                  sx={{
                    justifyContent: "flex-start",
                    gap: "5px",
                  }}
                >
                  {availableColors.map((color) => (
                    <FormControlLabel
                      key={color}
                      value={color}
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        <StyledRadioButton
                          selected={selectedColor === color}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </StyledRadioButton>
                      }
                    />
                  ))}
                </RadioGroup>
              </Box>

              {/* Quantity Selector */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
                  Quantity
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    style={{
                      borderRadius: 20,
                      backgroundColor: theme.palette.primary.main,
                    }}
                    size="small"
                    onClick={() => handleQuantityChange("increase")}
                  >
                    <AddIcon />
                  </IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton
                    style={{
                      borderRadius: 20,
                      backgroundColor: theme.palette.primary.main,
                    }}
                    size="small"
                    onClick={() => handleQuantityChange("decrease")}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  color: "#000000",
                  backgroundColor: "#F98C6BCC",
                  height: "45px",
                  width: isMobile ? "100%" : "90%",
                }}
                onClick={() => handleBuy(item)}
              >
                Buy it Now
              </Button>

              <Button
                variant="contained"
                sx={{
                  color: "#000000",
                  backgroundColor: "#F98C6B80",
                  height: "45px",
                  width: isMobile ? "100%" : "90%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                disabled={textLoading}
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
                {textLoading && (
                  <Box
                    sx={{
                      alignItems: "center",
                      marginLeft: "15px",
                    }}
                  >
                    <CircularProgress size={20} color="primary" />
                  </Box>
                )}
              </Button>
              <Dialog
                open={showMessage}
                onClose={() => setShowMessage(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                  <Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon
                        sx={{ color: theme.palette.primary.main, marginRight: "10px" }}
                      />
                      {item.productTitle} has been added to your cart.
                    </Box>
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setShowMessage(false);
                    }}
                    color="primary"
                    autoFocus
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Box>

        <Accordion
          expanded={sizeExpanded}
          onChange={() => handleToggle(setSizeExpanded)}
          sx={{
            width: "100%",
            borderTop: "1px solid #d9d9d9",
            borderBottom: "1px solid #d9d9d9",
            borderLeft: "none",
            borderRight: "none",
            borderRadius: "0px",
            boxShadow: "none",
            marginTop: "25px",
          }}
        >
          {/* Accordion Summary */}
          <AccordionSummary
            expandIcon={
              sizeExpanded ? (
                <RemoveIcon sx={{ color: "#F98C6B" }} />
              ) : (
                <AddIcon sx={{ color: "#F98C6B" }} />
              )
            }
            aria-controls="description-content"
            id="description-header"
            sx={{
              backgroundColor: "#f9f9f9",
              padding: "10px 15px",
            }}
          >
            <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
              Size Guide
            </Typography>
          </AccordionSummary>

          {/* Accordion Details */}
          <AccordionDetails
            sx={{
              padding: "15px",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography>
              Our size guide offers a range of options to ensure the perfect fit
              for everyone. Available sizes include XS, S, M, L, and XL. Whether
              you prefer a snug fit or a relaxed style, you can confidently
              choose the size that suits your comfort and style preferences. Use
              our size chart for detailed measurements to make the best
              selection for you.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={descriptionExpanded}
          onChange={() => handleToggle(setDescriptionExpanded)}
          sx={{
            width: "100%",
            borderTop: "1px solid #d9d9d9", // Only top border
            borderBottom: "1px solid #d9d9d9", // Only bottom border
            borderLeft: "none", // No left border
            borderRight: "none", // No right border
            borderRadius: "0px", // Remove border radius
            boxShadow: "none",
            marginTop: "10px",
          }}
        >
          {/* Accordion Summary */}
          <AccordionSummary
            expandIcon={
              descriptionExpanded ? (
                <RemoveIcon sx={{ color: "#F98C6B" }} />
              ) : (
                <AddIcon sx={{ color: "#F98C6B" }} />
              )
            }
            aria-controls="description-content"
            id="description-header"
            sx={{
              backgroundColor: "#f9f9f9",
              padding: "10px 15px",
            }}
          >
            <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
              Description
            </Typography>
          </AccordionSummary>

          {/* Accordion Details */}
          <AccordionDetails
            sx={{
              padding: "15px",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography>Name - {item.productTitle}</Typography>
            <Typography>Fabric - {item.materials}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default DetailCardComponent;
