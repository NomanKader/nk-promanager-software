import axios from "axios";
import {
  _DecryptService,
  _EncryptService,
} from "../../service/EncryptDecryptService";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;

const LoginAPI = async (postBody, toast) => {
  const endpoint = `${API_BASE_URL}/account/user-login`;
  console.log(endpoint);
  try {
    const res = await axios.post(endpoint, postBody, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (res.data.StatusCode === 200) {
      const token = res?.data?.Data?.Token;      
      sessionStorage.setItem("token", _EncryptService(token));
      const userRole = res?.data?.Data?.UserRole;
      _DecryptService(userRole) !== "User"
        ? window.location.replace("/admin/manage")
        : window.location.replace("/");
    } else {
      toast.warning(res.data.Message);
    }
  } catch (err) {
    console.log("Login Error", err);
    alert("Internal error. Please try again.");
  }
};

export default LoginAPI;
