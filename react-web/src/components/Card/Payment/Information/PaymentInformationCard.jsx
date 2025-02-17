import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import AlertBoxComponent from "../../../Alert/AlertBoxComponent";

const PaymentInformationCard = ({
  history,
  setChooseMethod,
  setSelectedTownship,
  contact,
  setContact,
  fullName,
  setFullName,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
}) => {
  const [selectedCity, setSelectedCity] = useState("yangon");
  const [open, setOpen] = useState(false);

  const handleReturnCart = () => {
    history.push("/card");
    window.scrollTo(0, 0);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <AlertBoxComponent
        open={open}
        onClose={() => setOpen(false)}
        title={"Order Info"}
        messageParts={[
          { text: "You need to fill your information in the previous screen" },
        ]}
      />
      {/* Contact */}
      <Box>
        <Typography sx={{ fontWeight: 600, marginBottom: "8px" }}>
          Contact
        </Typography>
        <TextField
          fullWidth
          placeholder="Email or Mobile Phone Number"
          variant="outlined"
          size="small"
          value={contact} // Controlled value from parent state
          onChange={(e) => setContact(e.target.value)} // Update parent state
        />
      </Box>

      {/* Name */}
      <Box>
        <Typography sx={{ fontWeight: 600, marginBottom: "8px" }}>
          Name
        </Typography>
        <TextField
          fullWidth
          placeholder="Full Name"
          variant="outlined"
          size="small"
          value={fullName} // Controlled value from parent state
          onChange={(e) => setFullName(e.target.value)} // Update parent state
        />
      </Box>

      {/* Shipping Address */}
      <Box>
        <Typography sx={{ fontWeight: 600, marginBottom: "8px" }}>
          Shipping Address
        </Typography>

        {/* Radio Group */}
        <RadioGroup
          row
          defaultValue="yangon"
          sx={{ marginBottom: "12px" }}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <FormControlLabel
            value="yangon"
            control={<Radio sx={{ color: "#F98C6B" }} />}
            label="Yangon"
          />
          <FormControlLabel
            value="other"
            control={<Radio sx={{ color: "#F98C6B" }} />}
            label="Other Townships"
          />
        </RadioGroup>

        {/* Address and Phone Number */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <TextField
            fullWidth
            placeholder="Address"
            variant="outlined"
            size="small"
            value={address} // Controlled value from parent state
            onChange={(e) => setAddress(e.target.value)} // Update parent state
          />
          <TextField
            fullWidth
            placeholder="Phone Number"
            variant="outlined"
            size="small"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            fontWeight: 600,
            color: "#000000",
          }}
          onClick={handleReturnCart}
        >
          &lt; Return to Cart
        </Button>
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
            fontWeight: 600,
            color: "#000000",
          }}
          onClick={() => {
            if (!address && !phoneNumber && !fullName && !contact) {
              setOpen(true);
            } else {
              setChooseMethod(true);
              setSelectedTownship(selectedCity);
            }
          }}
        >
          Continue Payment Method &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentInformationCard;
