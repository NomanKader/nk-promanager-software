import * as React from "react";
import { Box, Link, Typography, useTheme, useMediaQuery } from "@mui/material";
import webLogo from '../../assets/icons/website-logo.png';
import fbLogo from '../../assets/icons/facebook-logo.png';
import theme from '../../theme';

const navItems = [
  { id: "01", label: "Home" },
  { id: "02", label: "About Us" },
  { id: "03", label: "Contact Us" },
  { id: "04", label: "Categories" }
];

export function NavigationLinks() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <nav>
      <Box sx={{ marginLeft: isMobile ? '20px' : '40px', padding: isMobile ? '20px 10px' : '35px 26px' }}>
        {navItems.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 'clamp(10px, 1.5vw, 12px)', fontFamily: 'Roboto, sans-serif' }}>
              {item.id}
            </Typography>
            <Link href={`#${item.label.toLowerCase()}`} sx={{ fontWeight: 400, fontSize: 'clamp(10px, 1.5vw, 12px)', fontFamily: 'Amiko, sans-serif', textDecoration: 'none', color: 'inherit', '&:hover': { textDecoration: 'underline' } }}>
              {item.label}
            </Link>
          </Box>
        ))}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
          <Link sx={{ fontWeight: 400, fontSize: 'clamp(10px, 1.5vw, 12px)', fontFamily: 'Amiko, sans-serif', textDecoration: 'none', color: 'inherit', '&:hover': { textDecoration: 'none' } }}>
            Join our facebook Page:
          </Link>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <img src={fbLogo} alt="facebook logo" style={{ width: '18px', objectFit: 'contain' }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
          <Link sx={{ fontWeight: 400, fontSize: 'clamp(10px, 1.5vw, 12px)', fontFamily: 'Amiko, sans-serif', textDecoration: 'none', color: 'inherit', '&:hover': { textDecoration: 'none' } }}>
            Powered by NK Software House:
          </Link>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <img src={webLogo} alt="website logo" style={{ width: '18px', objectFit: 'contain' }} />
            <img src={fbLogo} alt="facebook logo" style={{ width: '18px', objectFit: 'contain' }} />
          </Box>
        </Box>
      </Box>
    </nav>
  );
}