import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CreateAccountAPI } from "../../../api/Auth/AccountController";
import {
  _DecryptService,
  _EncryptService,
} from "../../../service/EncryptDecryptService";
import { toast } from "react-toastify";
import _JWTDecodeService from "../../../service/JWTDecodeService";
import LoadingButton from "@mui/lab/LoadingButton";

const UserCreateDialogComponent = ({ open, onClose, onRefresh,status,oldData }) => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState(oldData?.userRole || "");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log("OldData",oldData);
  useEffect(() => {    
    if (status === 'edit') {      
      setUserName(oldData?.userName || "");
      setEmail(oldData?.email || "");
      setPhoneNumber(oldData?.phoneNumber || "");
    } else {
      setUserName("");
      setEmail("");
      setPhoneNumber("");
    }
  }, [status, oldData]); // Only runs when status or oldData changes
  

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      if (!userName || !email || !password || !userRole) {
        toast.error("All fields are required.");
        return;
      }

      // Step 1: Decrypt the token from session storage
      const decryptedToken = _DecryptService(sessionStorage.getItem("token"));

      // Step 2: Decode the token to get the UserId (assuming it's in the payload of the token)
      const decodedToken = _JWTDecodeService(decryptedToken);
      const userId = decodedToken?.UserId;

      if (!userId) {
        throw new Error("UserId not found in token");
      }

      // Step 3: Decrypt the UserId
      const decryptedUserId = _DecryptService(userId);

      // Step 4: Encrypt the password before sending it
      const encryptedPassword = _EncryptService(password).toString();

      // Prepare the user data to be sent
      const BusinessName = _DecryptService(
        _JWTDecodeService(_DecryptService(sessionStorage.getItem("token")))
          .BusinessName
      );
      console.log("BusinessName",BusinessName)
      const userData = {
        "userName": userName,
        "userRole": userRole,
        "email": email,
        "phoneNumber": phoneNumber,
        "password": password,
        "profileImage": "",
        "businessName": BusinessName,
      };

      // Logging userData to ensure it's populated correctly

      // Call the API to create the user
      await CreateAccountAPI(userData,setIsLoading,toast,onRefresh);            
      handleDialogClose();
    } catch (err) {
      setIsLoading(false);
      handleDialogClose();            
      console.error("Error during user creation:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{status=='create'?'Create New User':'Edit User'}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          label="User Name"
          fullWidth
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          type="number"
          fullWidth
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="dense"
          label="User Role"
          select
          fullWidth
          variant="outlined"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Staff">Staff</MenuItem>
        </TextField>
      </DialogContent>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button
          onClick={onClose}
          variant="text"
          sx={{ marginRight: 2, textTransform: "none" }}
        >
          Cancel
        </Button>
        {isLoading ? (
          <LoadingButton loading variant="outlined" color="primary">
            Submitting...
          </LoadingButton>
        ) : (
          <Button
            onClick={handleCreate}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            disabled={!isFormValid}            
          >
            Create
          </Button>
        )}
      </Box>
    </Dialog>
  );
};

export default UserCreateDialogComponent;
