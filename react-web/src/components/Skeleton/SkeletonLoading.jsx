import React from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* Logo Skeleton */}
      <Skeleton
        variant="rectangular"
        width={120}
        height={50}
        sx={{ borderRadius: "8px" }}
      />

      {/* Title Skeleton */}
      <Skeleton
        variant="text"
        width="60%"
        height={30}
        sx={{ borderRadius: "4px" }}
      />

      {/* Product Skeletons */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {Array.from(new Array(10)).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Product Image Skeleton */}
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ borderRadius: "8px" }}
            />
            {/* Product Title Skeleton */}
            <Skeleton variant="text" width="80%" height={20} />
            {/* Price Skeleton */}
            <Skeleton variant="text" width="50%" height={20} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SkeletonLoading;
