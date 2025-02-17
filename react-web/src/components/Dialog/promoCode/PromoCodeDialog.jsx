import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  CreatePromoCode,
  UpdatePromoCode,
} from "../../../api/promo/PromoCodeController";
import moment from "moment";

const initialFormData = {
  Id: "",
  PromotionCode: "",
  Title: "",
  DiscountAmount: "",
  StartDate: null,
  ExpireDate: null,
};

const PromoCodeDialog = ({ open, onClose, onRefresh, selectedRow }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setIsLoading] = useState(false);
  const isEditMode = Boolean(selectedRow);

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        Id: selectedRow.id || "",
        PromotionCode: selectedRow.promotionCode || "",
        Title: selectedRow.title || "",
        DiscountAmount: selectedRow.discountAmount
          ? String(selectedRow.discountAmount)
          : "",
        StartDate: selectedRow.startDate ? dayjs(selectedRow.startDate) : null,
        ExpireDate: selectedRow.expireDate
          ? dayjs(selectedRow.expireDate)
          : null,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [selectedRow, open]);

  const generatePromoCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const promoCode = Array.from({ length: 5 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
    setFormData((prev) => ({ ...prev, PromotionCode: promoCode }));
  };

  const handleDateChange = (name, date) => {
    if (!date || !date.isValid()) return;

    const selectedDate = dayjs(date);
    if (selectedDate.isBefore(dayjs(), "day")) {
      alert("Date must be in the future.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: selectedDate.format("YYYY-MM-DD"),
    }));
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "PromotionCode" && value.length > 5) return;

    if (name === "DiscountAmount") {
      let discount = parseInt(value, 10);
      if (isNaN(discount) || discount < 1 || discount > 100) {
        discount = "";
      }
      setFormData((prev) => ({ ...prev, [name]: discount }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.PromotionCode ||
      !formData.Title ||
      !formData.DiscountAmount ||
      !formData.StartDate ||
      !formData.ExpireDate
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      if (isEditMode) {
        const data = {
          Id: formData.Id,
          Title:formData.Title,
          DiscountAmount: formData.DiscountAmount,
          ExpireDate: formData.ExpireDate,
        };
        await UpdatePromoCode(data, setIsLoading);
      } else {
        delete formData.Id;
        await CreatePromoCode(formData, setIsLoading, () =>
          setFormData(initialFormData)
        );
      }
      onRefresh?.();
      handleClose();
    } catch (err) {
      console.error("Error saving promo code:", err);
    } finally {
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ mt: 3, mb: 2, textAlign: "center" }}>
            {isEditMode ? "Edit Promo Code" : "Create Promo Code"}
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8} sm={9}>
              <TextField
                fullWidth
                disabled={isEditMode}
                label="Promotion Code"
                name="PromotionCode"
                value={formData.PromotionCode.toUpperCase()}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 5 }}
              />
            </Grid>
            {!isEditMode && (
              <Grid item xs={4} sm={3} alignContent={"center"} marginTop={1}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ height: "56px" }}
                  onClick={generatePromoCode}
                >
                  Generate
                </Button>
              </Grid>
            )}
          </Grid>

          <TextField
            fullWidth
            label="Title"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Discount Amount (1-100%)"
            name="DiscountAmount"
            type="number"
            value={formData.DiscountAmount}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                disabled={isEditMode}
                label="Start Date"
                value={formData.StartDate ? dayjs(formData.StartDate) : null}
                onChange={(date) => handleDateChange("StartDate", date)}
                format="YYYY-MM-DD"
                disablePast
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Expire Date"
                value={formData.ExpireDate ? dayjs(formData.ExpireDate) : null}
                onChange={(date) => handleDateChange("ExpireDate", date)}
                format="YYYY-MM-DD"
                disablePast
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : isEditMode ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default PromoCodeDialog;
