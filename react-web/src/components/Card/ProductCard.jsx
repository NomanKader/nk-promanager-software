import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button,useMediaQuery } from '@mui/material';
import theme from '../../theme.js';


const ProductCard = ({ data, type, history }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleRedirect = (item) => { 
    history.push({
      pathname: "/detail",
      state: { item }, // Pass the item object as part of state
    });
    window.scrollTo(0, 0);  
  };
const getImageUrl = (item,index) => {
    if (!item?.dataLst || !item.dataLst[index]) {
      return ""; // Return an empty string if dataLst or its first item is not available
    }
  
    const baseEndpoint = process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;
    const productId = item.dataLst[index].product_Id;
    const imageName = item.dataLst[index].image;
    const businessName = item.dataLst[index].businessName
  
    if (!baseEndpoint || !productId || !imageName) {
      return ""; // Return an empty string if any required data is missing
    }
    console.log(`${baseEndpoint}/Upload/Ecommerce/${businessName}/${productId}/${imageName}`);
    return `${baseEndpoint}/Upload/Ecommerce/${businessName}/${productId}/${imageName}`;
  };
  
  return (
    <>
      {data.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: isMobile? 140 : 270,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            position: 'relative', 
            overflow: 'hidden',  
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: isMobile? "100px" : '250px',
              width: '100%',
              '&:hover .hoverOverlay': { // Show overlay on hover
                opacity: 1,
              },
              '&:hover .mainImage': { // Hide main image on hover
                opacity: 0,
              },
            }}
          >
            {/* Main Image */}
            <CardMedia
              component="img"
              className="mainImage"
          
              image={getImageUrl(item,0)}
              alt={item.productTitle}
              sx={{
                transition: 'opacity 0.3s ease',
                position: 'absolute',
                width:  '100%',
                height:  '100%',
                objectFit: 'cover',
              }}
            />
            
        
            <Box
              className="hoverOverlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0, 
                transition: 'opacity 0.3s ease',
                background: 'rgba(0, 0, 0, 0.5)', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                zIndex: 1,
              }}
            >
              <CardMedia
                component="img"
            
                image={getImageUrl(item,1) || getImageUrl(item,0)} 
                alt={`${item.productTitle} hover`}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  zIndex: 2,
                  backgroundColor: theme.button.backgroundColor.main,
                  position: "absolute",
                  bottom: isMobile? "10px" : "45px",
                  color: theme.button.textColor.main,
                  textTransform: "capitalize",
                  fontWeight: "700",
                  '&:hover': {
                    backgroundColor: '#ddd',
                  },
                }}
                onClick={() => handleRedirect(item)}
              >
                Shop Now
              </Button>
            </Box>
          </Box>

          <CardContent sx={{ backgroundColor: 'transparent', padding: "10px 0 0 0" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontSize:isMobile?"14px" : '16px',
                fontWeight: '700',
        
              }}
            >
              {item.productTitle}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize:isMobile?"10px" : '16px', fontWeight: '500' }}
            >
              {item.price.toLocaleString()} MMK
            </Typography>
            {item.otherData && (
              <>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize:isMobile?"14px" : '16px',
                    fontWeight: '700',
                    marginTop: '5px',
                  }}
                >
                  {item.otherData.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize:isMobile?"10px" : '16px', fontWeight: '500' }}
                >
                  {item.otherData.price.toLocaleString()} MMK
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ProductCard;
