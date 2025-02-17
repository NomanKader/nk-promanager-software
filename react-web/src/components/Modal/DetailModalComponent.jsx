import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../theme";
import { GetOrderList } from "../../api/order/OrderController";
import ProductViewDeatilModal from "./ProductViewDetailModal";

const DetailModalComponent = ({ open, onClose, data, category }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [detail, setDetail] = useState([])

  useEffect(() => {
    if (category !== "Order") return;
    const fetchOrderList = async () => {
      setDetail([])
      console.log("orderId",data)
      const response = await GetOrderList(setIsLoading, {
        orderId: data?.orderId,
      });
      setDetail(response)

    };

    fetchOrderList();
  }, []);
  if (!data) return null;

  const baseURL = process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;

  const renderContent = () => {
    switch (category) {
      case "Product":
        return (
          <>
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              {data.productTitle}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "#555" }}>
              Description: {data.productDescription}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#888" }}>
              Price:{" "}
              <span style={{ fontWeight: "bold", color: "#0b6e7d" }}>
                {data.price}
              </span>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#888" }}>
              Quantity:{" "}
              <span style={{ fontWeight: "bold", color: "#0b6e7d" }}>
                {data.quantity}
              </span>
            </Typography>

            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}
            >
              {data.dataLst.map((item) => (
                <img
                  key={item.id}
                  src={`${baseURL}Upload/Ecommerce/${item.businessName}/${item.product_Id}/${item.image}`}
                  alt={data.productTitle}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    margin: "5px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease-in-out",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                />
              ))}
            </div>
          </>
        );
      case "Order":
        return (
          <>
           <ProductViewDeatilModal orderData={detail}/>
          </>
        );
      default:
        return (
          <Typography variant="body1">
            No details available for this category.
          </Typography>
        );
    }
  };

  return (
    <Modal open={open} onClose={onClose} hideBackdrop={true}>
      <Box
        sx={{
          width: 450,
          padding: 4,
          backgroundColor: "white",
          margin: "auto",
          mt: 5,
          borderRadius: "12px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
          position: "relative", // Ensure positioning for the icon
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: theme.palette.grey[800],
          }}
        >
          <CloseIcon />
        </IconButton>
        {renderContent()}
        <Button
          onClick={onClose}
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
            "&:hover": { backgroundColor: theme.palette.secondary.main },
            borderRadius: "8px",
            padding: "8px 20px",
            textTransform: "none",
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DetailModalComponent;
