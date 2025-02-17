import { Box, Typography,useMediaQuery } from '@mui/material'
import React from 'react'


function TitleComponent({ Title }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box
      sx={{
        display: "flex",
        width: isMobile? "40%" :  "40%",
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center"
      }}
    >
      <hr style={{ width: "25%", backgroundColor: "#F98C6B", height: "2px", border: "none" }} />
      <Typography 
        sx={{
          color: "#000000",
          fontSize: isMobile? "0.7rem" : "1rem",
          fontWeight: "500",
          fontFamily: "'Amiko', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
        }}
      >
        {Title}
      </Typography>
      <hr style={{ width: "25%", backgroundColor: "#F98C6B", height: "2px", border: "none" }} />
    </Box>

  )
}

export default TitleComponent