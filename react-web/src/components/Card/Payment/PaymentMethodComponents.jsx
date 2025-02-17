import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import OrderSlipCard from "./../OrderSlipCard";
import PaymentInformationCard from "./Information/PaymentInformationCard";
import PaymentMethodInformation from "./Information/PaymentMethodInformation";
import { _DecryptService } from "../../../service/EncryptDecryptService";
import _JWTDecodeService from "../../../service/JWTDecodeService";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const PaymentMethodComponents = ({ history, formData, total }) => {
  const [chooseMethod, setChooseMethod] = useState(false);
  const [selectedTownship, setSelectedTownship] = useState("");
  const [contact, setContact] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState("");

  const addDetailsToFormData = () => {
    const businessName = _DecryptService(
      _JWTDecodeService(_DecryptService(sessionStorage.getItem("token")))
        .BusinessName
    );

    if (formData && formData.length > 0) {
      const updatedFormData = formData.map((item) => ({
        CartId: item.cartId,
        UserId: item.userId,
        BusinessName: businessName,
        ProductCode: item.productCode,
        ProductId: item.productId,
        ProductName: item.productName,
        UnitPrice: item.unitPrice,
        Quantity: item.quantity,
        Amount: item.Amount,
        FullName: fullName,
        Email: contact,
        Phone: phoneNumber,
        ShippingTownship: selectedTownship,
        Address: address,
        Size: item.size,
        Color: item.color,
        Materials: item.materials,
        DiscountAmount:discount,
        PromoCode:promoCode
      }));
      setData(updatedFormData);
    } else {
      const updatedFormData = [
        {
          CartId: formData.cartId || null,
          UserId: formData.userId,
          BusinessName: businessName,
          ProductCode: formData.productCode,
          ProductId: formData.productId,
          ProductName: formData.productName,
          UnitPrice: formData.unitPrice,
          Quantity: formData.quantity,
          Color: formData.color,
          Size: formData.size,
          Materials: formData.materials,
          Amount: formData.Amount,
          FullName: fullName,
          Email: contact,
          Phone: phoneNumber,
          ShippingTownship: selectedTownship,
          Address: address,
          DiscountAmount:discount,
          PromoCode:promoCode
        },
      ];
      setData(updatedFormData);
    }
  };
  useEffect(() => {
    if (chooseMethod) {
      addDetailsToFormData();
    }
  }, [chooseMethod]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "80%",
          flexDirection: "row",
          gap: "250px",
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              borderRight: "1px solid #CCCCCC",
              paddingRight: "150px",
            }}
          >
            <Typography sx={{ width: "80%" }}>
              {chooseMethod && (
                <IconButton onClick={() => setChooseMethod(false)}>
                  <ArrowBackIosIcon />
                </IconButton>
              )}
              Cart {">"} Information {">"} Payment Method
            </Typography>

            {chooseMethod ? (
              <PaymentMethodInformation
                selectedTownship={selectedTownship}
                formData={data}
              />
            ) : (
              <PaymentInformationCard
                history={history}
                setChooseMethod={setChooseMethod}
                setSelectedTownship={setSelectedTownship}
                contact={contact}
                setContact={setContact}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                address={address}
                setAddress={setAddress}
                fullName={fullName}
                setFullName={setFullName}
              />
            )}
          </Box>
        </Box>

        {chooseMethod && (
          <OrderSlipCard
            total={total}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            discount={discount}
            setDiscount={setDiscount}
          />
        )}
      </Box>
    </Box>
  );
};

export default PaymentMethodComponents;
