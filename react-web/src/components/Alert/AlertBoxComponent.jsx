import React from "react";
import { Box, Typography, Modal, Fade, Button } from "@mui/material";

const AlertBoxComponent = ({ open, onClose, title, messageParts }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "relative",
            width: "300px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          {/* Title */}
          {title && (
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                mb: 2,
              }}
            >
              {title}
            </Typography>
          )}

          <Typography
            sx={{
              fontSize: "16px",
              mb: 3,
            }}
          >
            {messageParts.map((part, index) => (
              <Typography
                key={index}
                component="span"
                sx={{
                  color: part.color || "inherit", 
                  fontWeight: part.bold ? "700" : "400",
                }}
              >
                {part.text}
              </Typography>
            ))}
          </Typography>

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              backgroundColor: "#F98C6B",
              "&:hover": { backgroundColor: "#f9846b" },
            }}
          >
            OK
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AlertBoxComponent;
