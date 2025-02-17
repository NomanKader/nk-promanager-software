import axios from "axios";
import { _DecryptService } from "../../service/EncryptDecryptService";
import { toast } from "react-toastify";

const isProduction = process.env.REACT_APP_IS_PRODUCTION === "true";
const API_BASE_URL = isProduction
  ? process.env.REACT_APP_API_ENDPOINT
  : process.env.REACT_APP_UAT_API_ENDPOINT;

const CreatePromoCode = async (promoCodeData, setIsLoading, handleBack) => {
  console.log("dat", promoCodeData);
  try {
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/promotion`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    const res = await axios.post(endpoint, promoCodeData, { headers });
    console.log("PromoCode Create Status Code", res.data.respCode);
    if (res.data.baseResponseModel.respCode === 200) {
      toast.success("PromoCode created successfully.");
      setIsLoading(false);
      handleBack();
    } else {
      toast.error(res.data.Message || "Failed to create promoCode.");
      setIsLoading(false);
    }
  } catch (err) {
    console.error("Create Product Error", err);
    toast.error("Unknown Error");
    setIsLoading(false);
  }
};

const GetPromoCodeList = async (setIsLoading) => {
  try {
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/promotion`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    const res = await axios.get(endpoint, { headers });
    return res.data;
  } catch (err) {
  } finally {
    setIsLoading(false);
  }
};

const UpdatePromoCode = async (formData, setIsLoading) => {
  try {
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/promotion`;


    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    const res = await axios.put(endpoint,formData, { headers });
    if (res.data.baseResponseModel.respCode === 200) {
      toast.success("PromoCode updated successfully.");
    } else {
      toast.error(res.data.Message || "Failed to update promoCode.");
    }
  } catch (err) {
  } finally {
    setIsLoading(false);
  }
};

const CheckPromoCode = async (promoCode, setIsLoading) => {
  try {
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/getpromotion?PromotionCode=${promoCode}`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    const res = await axios.post(endpoint, {}, { headers });
    return res.data;
  } catch (err) {
  } finally {
    setIsLoading(false);
  }
};
const DeletePromoCode = async (promoCode, setIsLoading) => {
  try {
    setIsLoading(true);
    const endpoint = `${API_BASE_URL}/promotion?promotionCode=${promoCode}`;
    const sampleEndpoint = `https://8ltkn9gp-7079.asse.devtunnels.ms/api/promotion?promotionCode=${promoCode}`;

    const headers = {
      Authorization:
        "Bearer " + _DecryptService(sessionStorage.getItem("token")),
      "Content-Type": "application/json",
    };
    const res = await axios.delete(endpoint, { headers });
    return res.data;
  } catch (err) {
  } finally {
    setIsLoading(false);
  }
};

export {
  CreatePromoCode,
  GetPromoCodeList,
  CheckPromoCode,
  UpdatePromoCode,
  DeletePromoCode,
};
