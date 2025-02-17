import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  CircularProgress,
  TextField,
} from "@mui/material";
import kpayicon from "../../../../assets/images/payment/kpay.png";
import wavepayicon from "../../../../assets/images/payment/wavepay.png";
import cbpayicon from "../../../../assets/images/payment/cb.png";
import kbzicon from "../../../../assets/images/payment/KBZ.png";
import picon from "../../../../assets/images/payment/p.png";
import { useDropzone } from "react-dropzone";
import browse from "../../../../assets/images/browse.png";
import { CreateOrder } from "../../../../api/product/ProductController";
import AlertBoxComponent from "../../../Alert/AlertBoxComponent";
import theme from "../../../../theme";

const PaymentMethodInformation = ({ selectedTownship, formData }) => {
  const [largerImage, setLargerImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    selectedTownship === "yangon" ? "COD" : "OnlinePayment"
  );
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    messageParts: [],
    onClose: () => setOpen(false),
  });
  const [showCard, setShowCard] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    accountNumber: "",
  });
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.REACT_APP_UAT_RESOURCE_ENDPOINT + "wallet.json"
      );
      const data = await response.json();
      const formattedWallet = data.wallets.map((item) => ({
        name: item.name,
        holderName: item.username,
        acount: item.phone_number,
        alt: item.name,
        src: item.online_logo,
      }));
      setPaymentMethods(formattedWallet);

      console.log(data);
    };

    fetchData();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".png, .jpg, .jpeg",
    onDrop: (acceptedFiles) => {
      const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
      const validFiles = acceptedFiles.filter((file) => file.size <= maxSize);

      if (validFiles.length > 0) {
        setLargerImage(false);
        setUploadedFile(validFiles[0]);
      } else {
        setLargerImage(true);
      }
    },
  });

  const handleImageClick = (imageName) => {
    const selectedMethod = paymentMethods.find(
      (method) => method.name === imageName
    );

    if (selectedMethod) {
      setShowCard(true);
      setSelectedImage(imageName);
      setMessage(imageName);
      setCardDetails({
        name: selectedMethod.holderName,
        accountNumber: selectedMethod.acount,
      });
    }
  };

  const handleSubmit = async () => {
    const firstItem = formData[0];
    if (
      !firstItem.Address ||
      !firstItem.Phone ||
      !firstItem.Email ||
      !firstItem.FullName
    ) {
      showAlert(
        "Order Info",
        [{ text: "You need to fill your information in the previous screen" }],
        () => setOpen(false)
      );
      return; // Exit if any field is missing
    }

    // Update formData with payment method
    const updatedFormData = formData.map((item) => ({
      ...item,
      PaymentMethod: selectedPaymentMethod === "COD" ? "COD" : message,
    }));

    // Create FormData body
    const formDataBody = new FormData();
    formDataBody.append("orderList", JSON.stringify(updatedFormData));

    if (uploadedFile) {
      formDataBody.append("file", uploadedFile);
    } else {
      formDataBody.append("file", null);
    }

    console.log("updateformaData", updatedFormData);

    // Validate Online Payment fields
    if (selectedPaymentMethod !== "COD") {
      if (!message || !uploadedFile) {
        showAlert(
          "Order Info",
          [{ text: "You need to choose a payment method and upload a photo." }],
          () => setOpen(false)
        );
        return; // Exit if validation fails
      }
    }
    try {
      const response = await CreateOrder(formDataBody, setLoading);
      handleOrderResponse(response);
    } catch (err) {
      showAlert("Order Failed", [
        { text: "An error occurred while placing your order." },
      ]);
    }
  };

  // Updated showAlert function
  const showAlert = (
    title,
    messageParts,
    onCloseCallback = () => setOpen(false)
  ) => {
    setAlertContent({ title, messageParts, onClose: onCloseCallback });
    setOpen(true);
  };

  // Updated handleOrderResponse function
  const handleOrderResponse = (response) => {
    if (response.baseResponseModel.respCode === 200) {
      showAlert(
        "Order Successful",
        [{ text: "Your order has been placed successfully!" }],
        () => {
          setOpen(false);
          window.location.replace("/"); // Redirect after success
        }
      );
    } else {
      showAlert("Order Failed", [
        { text: "Failed to place the order. Please try again." },
      ]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
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
        onClose={alertContent.onClose}
        title={alertContent.title}
        messageParts={alertContent.messageParts}
      />
      {/* Rest of the component */}
      <Typography
        sx={{
          fontSize: "18px",
          fontFamily: `'Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
        }}
      >
        Choose Payment Method
      </Typography>
      <RadioGroup
        value={selectedPaymentMethod}
        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
        row
      >
        {selectedTownship === "yangon" && (
          <FormControlLabel
            value="COD"
            control={<Radio />}
            label="Cash On Delivery"
          />
        )}
        <FormControlLabel
          value="OnlinePayment"
          control={<Radio />}
          label="Online Payment"
        />
      </RadioGroup>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "80px",
        }}
      >
        {selectedPaymentMethod === "OnlinePayment" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Select a Payment Method
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                flexWrap: "wrap",
              }}
            >
              {paymentMethods.map((method) => (
                <img
                  key={method.name}
                  src={method.src}
                  alt={method.alt}
                  style={{
                    width: 55,
                    height: 55,
                    cursor: "pointer",
                    border:
                      selectedImage === method.name
                        ? "2px solid #F98C6B"
                        : "none",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleImageClick(method.name)}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
      {showCard && selectedPaymentMethod === "OnlinePayment" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: theme.palette.secondary.backgroundColor,
            border:"1px solid",
            borderColor:theme.palette.primary.main,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#333",
                textAlign: "start",
              }}
            >
              <strong>Name:</strong> {cardDetails.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#333",
                textAlign: "start",
              }}
            >
              <strong>Account:</strong> {cardDetails.accountNumber}
            </Typography>           
          </Box>
        </Box>
      )}

      {selectedPaymentMethod === "OnlinePayment" && (
        <>
          {uploadedFile ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px dashed #384EB74D",
                padding: "0",
                borderRadius: 2,
                width: "600px",
                height: "300px",
                textAlign: "center",
                cursor: "pointer",
                gap: "10px",
                backgroundColor: "#f8f8ff",
                overflow: "hidden",
              }}
              onClick={() => document.getElementById("file-input").click()}
            >
              {/* Uploaded Image Preview */}
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt="Uploaded Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
              <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  const maxSize = 2 * 1024 * 1024;
                  const files = Array.from(e.target.files);
                  const validFiles = files.filter(
                    (file) => file.size <= maxSize
                  );

                  if (validFiles.length > 0) {
                    setLargerImage(false);
                    console.log("Files dropped:", validFiles);
                    setUploadedFile(validFiles[0]);
                  } else {
                    console.log("File is too large");
                    setUploadedFile(null);
                    setLargerImage(true);
                  }
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px dashed #384EB74D",
                padding: "90px 20px",
                borderRadius: 2,
                width: "600px",
                height: "200px",
                textAlign: "center",
                cursor: "pointer",
                gap: "10px",
                backgroundColor: "#f8f8ff",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} id="file-input" />
              <img
                src={browse}
                alt="browse"
                style={{
                  width: "auto",
                  height: 55,
                }}
              />

              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Drag & drop files or{" "}
                <a
                  style={{
                    color: "#F98C6B",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Browse
                </a>
              </Typography>

              <Typography
                sx={{
                  color: "#676767",
                  fontSize: "14px",
                }}
              >
                Supported formats: JPEG, PNG, JPG
              </Typography>
              {largerImage && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                  }}
                >
                  "File is too large. Please upload a file smaller than 2 MB."
                </Typography>
              )}
            </Box>
          )}
        </>
      )}

      <Button
        variant="contained"
        onClick={() => handleSubmit()}
        sx={{
          width: "650px",
          color: "#000000",
          marginTop: selectedPaymentMethod === "COD" && "13%",
          backgroundColor: "#FBA58B",
          textTransform: "capitalize",
        }}
      >
        Confirm Order
      </Button>
    </Box>
  );
};

export default PaymentMethodInformation;
