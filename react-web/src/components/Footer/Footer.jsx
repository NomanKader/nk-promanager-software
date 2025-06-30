import { Typography, Box } from "@mui/material";
import theme from "../../theme";

export default function Footer() {
  return (
    <Box 
      sx={{         
        position: "fixed", 
        bottom: 0, 
        width: "100%", 
        backgroundColor: theme.palette.primary.main, 
        color: "white", 
        textAlign: "center", 
        p: 2 
      }}
    >
      <Typography variant="body1">&copy; {new Date().getFullYear()} NK PM Software. All Rights Reserved.</Typography>
    </Box>
  );
}
