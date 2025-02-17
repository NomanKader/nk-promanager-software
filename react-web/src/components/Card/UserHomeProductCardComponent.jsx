import React, { useState } from 'react';
import TitleComponent from '../Title/TitleComponent.jsx';
import { Box, Button, useMediaQuery, FormGroup, FormControlLabel, Checkbox, Fab } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import ProductCard from './ProductCard.jsx';
import CommonButtonComponent from '../Button/CommonButtonComponent.jsx';

function UserHomeProductCardComponent({
  title,
  data,
  type,
  history,
  showViewAll = true,
}) {
  const [openFilter, setOpenFilter] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  console.log("daat",data)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
        width: "100%",
      }}
    >
      {/* Main Container */}
      <Box
        sx={{
          width: isMobile ? "95%" : "1000px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          paddingLeft: openFilter && !isMobile ? "250px" : "",
          transition: "padding-left 0.3s ease-in-out",
        }}
      >
        {type === "catagories" && (
          <>
            {!isMobile ? (
              // Desktop Filter
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#000000",
                    fontSize: "19px",
                    fontFamily:
                      "'Amiko',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                  }}
                  onClick={() => setOpenFilter(!openFilter)}
                >
                  <TuneRoundedIcon />
                  Filter
                </Button>
                {openFilter && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50px",
                      left: 0,
                      width: "200px",
                      height: "auto",

                      transform: openFilter ? "scaleY(1)" : "scaleY(0)",
                      transformOrigin: "top",
                      opacity: openFilter ? 1 : 0,
                      transition:
                        "transform 1s ease-in-out 1s, opacity 1s ease-out 0.3s",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "20px",
                        fontFamily:
                          "'Anek Malayalam',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                      }}
                    >
                      Size
                    </p>
                    <FormGroup
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "0.5fr 1fr",
                        width: "300px",
                      }}
                    >
                      <FormControlLabel control={<Checkbox />} label="XS" />
                      <FormControlLabel control={<Checkbox />} label="L" />
                      <FormControlLabel control={<Checkbox />} label="S" />
                      <FormControlLabel control={<Checkbox />} label="XL" />
                      <FormControlLabel control={<Checkbox />} label="M" />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Free Size"
                      />
                    </FormGroup>

                    <p
                      style={{
                        fontSize: "20px",
                        fontFamily:
                          "'Anek Malayalam',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                      }}
                    >
                      Price Range
                    </p>
                    <FormGroup
                      sx={{
                        width: "300px",
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Below 10,000 MMK "
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="10,000 MMK - 20,000 MMK"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Above 20,000 MMK"
                      />
                    </FormGroup>

                    <p
                      style={{
                        fontSize: "20px",
                        fontFamily:
                          "'Anek Malayalam',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                      }}
                    >
                      Fabric / Material
                    </p>
                    <FormGroup
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "0.5fr 1fr",
                        width: "300px",
                      }}
                    >
                      <FormControlLabel control={<Checkbox />} label="Cotton" />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Polyester"
                      />
                      <FormControlLabel control={<Checkbox />} label="Silk" />
                      <FormControlLabel control={<Checkbox />} label="Linen" />
                      <FormControlLabel control={<Checkbox />} label="Satin" />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Wool / Blends"
                      />
                      <FormControlLabel control={<Checkbox />} label="Denim" />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Faux Leather"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Chiffon"
                      />
                      <FormControlLabel control={<Checkbox />} label="Lace" />
                    </FormGroup>
                  </Box>
                )}
              </Box>
            ) : (
              // Mobile Filter - FAB Button and Slide-In Panel
              <>
                <Fab
                  color="primary"
                  aria-label="filter"
                  sx={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 1100,

                    color: "#fff",
                  }}
                  onClick={() => setOpenFilter(!openFilter)}
                >
                  <TuneRoundedIcon />
                </Fab>

                {/* Sliding Filter Panel */}
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    height: "100%",
                    width: "250px",
                    backgroundColor: "#ffffff",
                    boxShadow: "-2px 0 5px rgba(0,0,0,0.2)",
                    transform: openFilter
                      ? "translateX(0)"
                      : "translateX(100%)",
                    transition: "transform 0.3s ease-in-out",
                    zIndex: 1000,
                    paddingTop: "150px",
                    padding: "100px 0 0 25px",
                    overflow: "scroll",
                  }}
                >
                  <p
                    style={{
                      fontSize: isMobile ? "16px" : "20px", // Reduce font size for mobile
                      fontFamily:
                        "'Anek Malayalam',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                    }}
                  >
                    Size
                  </p>
                  <FormGroup
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "0.5fr 1fr",
                      width: "300px",
                    }}
                  >
                    <FormControlLabel control={<Checkbox />} label="XS" />
                    <FormControlLabel control={<Checkbox />} label="L" />
                    <FormControlLabel control={<Checkbox />} label="S" />
                    <FormControlLabel control={<Checkbox />} label="XL" />
                    <FormControlLabel control={<Checkbox />} label="M" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Free Size"
                    />
                  </FormGroup>

                  <p
                    style={{
                      fontSize: isMobile ? "16px" : "20px", // Reduce font size for mobile
                      fontFamily:
                        "'Anek Malayalam',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                    }}
                  >
                    Price Range
                  </p>
                  <FormGroup
                    sx={{
                      width: "300px",
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Below 10,000 MMK "
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="10,000 MMK - 20,000 MMK"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Above 20,000 MMK"
                    />
                  </FormGroup>

                  <p
                    style={{
                      fontSize: isMobile ? "16px" : "20px", // Reduce font size for mobile
                      fontFamily:
                        "'Anek Malayalam',Inter', 'Segoe UI', 'Oxygen', 'Ubuntu', sans-serif",
                    }}
                  >
                    Fabric / Material
                  </p>
                  <FormGroup
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "0.5fr 1fr",
                      width: "300px",
                    }}
                  >
                    <FormControlLabel control={<Checkbox />} label="Cotton" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Polyester"
                    />
                    <FormControlLabel control={<Checkbox />} label="Silk" />
                    <FormControlLabel control={<Checkbox />} label="Linen" />
                    <FormControlLabel control={<Checkbox />} label="Satin" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Wool / Blends"
                    />
                    <FormControlLabel control={<Checkbox />} label="Denim" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Faux Leather"
                    />
                    <FormControlLabel control={<Checkbox />} label="Chiffon" />
                    <FormControlLabel control={<Checkbox />} label="Lace" />
                  </FormGroup>
                </Box>
              </>
            )}
          </>
        )}
        <TitleComponent Title={title} />
      </Box>

      {/* Product Cards */}
      <Box
        sx={{
          display: "flex",
          width: isMobile ? "95%" : "972px",
          flexDirection: "row",
          justifyContent: isMobile ? "center" : "flex-start",
          rowGap: "20px",
          columnGap: isMobile ? "50px" : "80px",
          marginTop: "20px",
          flexWrap: "wrap",
          marginLeft: openFilter && !isMobile ? "250px" : "",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <ProductCard data={data} type={type} history={history} />
      </Box>

      {showViewAll && (
        <CommonButtonComponent
          children={"View All"}
          sx={{
            borderRadius: "6px",
            width: "100px",
            marginTop: "0",
          }}
          onClick={() => {
            history.push({
              pathname: "categoriesDetail",
              state: { title: title }, 
            });          
          }}
        />
      )}
    </Box>
  );
}

export default UserHomeProductCardComponent;
