import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";
import { toast } from "react-toastify";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === 'true';
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;

  const GetProductAPI = async (postBody, setData, setIsLoading, hideToast) => {
    try {
      setIsLoading(true);
      const endpoint = `${API_BASE_URL}/product/filter`;
  
      const headers = {        
        "Content-Type": "application/json"
      };
  
      const res = await axios.post(endpoint, postBody, { headers });
      console.log("Status", res.status);
  
      if (res.status === 200) {
        if (hideToast === false) {
          toast.success("Product Get List Successfully.");
        }
        console.log("Product List", res.data);
        setData(res.data.productList);
      } else {
        if (hideToast === false) {
          toast.error(res.data.Message || "Failed to retrieve the product.");
        }
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      if (hideToast === false) {
        toast.error("Unknown Error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
const CreateProductAPI = async (productData, setIsLoading,handleBack) => {
  console.log("dat",productData)
  try {
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/product/create`;

    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };            
    const res = await axios.post(endpoint, productData, { headers });
    console.log("Product Create Status Code",res.data.respCode);
    if (res.data.baseResponseModel.respCode === 200) {      
      toast.success("Product created successfully.");      
      setIsLoading(false);
      handleBack();
    } else {
      toast.error(res.data.Message || "Failed to create product.");
      setIsLoading(false);
    }
  } catch (err) {
    console.error("Create Product Error",err)
    toast.error("Unknown Error");
    setIsLoading(false);
  }
};

const DeleteProductAPI = async (productId, setIsLoading) => {
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

const AddToCartAPI = async (cartData, setIsLoading) => {
  try{
    setIsLoading(true)
    const endpoint = `${API_BASE_URL}/addtocart`;
    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    const res = await axios.post(endpoint, cartData, { headers });
    return res.data
  }catch(err) {
    console.log("Add to cart error",err)
  }
}

const GetAddToCartListAPI = async (userId, setIsLoading) => {
  try{
    setIsLoading(true)
    const endpoint = `${API_BASE_URL}/cartlist?userId=${userId}`;
    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    const res = await axios.post(endpoint,{}, { headers });
    return res.data
  }catch(err) {
    console.log("Add to cart error",err)
  }
}

const RemoveProductFromAddToCart = async (userId,id, setIsLoading) => {
  try{
    setIsLoading(true)
    const endpoint = `${API_BASE_URL}/cart-delete?id=${id}&userId=${userId}`;
    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    const res = await axios.delete(endpoint, { headers });
    return res.data
  }catch(err) {
    console.log("Add to cart error",err)
  }
}

const CreateOrder = async (formData, setIsLoading) => {
  try{
    setIsLoading(true)
    const endpoint = `${API_BASE_URL}/order`;
    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    const res = await axios.post(endpoint,formData, { headers });
    return res.data
  }catch(err) {
    console.log("Create Order",err)
  }finally{
    setIsLoading(false)
  }
}

const UpdateProductAPI = async (productData, setIsLoading,handleBack,setProductData) => {
  console.log("dat",productData)
  try {
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/product/update`;

    const headers = {
      "Authorization": "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json"
    };            
    const res = await axios.put(endpoint, productData, { headers });
    console.log("Product Create Status Code",res.data.respCode);
    if (res.data.baseResponseModel.respCode === 200) {      
      toast.success(res.data.baseResponseModel.respMessage);
      setIsLoading(false);
      handleBack();
      // GetProductAPI({},setProductData,setIsLoading,false)
    } else {
      toast.error(res.data.baseResponseModel.respMessage || "Failed to create product.");
      setIsLoading(false);
    }
  } catch (err) {
    console.error("Create Product Error",err)
    toast.error("Unknown Error");
    setIsLoading(false);
  }
};

export {GetProductAPI,CreateProductAPI,DeleteProductAPI,AddToCartAPI,GetAddToCartListAPI,RemoveProductFromAddToCart,CreateOrder,UpdateProductAPI};