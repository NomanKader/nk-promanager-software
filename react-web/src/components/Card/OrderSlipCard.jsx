import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  TextField,
  Button,
  Paper,
  Alert,
  Fade,
} from "@mui/material";
import { CheckPromoCode } from "../../api/promo/PromoCodeController";

const OrderSlipCard = ({
  total,
  promoCode,
  setPromoCode,
  discount,
  setDiscount,
}) => {
  const [loading, setLoading] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(total);
  const [promoApplied, setPromoApplied] = useState(false);
  const [error, setError] = useState("");

  const handleCheckPromoCode = async () => {
    try {
      setLoading(true);
      const response = await CheckPromoCode(promoCode, setLoading);
      if (response?.discountAmount) {
        setDiscount(response.discountAmount);
        const discountValue = (parseInt(response.discountAmount) * total) / 100;
        setDiscountAmount(discountValue);
        setPromoApplied(true);
        setError("");
      } else {
        setDiscount(0);
        setError("Invalid promo code! Please try again.");
        setPromoApplied(false);
      }
    } catch (error) {
      setError("Error validating promo code.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTotalAmount(total - discountAmount);
  }, [discountAmount, total]);

  const handleCancelPromoCode = () => {
    setPromoCode("");
    setDiscount(0);
    setPromoApplied(false);
    setError("");
    setDiscountAmount(0);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        width: "100%",
        maxWidth: "420px",
        maxHeight:"450px",
        padding: "24px",
        marginTop: "40px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Order Summary Title */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", textAlign: "center", color: "#333" }}
      >
        Order Summary
      </Typography>

      {/* Subtotal */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" sx={{ fontSize: "16px", color: "#5A5A5A" }}>
          Subtotal
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {total.toLocaleString()} MMK
        </Typography>
      </Box>

      {/* Discount (Only shown when applied) */}
      {promoApplied && (
        <Fade in={promoApplied}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              backgroundColor: "#E8F5E9",
              padding: "8px 12px",
              borderRadius: "6px",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#2E7D32", fontWeight: "bold", fontSize: "15px" }}
            >
              Discount ({discount}%)
            </Typography>
            <Typography variant="body1" sx={{ color: "#2E7D32" }}>
              -{discountAmount.toLocaleString()} MMK
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Divider */}
      <Divider sx={{ borderColor: "#F98C6B", marginY: "12px" }} />

      {/* Total Amount */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }}>
          Total
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#D32F2F" }}>
          {totalAmount.toLocaleString()} MMK
        </Typography>
      </Box>

      {/* Promo Code Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          backgroundColor: "#F5F5F5",
          padding: "14px",
          borderRadius: "8px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "#333", fontSize: "14px" }}
        >
          Have a Promo Code?
        </Typography>
        <Box display="flex" gap="8px" alignItems="center">
          <TextField
            fullWidth
            placeholder="Enter Promo Code"
            variant="outlined"
            size="small"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            inputProps={{ maxLength: 5 }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#F98C6B" },
                "&.Mui-focused fieldset": { borderColor: "#F98C6B" },
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            minWidth: "100px",
            backgroundColor: "#FF7043",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#F4511E" },
          }}
          disabled={promoCode.length < 5 || loading}
          onClick={handleCheckPromoCode}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Apply"}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCancelPromoCode}
          sx={{ padding: "6px 12px", fontWeight: "bold" }}
        >
          Cancel
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Fade in={Boolean(error)}>
          <Alert
            severity="error"
            sx={{ fontSize: "14px", textAlign: "center" }}
          >
            {error}
          </Alert>
        </Fade>
      )}

      {/* Success Message */}
      {promoApplied && (
        <Fade in={promoApplied}>
          <Alert
            severity="success"
            sx={{ fontSize: "14px", textAlign: "center" }}
          >
            Promo Code Applied Successfully!
          </Alert>
        </Fade>
      )}
    </Paper>
  );
};

export default OrderSlipCard;
