import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const ProductViewDetailModal = ({ orderData }) => {
  const isLoading =
    !orderData || !orderData.lstOrderDetails || orderData.lstOrderDetails.length === 0;

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        height:"500px",
        maxHeight: "500px",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#3F51B5",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Order Details
      </Typography>

      {isLoading && (
        <div
          style={{
            width: "100%",
            height:"350px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {!isLoading && (
        <>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "#3F51B5",
              marginBottom: "10px",
              textAlign: "left",
            }}
          >
            Order ID:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#5A5A5A",
              marginBottom: "20px",
              fontSize: "16px",
              wordBreak: "break-word",
              textAlign: "left",
            }}
          >
            {orderData.lstOrderDetails[0].order_Id}
          </Typography>

          {/* Full Name & Address */}
          <div style={{ marginBottom: "15px" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#3F51B5", display: "inline" }}
            >
              Full Name:{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#5A5A5A", display: "inline" }}
            >
              {orderData.lstOrderDetails[0].fullName}
            </Typography>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#3F51B5", display: "inline" }}
            >
              Address:{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#5A5A5A", display: "inline" }}
            >
              {orderData.lstOrderDetails[0].address},{" "}
              {orderData.lstOrderDetails[0].shippingTownship}
            </Typography>
          </div>

          {/* Status & Payment Method */}
          <div style={{ marginBottom: "15px" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#3F51B5", display: "inline" }}
            >
              Status:{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color:
                  orderData.lstOrderDetails[0].orderStatus === "Completed"
                    ? "#28A745"
                    : "#FF6F61",
                display: "inline",
              }}
            >
              {orderData.lstOrderDetails[0].orderStatus}
            </Typography>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#3F51B5", display: "inline" }}
            >
              Payment Method:{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#5A5A5A", display: "inline" }}
            >
              {orderData.lstOrderDetails[0].paymentMethod}
            </Typography>
          </div>

          {/* Product Details */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "#3F51B5",
              marginTop: "20px",
              marginBottom: "10px",
              textAlign: "left",
            }}
          >
            Product Details:
          </Typography>
          {orderData.lstOrderDetails.map((order) => (
            <Typography
              key={order.id}
              variant="body1"
              sx={{
                color: "#5A5A5A",
                textAlign: "left",
                marginBottom: "10px",
              }}
            >
              {order.product_Name} ({order.productCode}, {order.size.trim()},{" "}
              {order.color.trim()}, {order.materials}) - {order.quantity} x{" "}
              {new Intl.NumberFormat("en-US").format(order.unitPrice)} MMK
            </Typography>
          ))}

          {/* Total Amount */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#3F51B5",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Total Amount:
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#28A745",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            MMK{" "}
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(
              orderData.lstOrderDetails.reduce(
                (sum, order) => sum + order.amount,
                0
              )
            )}
          </Typography>
        </>
      )}
    </div>
  );
};

export default ProductViewDetailModal;
