import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ProfileDialogComponent = ({
  open,
  onClose,
  profileData,
  setProfileData,
  onUpdate,
}) => {
  const [mode, setMode] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {mode === "profile" ? "Update Profile" : "Change Password"}
      </DialogTitle>
      <DialogContent>
        <FormControl sx={{ mb: 2 }}>
          <RadioGroup
            row
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <FormControlLabel value="profile" control={<Radio />} label="Profile Info" />
            <FormControlLabel value="password" control={<Radio />} label="Password" />
          </RadioGroup>
        </FormControl>

        {mode === "profile" ? (
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            value={profileData.name}
            onChange={handleInputChange}
          />
        ) : (
          <>
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={profileData.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={profileData.confirmPassword}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm((prev) => !prev)} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onUpdate(mode)} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialogComponent;
