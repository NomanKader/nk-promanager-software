import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import HomePage from "./pages/common/HomePage";
import Footer from './components/Footer/Footer'
import NotFoundPage from './pages/common/NotFoundPage';
import LoginPage from "./pages/admin/auth/LoginPage";
import DrawerComponent from './components/Drawer/DrawerComponent';

const Layout = ({ children }) => {
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    setShowFooter(
      !location.pathname.includes("/auth") &&
        !location.pathname.includes("/admin")
    );
  }, [location]);

  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default function App() {
  return (    
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />                     
            <Route exact path="/admin/login" component={LoginPage} />
            <Route exact path="/admin/manage" component={DrawerComponent} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
        <ToastContainer />
      </Router>      
  );
}
