import React from 'react';
import theme from '../../theme';
import { ThemeProvider } from '@mui/material';
import UserNavbarComponent from '../../components/Navbar/UserNavbarComponent';
import PaymentMethodComponents from '../../components/Card/Payment/PaymentMethodComponents';
import { useLocation } from 'react-router-dom';

const PaymentPage = ({ history }) => {
  const location = useLocation();
  const formData = location.state?.formData;
  const total = location.state?.total;


  return (
    <>
      <ThemeProvider theme={theme}>
        <PaymentMethodComponents history={history} formData={formData} total={total} />
      </ThemeProvider>
    </>
  );
};

export default PaymentPage;
