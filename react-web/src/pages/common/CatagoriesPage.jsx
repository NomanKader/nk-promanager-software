import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from '../../theme.js';
import UserNavbarComponent from '../../components/Navbar/UserNavbarComponent.jsx';
import CatagoriesForm from '../../components/Card/Catagories/CatagoriesForm.jsx';
import UserHomeProductCardComponent from '../../components/Card/UserHomeProductCardComponent.jsx';
import { GetProductAPI } from '../../api/product/ProductController'; // Import your API method
import { _fetchCategoriesService } from '../../service/MasterDataService.js';


export default function CatagoriesPage({ history }) {
  const [selectedCatagory, setSelectedCatagory] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    
   _fetchCategoriesService(setCategoriesList,setIsLoading)
  }, []);

  // Log selected category when it changes
  useEffect(() => {
    console.log('Selected Category:', selectedCatagory);
    if(selectedCatagory  !== ""){
      history.push({
        pathname: "categoriesDetail",
        state: { title: selectedCatagory }, 
      });
    }
   
  }, [selectedCatagory]);

  return (
    <ThemeProvider theme={theme}>
      <UserNavbarComponent history={history} />
      {isLoading ? (
        <p>Loading Categories...</p>
      ): (
        <CatagoriesForm
          setSelectedCatagory={setSelectedCatagory}
          categoriesList={categoriesList} 
          history={history}
        />
      )}
    </ThemeProvider>
  );
}
