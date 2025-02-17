import React from 'react';
import { Box, useMediaQuery, Typography, Link } from '@mui/material';
import theme from '../../theme';
import CustomHighlightedBox from '../Box/CustomHighlightedBox.jsx';

function LocationComponents() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: isMobile ? "10px" : "20px", // Add padding for mobile
      }}
    >
      <CustomHighlightedBox title={"Discover More: Explore Our Partner Stores Today!"} />

      {/* Shop Locations Section */}
      <Box
        sx={{
          width: "100%",
          display: 'flex',
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row', // Stack vertically for mobile
          gap: isMobile ? "10%" : "20%", // Adjust gap between elements for mobile
          alignItems: isMobile ? 'flex-start' : 'flex-start', // Center align for mobile
        }}
      >
        {/* First Shop */}
        <Box
          sx={{
            height: 'auto',
            textAlign: isMobile ? 'left' : 'left', // Center text on mobile
            padding: isMobile ? '10px' : '0',
            display: "flex",
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <Typography variant="h4" sx={{ fontSize: '15px', fontWeight: 700 }}>
            J&P
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`, fontSize: '12px' }}>
            Shop Address: 73st bet 105st 106st
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`, fontSize: '12px' }}>
            Mingalar Mandalay Block 3#12, First Floor, Chan Mya Thar Si
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`, fontSize: '12px' }}>
            Township, Mandalay, Myanmar
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`, fontSize: '12px' }}>
            (Ground Floor မှာ PLA Clothing ရှိပါတယ် J&P က ပထမထပ်မှာပါရှင့်)
          </Typography>
        </Box>

        {/* Second Shop */}
        <Box
          sx={{
            height: 'auto',
            textAlign: isMobile ? 'left' : 'left', // Center text on mobile
            padding: isMobile ? '10px' : '0',
            display: "flex",
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <Typography variant="h4" sx={{ fontSize: '15px', fontWeight: 700 }}>
            19/22 Closet
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`, fontSize: '12px' }}>
            Shop Address: No (24) A, 6th Street, Myoma Ohobo Ward,
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`, fontSize: '12px' }}>
            Magway, Myanmar
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`, fontSize: '12px' }}>
            Open Hours: 9:00 A.M. - 6:00 P.M.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: `'Myanmar Text','Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
              fontSize: '12px',
              color: "#515151"
            }}
          >
            Contact: 
            <Link
              href="tel:09763332882"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              09763332882
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default LocationComponents;
