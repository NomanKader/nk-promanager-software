import React from "react";
import {
  ThemeProvider,
  Typography,
  Box,
  Button,
  Container,
  useTheme,
} from "@mui/material";
import theme from "../../theme";
import logo from "../../assets/icons/logo.png";

export default function HomePage({ history }) {
  const muiTheme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          padding: 4,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          {/* Logo */}
          {/* Logo */}
          <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="NK PM Logo"
              sx={{
                width: 150,
                height: 150,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#fff",
                padding: 1,
              }}
            />
          </Box>

          {/* Heading */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              letterSpacing: 1,
            }}
          >
            NK-ProManager Software
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", sm: "1.2rem" },
              maxWidth: "80%",
              mx: "auto",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            Streamline your team's productivity with powerful task management,
            project control, and smart role assignment – all in one place.
          </Typography>

          {/* Button */}
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#ffffff",
              color: "#1e3c72",
              fontWeight: "bold",
              fontSize: "1rem",
              px: 5,
              py: 1.5,
              borderRadius: "50px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
            onClick={() => history.push("/admin/login")}
          >
            🚀 Get Started
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
