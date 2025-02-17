import React, { useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import loveIcon from '../../../assets/icons/love.png'
import theme from '../../../theme';
import welcomePic1 from "../../../assets/images/WelcomeImage1.png"
import welcomePic2 from '../../../assets/images//WelcomeImage2.png'
import welcomePic3 from '../../../assets/images//WelcomeImage3.png'

function AboutUsWelcomeComponent() {

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "20px",
        display: 'flex',
        flexDirection: "column",
        gap: "100px",
        height: "auto",
        marginBottom: "100px"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? 'column' : "row"
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: "10px",
            flexDirection: "column",
            width: isMobile ? "100%" : "70%"
          }}
        >
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontFamily: `'Instrument Sans', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
              fontSize: isMobile ? "16px" : "29px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Welcome to our shop
            <img
              src={loveIcon}
              alt="love icon"
              style={{
                width: "30px",
                height: "30px",
                marginLeft: "8px",
              }}
            />
          </Typography>
          <Typography
            variant='p'
            sx={{
              fontSize: isMobile ? '16px' : '20px',
              color: theme.palette.primary.main,
              fontWeight: "700",
            }}
          >
            Our Story
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: `'Roboto', 'Instrument Sans', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
              fontSize: isMobile ? "12px" : '15px',
              lineHeight: 2,
              textAlign: 'justify',

            }}
          >
            The roots of our Candy & Peach were planted in December 18, 2017 which born out of a passion for fashion that tells a story and it is founded by Candysu. With a deep love for creativity, craftsmanship, and sustainability, we set out on a mission to build a clothing line that would empower people while respecting the planet. What started as a small, dream-driven project has since grown into a thriving community of fashion lovers who share our commitment to quality, ethics, and style. Every stitch, every fabric choice, and every design reflects our dedication to crafting timeless pieces that make feel our customer best.
          </Typography>

        </Box>

        <Box
          sx={{
            width: isMobile ? "100%" : "70%",
            height: "auto"
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%', // Adjust the width of the container
              height: '200px', // Adjust the height of the container
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Horizontal Line */}
            <Box
              sx={{
                position: 'absolute',
                bottom: isMobile ? "-17%" : "-81%",
                left: isMobile ? '-4%' : "34%",
                width: isMobile ? '260px' : '385px',
                height: '1.5px', // Thickness of the line
                backgroundColor: theme.palette.primary.main, // Line color
                margin: "0"
              }}
            />
            {/* Vertical Line */}
            <Box
              sx={{
                position: 'absolute',
                right: isMobile ? "37.6%" : "-0.4%",
                bottom: isMobile ? "-30%" : "-93%",
                width: '1.5px', // Thickness of the line
                height: isMobile ? "260px" : '385px',
                backgroundColor: theme.palette.primary.main, // Line color
                margin: "0"
              }}
            />

            {/* Image positioned at the intersection of the lines */}
            <Box
              sx={{
                position: 'absolute',
                top: '11%',
                left: isMobile ? '0' : '39%',
                marginLeft: "5px"
              }}
            >
              <img
                src={welcomePic1}// Replace with your image path
                alt="welcomePic1"
                style={{
                  width: isMobile ? '61%' : '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Box>
        </Box>

      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row-reverse",
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: "10px",
            flexDirection: "column",
            width: isMobile ? "100%" : "65%",
            justifyContent: "center",
            paddingTop: "40px"
          }}
        >
          <Typography
            variant='p'
            sx={{
              fontSize: isMobile ? '16px' : '20px',
              color: theme.palette.primary.main,
              fontWeight: "700",
            }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: `'Roboto', 'Instrument Sans', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
              fontSize: '15px',
              lineHeight: 2,
              textAlign: 'justify',

            }}
          >
            At the heart of Candy & Peach is a simple mission: to create fashion that makes a difference. We believe that style should never come at the expense of the environment or people. That’s why we focus on creating high-quality with fair price, sustainable clothing using ethically sourced materials and responsible production methods. From the beginning, we’ve made it our goal to prioritize sustainability, minimize waste, and ensure fair wages for everyone involved in the production process. By choosing us, you’re not just choosing fashion—you’re supporting a movement toward a more ethical and conscious fashion industry.
          </Typography>

        </Box>

        <Box
          sx={{
            width: isMobile ? "100%" : "70%",
            height: "auto"
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '70%', // Adjust the width of the container
              height: '200px', // Adjust the height of the container
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Horizontal Line */}
            <Box
              sx={{
                position: 'absolute',
                top: "9.8%",
                right: isMobile? "1%" : "5%",
                width: '395px',
                height: '1.5px', // Thickness of the line
                backgroundColor: theme.palette.primary.main, // Line color
                margin: "0"
              }}
            />
            {/* Vertical Line */}
            <Box
              sx={{
                position: 'absolute',
                left: "-0.5%",
                bottom: isMobile? "-45%" : "-95%",
                width: '1.5px', // Thickness of the line
                height: isMobile? "290px" : '385px',
                backgroundColor: theme.palette.primary.main, // Line color
                margin: "0"
              }}
            />

            {/* Image positioned at the intersection of the lines */}
            <Box
              sx={{
                position: 'absolute',
                top: '11%',
                right: '39%',
                margin: "0"
              }}
            >
              <img
                src={welcomePic2}// Replace with your image path
                alt="welcomePic1"
                style={{
                  width: '150%',
                  height: 'auto',
                }}
              />
            </Box>
          </Box>
        </Box>

      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? 'column' : "row"
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: "10px",
            flexDirection: "column",
            width: isMobile ? "100%" : "69%",
            paddingTop: "50px"
          }}
        >

          <Typography
            variant='p'
            sx={{
              fontFamily: `'Instrument Sans', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
              fontSize: isMobile ? "16px" : "29px",
              color: theme.palette.primary.main,
              fontWeight: "700",
            }}
          >
            Our Values
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: `'Roboto', 'Instrument Sans', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
              fontSize: isMobile ? "12px" : '15px',
              lineHeight: 2,
              textAlign: 'justify',

            }}
          >
            We strive to make a positive impact on the environment through every choice we make, from eco-conscious materials to responsible manufacturing. We believe in being open about our processes, from where we source our fabrics to how our clothes are made. Our customers deserve to know the story behind their wardrobe. Through fashion, we aim to inspire confidence, self-expression, and empowerment for all our customers.
          </Typography>

        </Box>
        
        <Box
          sx={{
            width: isMobile ? "100%" : "70%",
            height: "auto"
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%', // Adjust the width of the container
              height: '200px', // Adjust the height of the container
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Horizontal Line */}
            <Box
              sx={{
                position: 'absolute',
                bottom: isMobile ? "-9%" : "-68%",
                left: isMobile ? '-4%' : "34%",
                width: isMobile ? '260px' : '385px',
                height: '1.5px', // Thickness of the line
                backgroundColor: theme.palette.primary.main, // Line color
                margin: "0"
              }}
            />
            {/* Vertical Line */}
            <Box
              sx={{
                position: 'absolute',
                right: isMobile ? "37.6%" : "-0.4%",
                bottom: isMobile ? "-30%" : "-82%",
                width: '1.5px', // Thickness of the line
                height: isMobile ? "260px" : '385px',
                backgroundColor: theme.palette.primary.main, // Line color
                margin: "0"
              }}
            />

            {/* Image positioned at the intersection of the lines */}
            <Box
              sx={{
                position: 'absolute',
                top: '11%',
                left: isMobile ? '0' : '39%',
                marginLeft: "5px"
              }}
            >
              <img
                src={welcomePic3}// Replace with your image path
                alt="welcomePic1"
                style={{
                  width: isMobile ? '61%' : '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Box>
        </Box>
        
      </Box>
    </Box>

  )
}

export default AboutUsWelcomeComponent