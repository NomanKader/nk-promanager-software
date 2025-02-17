import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import AboutusIntro from "../../../assets/images/AboutUsIntroPic.png";
import theme from '../../../theme';

function AboutUsIntroComponent() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={AboutusIntro}
        alt="About Us Intro"
        sx={{
          width: "100%",
          height: isMobile ? "auto" : "500px",
          objectFit: "cover",
        }}
      />

      {/* Overlay Text */}
      <Box
        sx={{
          position: "absolute",
          top: isMobile ? "10%" : "20%",
          width: isMobile ? "90%" : "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: isMobile ? "8px" : "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: isMobile ? "15px" : "25px",
            fontWeight: "bold",
            color: theme.palette.text.primary,
          }}
        >
          About us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: isMobile ? "10px" : "16px",
            lineHeight: isMobile ? 2.5 : 2.5,
            fontFamily: `'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
            fontWeight: 400,
            color: theme.palette.text.secondary,
          }}
        >
          {isMobile
            ? "At our Candy & Peach, we believe that fashion is more than just clothing—it's a form of self-expression, a celebration of individuality, and a reflection of values. Our journey began with a simple idea: to create beautifully crafted, sustainable clothing that makes you feel confident, comfortable, and uniquely our customer!"
            : `At our Candy & Peach, we believe that fashion is more than just clothing—it's a form of self-expression, a 
  celebration of individuality, and a reflection of values. Our journey began with a simple idea: to create beautifully
  crafted, sustainable clothing that makes you feel confident, comfortable, and uniquely our customer! Our Candy 
  & Peach is more than just a brand; it's a community of like-minded individuals who believe in fashion with 
  purpose. Whether you’re here for the perfect outfit or to learn more about our journey, we invite you to join us in 
  making a positive impact on the world through mindful fashion!`
          }

        </Typography>
      </Box>
    </Box>
  );
}

export default AboutUsIntroComponent;
