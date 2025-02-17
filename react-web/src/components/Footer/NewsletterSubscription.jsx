import React from "react";
import { Box, Typography, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import theme from '../../theme';

export function NewsletterSubscription() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
        width: isMobile ? "100%" : "100%",
        alignItems: "center",
        //padding: "1rem",
       // width: "100%",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          color: theme.palette.text.main,
          marginBottom: isMobile ? "0.5rem" : "1rem",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 600,
          lineHeight: "32px",
          textDecoration: "none",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          fontSize: isMobile ? "1rem" : "1.5rem",
          padding: "1.5rem",
        }}
      >
        We're thrilled to have you here—please let us know if you need anything
        and everything!
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "1rem" : "1.5rem",
          justifyContent: "center",
          width: isMobile ? "100%" : "50%",
          //maxWidth: "500px",
          margin:"0px 5px 35px 5px",
          alignContent: "center",
          alignItems: "center",
          lineHeight: isMobile? "15px" : "27px",
        }}
      >
        <TextField
          id="email"
          type="email"
          placeholder="What's your Email?"
          sx={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: "8px",
            color: '#26262666',
            width: isMobile ? "50%" : "50%",
            fontFamily: "Roboto, sans-serif",
            fontSize: "1rem",
            //fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            textAlign: "left",
            //padding:  "0rem 1rem",
          }}
        />

        <Button
          type="submit"
          sx={{
            backgroundColor: theme.palette.hover.main,
            padding: isMobile ? "0.7rem 1rem" : "0.85rem 1.5rem",
            "&:hover": {
              backgroundColor: theme.palette.hover.main,
            },
            width: isMobile ? "30%" : "30%",
            color: theme.palette.text.main,
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            fontWeight: 600,
            //lineHeight: isMobile? "12px" : "24px",
            textAlign: "center",
            textTransform: "none",
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
}