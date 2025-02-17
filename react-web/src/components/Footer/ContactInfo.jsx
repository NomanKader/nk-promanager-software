import * as React from "react";
import { Box, Typography, Divider, Link, useMediaQuery } from "@mui/material";
import logo from '../../assets/icons/logo.png';
import email from '../../assets/icons/email.png';
import phone from '../../assets/icons/phone.png';
import locationIcon from '../../assets/icons/location.png';
import clock from '../../assets/icons/clock.png';
import theme from '../../theme';

const locations = [
  {
    id: 1,
    address: "Shop (1) - No. 47, Mingalar Street (Between Park Street and Sayar Tun Linn Street), Sanchaung, Yangon, Myanmar"
  },
  {
    id: 2,
    address: "Shop (2) - In front of Sayar San Street, Upper Market, Near Duu Won Cafe, Aung Pan, Myanmar"
  },
  {
    id: 3,
    address: "Shop (3) - Kyaundaw Anauk Street, Kanthar (1) Quarter, Nyaung Shwe, Opposite the Taunggyi Bus Gate (East Side), Nyaung Shwe Town, Shan State"
  }
];

export function ContactInfo() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section>
      <Box sx={{ textAlign: 'justify', marginLeft: isMobile ? '20px' : '40px', display: 'flex', gap: 2 }}>
        <img src={logo} alt="Candy & Peach Clothing logo" style={{ width: 99, objectFit: 'contain' }} />
        <Typography variant="h6" sx={{ alignSelf: 'center', fontFamily: "Amiko" }}>
          Candy & Peach Clothing
        </Typography>
      </Box>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box sx={{ marginLeft: isMobile ? '20px' : '40px' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: isMobile ? '14px' : '16px', marginLeft: isMobile ? 0 : 2 }}>
          Connect With Us
        </Typography>
      </Box>
      <Box sx={{ marginLeft: isMobile ? '20px' : '40px', display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
        {locations.map((location) => (
          <Box key={location.id} sx={{ display: 'flex', gap: 2, paddingX: 2, fontSize: '12px', fontFamily: 'Roboto, sans-serif' }}>
            <img src={locationIcon} alt="Location icon" style={{ width: 20, objectFit: 'contain' }} />
            <Typography variant="body2">{location.address}</Typography>
          </Box>
        ))}

        <Box sx={{ display: 'flex', gap: 2, paddingX: 2, fontSize: '12px', alignItems: 'center' }}>
          <img src={clock} alt="Clock icon" style={{ width: 18, objectFit: 'contain' }} />
          <Typography variant="body2">9:00 A.M. - 6:00 P.M. (Monday to Sunday)</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, paddingX: 2, fontSize: '12px', alignItems: 'center' }}>
          <img src={phone} alt="Phone icon" style={{ width: 18, objectFit: 'contain' }} />
          <Link href="tel:09753532277" sx={{ textDecoration: 'none', color: 'inherit' }}>
            09753532277
          </Link>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, paddingX: 2, fontSize: '12px', alignItems: 'center' }}>
          <img src={email} alt="Email icon" style={{ width: 18, objectFit: 'contain' }} />
          <Link href="mailto:candypeachlocal@gmail.com" sx={{ textDecoration: 'none', color: 'inherit' }}>
            candypeachlocal@gmail.com
          </Link>
        </Box>
      </Box>
    </section>
  );
}
