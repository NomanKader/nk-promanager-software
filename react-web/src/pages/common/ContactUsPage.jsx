import React from "react";
import { Container, ThemeProvider, Box } from "@mui/material";
import theme from "../../theme";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import IntroComponent from "../../components/Card/ContactUs/IntroComponent";
import ContactUsContactInformation from "../../components/Card/ContactUs/ContactInformation";
import MapComponent from "../../components/Card/ContactUs/MapComponent";
import ShopLocationInformation from "../../components/Card/ContactUs/ShopLocationInformation";
import LocationComponents from "../../components/Card/LocationComponents";


export default function ContactUsPage({ history }) {
  return (
    <ThemeProvider theme={theme}>
      <UserNavbarComponent history={history} />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "95%",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <IntroComponent />
          <ContactUsContactInformation />
          <MapComponent />
          <ShopLocationInformation />
          <LocationComponents />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
