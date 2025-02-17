import axios from 'axios'

const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;

const RegisterAPI= async (payload)=>{
  const endpoint = `${API_BASE_URL}/register`;

  try{ 
    const res = await axios.post(endpoint, payload);
    if (res.data.baseResponseModel.respCode === 200) {
      console.log("Register successfully");
      alert("Register successfully, Please login to continue.");
      window.location.replace("/auth?type=logIn")
    } else {
      alert(res.data.respMessage || "Failed to register.");
    }
  } catch (err) {
    console.error("Login error:", err);

  
    alert("An unexpected error occurred. Please try again later.");
  }
}
export default RegisterAPI;