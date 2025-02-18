import axios from "axios";
import { _DecryptService, _EncryptService } from "../../service/EncryptDecryptService";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;
  

const LoginAPI = async (postBody) => {
  const endpoint = `${API_BASE_URL}/account/user-login`;
   console.log(endpoint)
  try {
    const res = await axios.post(endpoint, postBody, 
      {
        headers: {
          'Content-Type': 'application/json', 
        
        },
        withCredentials : true,
      });

    if (res.data.baseResponseModel.respCode === 200) {      
      const token=res?.data?.token;
      sessionStorage.setItem('cartItemCount',res.data.cartItemCount);
      sessionStorage.setItem('token',_EncryptService(token));      
      const userRole=res?.data?.userRole;
      _DecryptService(userRole) !=="User"  ? window.location.replace("/admin/manage") :  window.location.replace("/");
      
    } else if (res.data.baseResponseModel.respCode === 401) {
  
      alert(res.data.Message || "Unauthorized access. Please check your credentials.");
      window.location.replace("/auth?type=logIn");
      console.log(res.data); 

    } else {
    
      alert(res.data.Message || "Login failed. Please try again.");
      console.log(res.data);

    }
  } catch (err) {
     
    console.error("Login error:", err);

  
    alert("An unexpected error occurred. Please try again later.");
  }
};

export default LoginAPI;
