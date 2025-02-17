import { Box, useMediaQuery, Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
import React from 'react';
import theme from '../../../theme.js';
import CustomHighlightedBox from '../../Box/CustomHighlightedBox.jsx';
import NewArrival from '../../../assets/images/catagories/NewAvaliable.png';
import Top from '../../../assets/images/catagories/Top.png';
import Skirt from '../../../assets/images/catagories/Bottoms.png';
import Dress from '../../../assets/images/catagories/OneSet.png';
import BestSeller from '../../../assets/images/catagories/BestSeller.png';

// Mapping of category titles to image URLs
const categoryImageMap = {
  "New Arrivals": NewArrival,
  "Tops": Top,
  "Skirts": Skirt,
  "Dresses and One Sets": Dress,
  "Best Sellers": BestSeller,
};

const CatagoriesForm = ({ setSelectedCatagory, categoriesList, history }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: isMobile ? "95%" : "1150px",
          flexDirection: "row",
          justifyContent: "center",
          rowGap: "20px",
          columnGap: isMobile ? "50px" : "80px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {categoriesList.map((category, index) => (
          <Card
            key={index}
            sx={{
              width: isMobile ? 140 : 270,
              backgroundColor: "transparent",
              boxShadow: "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: isMobile ? "200px" : "350px",
                width: "100%",
                "&:hover .hoverOverlay": {
                  opacity: 1,
                },
                "&:hover .mainImage": {
                  opacity: 0.5, // Reduce opacity to make both visible
                },
              }}
            >
              <CardMedia
                sx={{
                  width: "100%",
                  height: isMobile ? "200px" : "350px",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
                image={categoryImageMap[category] || "/images/default-category.jpg"} // Fallback for missing images
                className="mainImage"
              />

              <Box
                className="hoverOverlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  background: "rgba(255, 255, 255, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  zIndex: 1,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    zIndex: 2,
                    backgroundColor: theme.button.backgroundColor.main,
                    color: theme.button.textColor.main,
                    textTransform: "capitalize",
                    fontWeight: "700",
                    "&:hover": {
                      backgroundColor: "#ddd",
                    },
                    marginTop: "20px",
                    width: isMobile ? "80px" : "120px",
                    fontSize: isMobile ? "8px" : "15px",
                  }}
                  onClick={() => {
                    setSelectedCatagory(category);
                  }}
                >
                  View All
                </Button>
              </Box>
            </Box>

            <CardContent>
              <CustomHighlightedBox
                title={category}
                sx={{
                  padding: "15px",
                  fontSize: isMobile ? "8px" : "15px",
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CatagoriesForm;
