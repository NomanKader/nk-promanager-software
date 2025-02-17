import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import BedIcon from '../../assets/icons/Bed.png';
import ShowerIcon from '../../assets/icons/Shower.png';
import widthIcon from '../../assets/icons/Width.png';
import Location from '../../assets/icons/Location.png';

const UserProductSkeletonLoader = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', marginTop: '10px' }}>
      {[...Array(3)].map((_, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            height: 'auto',
            width: '80%',
            padding: '1%',
            marginBottom: '20px',
            borderRadius: '25px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
        >
          {/* Picture and Detail */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            borderBottom: '1px solid #1D1B201F',
            paddingBottom: '5px'
          }}>
            <Skeleton variant="rectangular" width="50%" height={150} sx={{ aspectRatio: '1/1' }} />

            <Box sx={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Price */}
              <Box
                className="Price"
                sx={{ display: 'flex', justifyContent: 'left', gap: "5px", alignItems: 'flex-end' }}
              >
                <Skeleton variant="text" sx={{ fontSize: '40px', fontWeight: '500' }} />
                <Skeleton variant="text" width={40} />
                <Skeleton variant="text" width={80} />
              </Box>

              {/* Icon for Show */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid #C2C2C2',
                gap: '20px',
                width: '50%',
                paddingBottom: '10px'
              }}>
                <Box className="bed">
                  <Skeleton variant="rectangular" width={25} height={25} />
                  <Skeleton variant="text" width={40} />
                </Box>

                <Box className="shower">
                  <Skeleton variant="rectangular" width={25} height={25} />
                  <Skeleton variant="text" width={40} />
                </Box>

                <Box className="width">
                  <Skeleton variant="rectangular" width={25} height={25} />
                  <Skeleton variant="text" width={40} />
                </Box>
              </Box>

              {/* State and Type */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '10px',
                gap: '5px'
              }}>
                <Skeleton variant="text" width={60} height={20} />
                <Skeleton variant="text" width={60} height={20} />
              </Box>

              {/* Location */}
              <Box
                className="Location"
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '5px',
                  marginBottom: '5px'
                }}
              >
                <Skeleton variant="rectangular" width={11} height={15} />
                <Skeleton variant="text" width={100} />
              </Box>

              {/* Title */}
              <Skeleton variant="text" width={300} height={20} sx={{ marginBottom: '20px', marginTop: '20px' }} />

              {/* Description */}
              <Skeleton variant="text" width={150} height={15} />

              {/* Created Date */}
              <Skeleton variant="text" width={200} height={15} sx={{ marginTop: '40px' }} />
            </Box>
          </Box>

          {/* Card Footer Function */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingY: '15px'
          }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '5px'
            }}>
              <Skeleton variant="rectangular" width={50} height={25} />
              <Skeleton variant="text" width={120} />
            </Box>

            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '5px'
            }}>
              <Skeleton variant="rectangular" width={170} height={40} />
              <Skeleton variant="rectangular" width={150} height={40} />
            </Box>
          </Box>
        </Box>
      ))}
    </div>
  );
};

export default UserProductSkeletonLoader;
