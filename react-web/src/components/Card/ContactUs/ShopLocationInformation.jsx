import React from 'react';
import { Box, Typography, useMediaQuery, Link } from '@mui/material';
import theme from '../../../theme';

const ShopLocationInformation = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "20px" : ''
      }}
    >
      {/* Shop 1 */}
      <Box
        sx={{
          width: isMobile ? "100%" : "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: "5px"
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: '400', marginBottom: '10px', fontSize: isMobile ? "14px" : "18px" }}>
          Shop - 1
        </Typography>
        <Typography
          sx={{
            fontSize: isMobile ? "10px" : "16px",
            fontFamily: `'Roboto', sans-serif`,
            color: theme.palette.text.secondary,
            lineHeight: '1.7'
          }}
        >
          No. 47, Mingalar Street Between Park Street and Sayar Tun Linn Street, San Chaung, Yangon, Myanmar
        </Typography>
        <Typography sx={{ color: theme.palette.primary.text, fontSize: isMobile ? "10px" : "16px" }}>
          9:00 A.M. - 6:00 P.M. (Monday to Sunday)
        </Typography>
        <Link
          href="tel:09753532277"
          sx={{
            fontSize: isMobile ? "10px" : "16px",
            color: "#515151",
            textDecoration: "none",
            '&:hover': { textDecoration: "underline" }
          }}
        >
          09753532277
        </Link>
      </Box>

      {/* Shop 2 */}
      <Box
        sx={{
          width: isMobile ? "100%" : "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: "5px"
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: '400', marginBottom: '10px', fontSize: isMobile ? "14px" : "18px" }}>
          Shop - 2
        </Typography>
        <Typography
          sx={{
            fontSize: isMobile ? "10px" : "16px",
            fontFamily: `'Roboto', sans-serif`,
            color: theme.palette.text.secondary,
            lineHeight: '1.7'
          }}
        >
          In front of Sayar San Street, Upper Market, Near Duu Won Cafe, Aung Pan, Myanmar
        </Typography>
        <Typography sx={{ color: theme.palette.primary.text, fontSize: isMobile ? "10px" : "16px" }}>
          9:00 A.M. - 6:00 P.M. (Monday to Sunday)
        </Typography>
        <Link
          href="tel:09982446752"
          sx={{
            fontSize: isMobile ? "10px" : "16px",
            color: "#515151",
            textDecoration: "none",
            '&:hover': { textDecoration: "underline" }
          }}
        >
          09982446752
        </Link>
      </Box>

      {/* Shop 3 */}
      <Box
        sx={{
          width: isMobile ? "100%" : "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          gap: "5px"
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: '400', marginBottom: '10px', fontSize: isMobile ? "14px" : "18px" }}>
          Shop - 3
        </Typography>
        <Typography
          sx={{
            fontSize: isMobile ? "10px" : "16px",
            fontFamily: `'Roboto', sans-serif`,
            color: theme.palette.text.secondary,
            lineHeight: '1.7'
          }}
        >
          Kyaundaw Anauk Street, Kanthar (1) Quarter, Nyaung Shwe, Opposite the Taunggyi Bus Gate (East Side), Nyaung Shwe Town, Shan State
        </Typography>
        <Typography sx={{ color: theme.palette.primary.text, fontSize: isMobile ? "10px" : "16px" }}>
          9:00 A.M. - 6:00 P.M. (Monday to Sunday)
        </Typography>
        <Link
          href="tel:09982446752"
          sx={{
            fontSize: isMobile ? "10px" : "16px",
            color: "#515151",
            textDecoration: "none",
            '&:hover': { textDecoration: "underline" }
          }}
        >
          09982446752
        </Link>
      </Box>
    </Box>
  );
};

export default ShopLocationInformation;
