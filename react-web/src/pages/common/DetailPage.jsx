import React from 'react'
import DetailCardComponent from '../../components/Card/Detail/DetailCardComponent'
import { Typography, Container, ThemeProvider } from '@mui/material';
import theme from '../../theme';
import UserNavbarComponent from '../../components/Navbar/UserNavbarComponent';
import UserCatagoriesNavbar from '../../components/Navbar/UserCatagoriesNavbar';
import UserHeroSectionComponents from '../../components/Hero/UserHeroSectionComponents';
import UserHomeProductCardComponent from '../../components/Card/UserHomeProductCardComponent';
import { data } from '../../sampleData';
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const DetailPage = ({ history }) => {
  const location = useLocation();
  const { item } = location.state || {}; 
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserNavbarComponent history={history} />

        <hr style={{border: "1px solid #F98C6B", width: "90%"}} />
        <DetailCardComponent item={item} history={history}/>
      </ThemeProvider>

    </>
  )
}

export default DetailPage
