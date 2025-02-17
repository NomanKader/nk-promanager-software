import React, { useEffect, useState } from "react";
import UserHomeProductCardComponent from "../../components/Card/UserHomeProductCardComponent";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import { GetProductAPI } from "../../api/product/ProductController";
import SkeletonLoading from "../../components/Skeleton/SkeletonLoading";
import UserCatagoriesNavbar from "../../components/Navbar/UserCatagoriesNavbar";
import { _fetchCategoriesService } from "../../service/MasterDataService";
import NoDataComponent from "../../components/NoData/NoDataComponent";

export default function CategoriesDetailPage({ history }) {
  const location = useLocation();
  const { title } = location.state || {};
  const [data, setData] = useState([]); // Product data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [categoriesList, setCategoriesList] = useState([]); // Categories list
  const [selectedCategory, setSelectedCategory] = useState(title); // Current selected category

  // Fetch categories
  useEffect(() => {
    _fetchCategoriesService(setCategoriesList, setIsLoading);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products for the selected category
  useEffect(() => {
    const fetchAccountList = async () => {
      setIsLoading(true); // Set loading to true before fetching
      const postBody = {
        product_Id: 0,
        size: [],
        color: [],
        category: selectedCategory,
        priceRange: "",
      };
      await GetProductAPI(postBody, setData, setIsLoading);
    };
    fetchAccountList();
  }, [selectedCategory]);
  const renderNoDataFallback = () => (
    <renderNoDataFallback/>
  );

  return (
    <ThemeProvider theme={theme}>
      {/* Navbar */}
      <UserNavbarComponent history={history} />

      {/* Categories Navbar */}
      <UserCatagoriesNavbar
        initialCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoriesList={categoriesList}
      />

      {/* Main Content */}
      {isLoading ? (
        // Show SkeletonLoading while fetching data
        <SkeletonLoading />
      ) : (
        <>
          {data.length > 0 ? (
            <UserHomeProductCardComponent
              title={selectedCategory}
              data={data}
              history={history}
              showViewAll={false}
            />
          ) : (
            renderNoDataFallback()
          )}
        </>
      )}
    </ThemeProvider>
  );
}
