import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const CustomTextField = ({ 
  label, 
  placeholder, 
  icon, 
  isPassword = false, 
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type={isPassword && !showPassword ? "password" : "text"} // Toggle only if it's a password field
      variant="standard"
      fullWidth
      InputProps={{
        startAdornment: icon && (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <IconButton
              onClick={togglePasswordVisibility}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        marginBottom: "10px",
        "& .MuiInputBase-input": {
          paddingLeft: "8px",
        },
        "& .MuiInputBase-input::placeholder": {
          fontSize: "12px",
        },
        "& .MuiInputBase-input:focus::placeholder": {
          opacity: 0,
        },
        "& .MuiInput-root.Mui-focused:after": {
          borderBottom: "2px solid #FA987A",
        },
        "& .MuiInputBase-input": {
          caretColor: "#FA987A",
        },
        "& .Mui-focused .MuiInputAdornment-root.MuiInputAdornment-positionStart": {
          opacity: 0,
          position: "absolute",
        },
      }}
      {...props}
    />
  );
};

export default CustomTextField;
