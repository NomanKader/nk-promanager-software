import React from 'react';
import { Card, Box, Skeleton } from '@mui/material';

const SkeletonCard = () => {
  return (
    <Card
      sx={{
        width: 200, // Fixed width for the card
        height: 300, // Fixed height for the card
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: '#f9f9f9',        
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Skeleton variant="rectangular" width="100%" height={120} />
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="60%" height={20} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </Card>
  );
};

const SkeletonCardComponent = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 200px)', // 3 fixed columns of 200px width
        justifyContent: 'space-around', // Center the grid container
        gap: 2, // Space between cards (columns and rows)
        marginTop: 4,        
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </Box>
  );
};

export default SkeletonCardComponent;
