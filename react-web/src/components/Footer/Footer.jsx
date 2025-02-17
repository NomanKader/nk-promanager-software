import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box 
      sx={{ 
        position: "fixed", 
        bottom: 0, 
        width: "100%", 
        backgroundColor: "#1976d2", 
        color: "white", 
        textAlign: "center", 
        p: 2 
      }}
    >
      <Typography variant="body1">&copy; {new Date().getFullYear()} NK-POS. All Rights Reserved.</Typography>
    </Box>
  );
}
