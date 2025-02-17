import React, { useState, useRef, useEffect, memo } from "react";
import { Box, List, ListItem, useMediaQuery } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import theme from "../../theme";

const UserCategoriesNavbar = memo(
  ({ setSelectedCategory, categoriesList, initialCategory }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listItemRefs = useRef([]);

    // Set initial selected category based on `initialCategory` prop
    useEffect(() => {
      if (initialCategory && categoriesList.length > 0) {
        const initialIndex = categoriesList.indexOf(initialCategory);
        if (initialIndex !== -1) {
          setSelectedIndex(initialIndex);
          setSelectedCategory(categoriesList[initialIndex]);
        }
      }
    }, [initialCategory, categoriesList, setSelectedCategory]);

    const handleArrowClick = () => {
      const nextIndex =
        selectedIndex < categoriesList.length - 1 ? selectedIndex + 1 : 0;
      setSelectedIndex(nextIndex);
      setSelectedCategory(categoriesList[nextIndex]);

      if (isMobile && listItemRefs.current[nextIndex]) {
        listItemRefs.current[nextIndex].scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    };

    const handleItemClick = (index) => {
      setSelectedIndex(index);
      setSelectedCategory(categoriesList[index]);

      if (isMobile && listItemRefs.current[index]) {
        listItemRefs.current[index].scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: isMobile ? "auto" : "visible",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {categoriesList.map((category, index) => (
            <ListItem
              key={index}
              ref={(el) => (listItemRefs.current[index] = el)}
              onClick={() => handleItemClick(index)}
              sx={{
                cursor: "pointer",
                width: isMobile ? "auto" : "fit-content", // Automatically adjust to fit content
                padding: isMobile ? "10px" : "15px",
                borderBottom:
                  selectedIndex === index ? "2px solid #F98C6B" : "none",
                color: selectedIndex === index ? "#F98C6B" : "inherit",
                whiteSpace: "nowrap", // Ensure text stays on one line
                overflow: "visible", // Ensure text is fully visible
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  padding: "5px 10px",
                  backgroundColor:
                    selectedIndex === index ? "#F98C6B30" : "transparent",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              >
                {category}
              </Box>
            </ListItem>
          ))}
        </List>
        <Box onClick={handleArrowClick}>
          <ArrowForwardIosIcon sx={{ cursor: "pointer" }} />
        </Box>
      </Box>
    );
  }
);

export default UserCategoriesNavbar;
