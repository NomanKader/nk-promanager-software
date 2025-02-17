import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";
import { toast } from "react-toastify";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;


export const GetAccountListAPI = async (setData,setIsLoading) => {
  try {
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/userlist`;

    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };

    const res = await axios.get(endpoint,{ headers });    
    if (res.status === 200) {      
      toast.success("Account Get List Successfully.");
      setIsLoading(false);
      console.log("Account List",res.data);
      setData(res.data.userListModels);
    } else {
      toast.error(res.data.Message || "Failed to retrieve the account list.");
      setIsLoading(false);
    }
  } catch (err) {    
    toast.error("Unknown Error");
    setIsLoading(false);
  }
};

export const CreateAccountAPI=async(postBody,setIsLoading,toast,onRefresh)=>{
  try {
    console.log("Start calling Register API");
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/register`;

    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };

    const res = await axios.post(endpoint,postBody,{ headers });  
    console.log("RegisterREs",res);  
    if (res.data.baseResponseModel.respCode === 200) {      
      toast.success(res.data.baseResponseModel.respMessage || 'Account Registered Successfully.');
      setIsLoading(false);
      onRefresh();
      console.log("Account List",res.data);      
    } else {
      toast.error(res.data.Message || "Failed to create Account.");
      setIsLoading(false);
    }
  } catch (err) {    
    toast.error("Unknown Error");
    setIsLoading(false);
  }
};

export const UpdateAccountProfileAPI=async(postBody,setIsLoading,toast,onRefresh)=>{
  try {
    console.log("Start calling Update Register API");
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/updateuser`;

    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };

    const res = await axios.put(endpoint,postBody,{ headers });      
    if (res.data.baseResponseModel.respCode === 200) {      
      toast.success(res.data.baseResponseModel.respMessage || 'Account Updated Successfully.');
      setIsLoading(false);
      onRefresh();      
    } else {
      toast.error(res.data.Message || "Failed to update Account.");
      setIsLoading(false);
    }
  } catch (err) {    
    toast.error("Unknown Error");
    setIsLoading(false);
  }
}

export const UpdatePasswordAPI=async()=>{

}

const DeleteAccountAPI = async (productId, setIsLoading) => {
  try {
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/product/delete?productId=${productId}`;

    const headers = { 
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };

    const res = await axios.delete(endpoint, { headers });
    console.log("Product Delete Status Code", res.status);
    
    if (res.status === 200) {
      toast.success("Product deleted successfully.");
    } else {
      toast.error(res.data.Message || "Failed to delete product.");
    }
  } catch (err) {
    console.error("Delete Product Error", err);
    toast.error("Unknown Error");
  } finally {
    setIsLoading(false);
  }
};
