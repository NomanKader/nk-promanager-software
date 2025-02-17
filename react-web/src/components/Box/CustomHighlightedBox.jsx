import React from 'react';
import { Box } from '@mui/material';

const CustomHighlightedBox = ({ title, sx }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        fontFamily: `'Amiko', 'Roboto', 'Instrument Sans', sans-serif`,
        fontWeight: 700,
        fontSize: { xs: '14px', sm: '15px' }, // Responsive font size
        textAlign: 'center',
        padding: '26px',
        margin: '20px 0',
        background: 'white',
        ...sx,
      }}
    >
      {title}
      {/* Top Left Corner Decorations */}
      <Box
        component="span"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '45px',
          height: '2px',
          background: 'linear-gradient(to right, rgba(249,140,107,1), rgba(172,37,130,0))',
        }}
      />
      <Box
        component="span"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '2px',
          height: '37px',
          background: 'linear-gradient(to bottom, rgba(249,140,107,1), rgba(172,37,130,0))',
        }}
      />
      {/* Bottom Right Corner Decorations */}
      <Box
        component="span"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '45px',
          height: '2px',
          background: 'linear-gradient(to left, rgba(249,140,107,1), rgba(172,37,130,0))',
        }}
      />
      <Box
        component="span"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '2px',
          height: '37px',
          background: 'linear-gradient(to top, rgba(249,140,107,1), rgba(172,37,130,0))',
        }}
      />
    </Box>
  )
}

export default CustomHighlightedBox