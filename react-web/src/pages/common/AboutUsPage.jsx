import React from "react";
import { Container, ThemeProvider, Box } from "@mui/material";
import theme from "../../theme";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import AboutUsIntroComponent from "../../components/Card/AboutUs/IntroComponent";
import AboutUsWelcomeComponent from "../../components/Card/AboutUs/WelcomeComponent";
import CustomerReviewComponent from "../../components/Card/AboutUs/CustomerReviewComponent";
import LocationComponents from "../../components/Card/LocationComponents";

export default function AboutUsPage({ history }) {
  return (
    <ThemeProvider theme={theme}>
      <UserNavbarComponent history={history} />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "95%",
            gap: "10px",
          }}
        >
          <AboutUsIntroComponent />
          <AboutUsWelcomeComponent />
          <CustomerReviewComponent />
          <LocationComponents />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
