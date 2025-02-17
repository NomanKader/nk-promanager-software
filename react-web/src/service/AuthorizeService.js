import { _DecryptService } from "./EncryptDecryptService";
import _JWTDecodeService from "./JWTDecodeService";
export const _AdminAuthorizeService = () => {
  // Retrieve the encrypted token from sessionStorage
  const encryptedToken = sessionStorage.getItem("token");
  console.log("Encrypted token",encryptedToken)
  // Check if the token exists
  if (!encryptedToken) {
    console.error("No token found in sessionStorage.");
    window.location.replace('/admin/login')
    return null;
  }

  try {
    // Decrypt the token using _DecryptService
    const decryptedToken = _DecryptService(encryptedToken);
    console.log("Decrypted token",decryptedToken)
    // Decode the decrypted token using jwtDecode
    const decodedToken = _JWTDecodeService(decryptedToken);

    // Extract and return the user role from the decoded token
    const userRole=_DecryptService(decodedToken?.UserRole);
    return userRole || null; // Assuming the role is stored in 'role' key
  } catch (error) {
    console.error("Error decrypting or decoding token:", error);
    return null;
  }
};
