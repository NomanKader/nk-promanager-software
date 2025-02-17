import React from "react";
import { ThemeProvider, Typography, Box, Button, Container } from "@mui/material";
import theme from "../../theme";

export default function HomePage({ history }) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: 2 }}>
            Welcome to NK Framework
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            A powerful and flexible solution for modern web development.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ paddingX: 4 }}
            onClick={() => history.push("/start")}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
