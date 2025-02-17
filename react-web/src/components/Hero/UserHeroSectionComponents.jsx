import React, { useState } from 'react';
import { Box, useMediaQuery, IconButton } from '@mui/material';
import HeroImage from '../../assets/images/caurosel.png';
import CommonButtonComponent from './../Button/CommonButtonComponent';
import theme from '../../theme';



const images = [
  'https://via.placeholder.com/600x300?text=Image+1',
  'https://via.placeholder.com/600x300?text=Image+2',
  'https://via.placeholder.com/600x300?text=Image+3',
  'https://via.placeholder.com/600x300?text=Image+4',
];

function UserHeroSectionComponents() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <Box>
      {!isMobile ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={HeroImage}
            alt="heroimage"
            style={{
              width: "99%",
              height: "auto",
              maxHeight: "750px",
            }}
          />
          <CommonButtonComponent
            children={"Shop Now"}
            // onClick={onClick}
            sx={{
              position: "absolute",
              top: "65%",
              left: "6.5%",
              fontSize: "16px",
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            margin: 'auto',
            overflow: 'hidden',  // Hide overflowing content
          }}
        >
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.5s ease-in-out',
              transform: `translateX(-${currentIndex * 100}%)`, // Move the image list left/right
            }}
          >
            {/* Map through images and display them in a row */}
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`carousel-${index}`}
                style={{
                  width: '100%',  // Ensure each image takes the full width of the container
                  height: 'auto',
                }}
              />
            ))}
          </Box>

          {/* Next button */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 10,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
          </IconButton>

          {/* Prev button */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 10,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
          </IconButton>
        </Box>
      )
      }
    </Box>
  );
}

export default UserHeroSectionComponents;
