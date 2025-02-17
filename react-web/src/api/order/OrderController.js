import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";
import _JWTDecodeService from "../../service/JWTDecodeService";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;
  const GetOrderList = async (setIsLoading, { orderId = "", userId = "" } = {}) => {
    try {
      setIsLoading(true);
  
      // Retrieve the user token
      const userToken = sessionStorage.getItem("token");
      if (!userToken) {
        console.error("User token not found");
        return;
      }  
      // Construct the endpoint
      const endpoint = userId
        ? `${API_BASE_URL}/orderdetail?userId=${userId}`
        : `${API_BASE_URL}/orderdetail?orderId=${orderId}`;
  
      // Set headers
      const headers = {
        "Authorization": "Bearer " + _DecryptService(userToken),
        "Content-Type": "application/json",
      };
  
      // Make the API request
      const res = await axios.post(endpoint, {}, { headers });
      return res.data;
    } catch (err) {
      console.error("Error fetching order list:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  const GetOrderSummary = async(setIsLoading) => {
    try {
      setIsLoading(true);
       
      const endpoint = `${API_BASE_URL}/ordersummary`;
    //   const sampleEndpoint = `https://wv0c372l-7079.asse.devtunnels.ms/api/orderdetail?orderId=&userId=${userId}`
      const headers = {
        "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
        "Content-Type": "application/json"
      };            
      const res = await axios.get(endpoint, { headers });
      return res.data
    } catch (err) {
      setIsLoading(false);
    }finally{
      setIsLoading(false)
    }
  };

  export {GetOrderList,GetOrderSummary}