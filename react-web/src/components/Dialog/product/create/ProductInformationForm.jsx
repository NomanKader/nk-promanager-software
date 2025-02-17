import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Button,
  Box,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { CreateProductAPI, UpdateProductAPI } from "../../../../api/product/ProductController";
import { toast } from "react-toastify";
import _JWTDecodeService from "../../../../service/JWTDecodeService";
import { _DecryptService } from "../../../../service/EncryptDecryptService";
import MultiSelectBox from "../../../MutlitSelectBox/MultiSelectBox";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import theme from "../../../../theme";
import { _fetchCategoriesService } from "../../../../service/MasterDataService";

const ProductInformationForm = ({
  handleNext,
  handleBack,
  setProductData,
  productData,
  oldData,
  status,
  steps,
  onRefresh
}) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [maetrials, setMaterials] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Handle multiple files
  const [imagePreviews, setImagePreviews] = useState([]); // Handle previews for multiple images
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const baseURL = process.env.REACT_APP_UAT_RESOURCE_ENDPOINT;
  const formData=new FormData();
  const [removedImages, setRemovedImages] = useState([]); // Store removed image filenames
  const [productDataState, setProductDataState] = useState({
    ProductCode: "",
    Category: "",
    Color: "",
    Size: "",
    Material: "",
    ProductTitle: "",
    ProductDescription: "",
    Price: "",
    Quantity: "",
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      const timestamp = new Date().getTime();

      try {
        const categoriesResponse = await fetch(
          process.env.REACT_APP_UAT_RESOURCE_ENDPOINT +
            "Category.json?t=" +
            timestamp
        );
        const colorsResponse = await fetch(
          process.env.REACT_APP_UAT_RESOURCE_ENDPOINT + "Color.json"
        );
        const sizesResponse = await fetch(
          process.env.REACT_APP_UAT_RESOURCE_ENDPOINT + "Size.json"
        );
        const materialResponse = await fetch(
          process.env.REACT_APP_UAT_RESOURCE_ENDPOINT + "Materials.json"
        );

        const categoriesData = await categoriesResponse.json();
        const colorsData = await colorsResponse.json();
        const sizesData = await sizesResponse.json();
        const materialsData = await materialResponse.json();

        setCategories(categoriesData.Categories);
        setColors(colorsData.Colors);
        setSizes(sizesData.Sizes);
        setMaterials(materialsData.Materials);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (status === "edit" && oldData) {
      setProductDataState({
        ProductCode: oldData.productCode || "",
        Category: oldData.category || "",
        Color: oldData.color || "",
        Size: oldData.size || "",
        ProductTitle: oldData.productTitle || "",
        ProductDescription: oldData.productDescription || "",
        Price: oldData.price || "",
        Quantity: oldData.quantity || "",
        Material: oldData.materials || "",
      });
      console.log("OldDataIMageList", oldData.dataLst);
      oldData.dataLst.map((item, index) => {
        setImagePreviews((prevPreviews) => [
          ...prevPreviews,
          `${baseURL}Upload/Ecommerce/${item.businessName}/${item.product_Id}/${item.image}`,
        ]);
      });      
    } else if (productData) {
      setProductData({
        Category: productData.Category || "",
        Color: productData.Color || "",
        Size: productData.Size || "",
        ProductTitle: productData.ProductTitle || "",
        ProductDescription: productData.ProductDescription || "",
        Price: productData.Price || "",
        Quantity: productData.Quantity || "",
      });
    }
  }, [status, oldData, productData, setProductData]);

  const generateProductCode = () => {
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    const randomDigit = Math.floor(Math.random() * 10).toString();

    let additionalChars = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();

    additionalChars = additionalChars.replace(/[^A-Z0-9]/g, "");
    additionalChars = additionalChars.slice(0, 3);

    const randomCode = (randomChar + randomDigit + additionalChars).slice(0, 5);

    productDataState.ProductCode = randomCode;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductDataState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log("OldDataFIleCount",oldData.dataLst.length);
    if (files.length + selectedFiles.length+oldData.dataLst.length > 5) {
      alert("You can only upload a maximum of 5 photos.");
      return;
    }

    const validFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    );
    if (validFiles.length !== files.length) {
      alert("Only JPEG, PNG, and JPG formats are allowed.");
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);

    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const isNextDisabled =   
  status=='create'?( 
    !productDataState.Category ||
      !productDataState.ProductCode ||
      !productDataState.Color ||
      !productDataState.Size ||
      !productDataState.ProductTitle ||
      !productDataState.ProductDescription ||
      !productDataState.Price ||
      !productDataState.Quantity ||
      !productDataState.Material ||
      selectedFiles.length === 0):
      (
        !productDataState.Category ||
      !productDataState.ProductCode ||
      !productDataState.Color ||
      !productDataState.Size ||
      !productDataState.ProductTitle ||
      !productDataState.ProductDescription ||
      !productDataState.Price ||
      !productDataState.Quantity ||
      !productDataState.Material ||
      imagePreviews.length==0
      )

  const handleFormSubmit = async () => {
    setIsLoading(true); // Set loading state to true when the form is submitted

    if (productDataState.ProductCode) {
      const isValidCode = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5}$/.test(
        productDataState.ProductCode
      );

      if (!isValidCode) {
        alert(
          "Product Code must contain exactly 5 alphanumeric characters, including at least one character and one number."
        );
        return;
      }

      // Proceed with the next steps if the code is valid
      console.log("Product Code is valid:", productDataState.ProductCode);
    } else {
      alert("Product Code is required.");
    }

    const formData = new FormData();
    formData.append("ProductId",oldData.productId);
    formData.append("ProductCode", productDataState.ProductCode.toUpperCase());
    console.log("uppder case", productDataState.ProductCode.toUpperCase());
    formData.append("Category", productDataState.Category);
    formData.append("Color", productDataState.Color);
    formData.append("Size", productDataState.Size);
    formData.append("Materials", productDataState.Material);
    formData.append("ProductTitle", productDataState.ProductTitle);
    formData.append("ProductDescription", productDataState.ProductDescription);
    formData.append("Price", productDataState.Price);
    formData.append("Quantity", productDataState.Quantity);
    const businessName = _DecryptService(
      _JWTDecodeService(_DecryptService(sessionStorage.getItem("token")))
        .BusinessName
    );
    formData.append("BusinessName", businessName);
    const UserId = _DecryptService(
      _JWTDecodeService(_DecryptService(sessionStorage.getItem("token"))).UserId
    );
    formData.append("CreateBy", UserId);
    selectedFiles.forEach((file, index) => {
      formData.append(`Files`, file);
    });
    // appending remove image list to formData
    console.log("StatusProduct",status);
    if(status=='edit'){
      console.log("RemovedImages",removedImages);
      removedImages.forEach((fileName, index) => {
        formData.append(`RemoveImages[${index}].FileName`, fileName);
      });    
    }
    console.log("material", productDataState.Material);
    if (UserId === "" && businessName === "") {
      // Show an alert box
      const userConfirmed = window.confirm(
        "Session Expired. You will be redirected to the login page."
      );
      if (userConfirmed) {
        sessionStorage.removeItem("token");
        window.location.replace("/auth?type=logIn");
      }
    } else {
      try {
        if(status=='create'){
          await CreateProductAPI(formData, setIsLoading, handleBack);
        }
        else{
          await UpdateProductAPI(formData, setIsLoading, handleBack,setProductData);
          await onRefresh();
        }
        
        // handleNext(); // Proceed to the next step after successful submission
      } catch (error) {
        setIsLoading(false); // Reset loading state in case of error
        toast.error("Failed to create product."); // Show error toast if the API fails
      }
    }
  };

  const handleRemoveImage = (index) => {
    const removedFile = imagePreviews[index]; // Get the removed file
    const fileName=removedFile.split("/").pop();
    console.log("RemovedFile",fileName);
    if (fileName) {
      setRemovedImages((prev) => [...prev, fileName]); // Store filename
    }
  
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  
  

  return (
    <Grid
      container
      spacing={4}
      width={"100%"}
      paddingX={15}
      paddingY={10}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h5" sx={{ fontWeight: "700" }}>
        Product Information
      </Typography>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "flex-end",
        }}
      >
        <FormControl fullWidth>
          <Typography variant="p" sx={{ marginBottom: "5px" }}>
            Product Code
          </Typography>
          <TextField
            name="ProductCode"
            value={productDataState.ProductCode}
            onChange={handleChange}
            placeholder="Enter or Generate Product Code"
            variant="outlined"
            inputProps={{ maxLength: 5 }}
          />
          <Typography
            sx={{
              alignSelf: "flex-start",
              color: "#2196F3 ",
            }}
          >
            Product Code must be exactly 5 characters long and include at least
            one letter and one number
          </Typography>
        </FormControl>
        <Button
          sx={{
            alignSelf: "center",
            backgroundColor: theme.palette.primary.main,
            height: "57px", // Same as TextField height
            minWidth: "auto", // Prevent unnecessarily wide button
          }}
          onClick={generateProductCode}
          variant="contained" // Optional for consistency
        >
          Generate
        </Button>
      </Grid>

      {/* Existing form fields go here */}
      <Grid
        item
        xs={12}
        sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
      >
        <FormControl fullWidth>
          <Typography variant="p">Category</Typography>
          <Select
            displayEmpty
            name="Category"
            value={productDataState.Category}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select a category</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select a category</em>
            </MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Color</Typography>
          {/* <Select
            displayEmpty
            name="Color"
            value={productDataState.Color}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select a color</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select a color</em>
            </MenuItem>
            {colors.map((color, index) => (
              <MenuItem key={index} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select> */}
          <MultiSelectBox
            label="Color"
            placeHolder="Select colors"
            selectedOptions={productDataState.Color}
            handleChange={handleChange}
            options={colors}
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Size</Typography>
          <MultiSelectBox
            label="Size"
            placeHolder="Select sizes"
            selectedOptions={productDataState.Size}
            handleChange={handleChange}
            options={sizes}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="p">Material</Typography>
          <Select
            displayEmpty
            name="Material"
            value={productDataState.Material}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) =>
              selected ? selected : <em>Select a material</em>
            }
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Select a material</em>
            </MenuItem>
            {maetrials.map((material, index) => (
              <MenuItem key={index} value={material}>
                {material}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="p">Product Title</Typography>
          <TextField
            name="ProductTitle"
            value={productDataState.ProductTitle}
            onChange={handleChange}
            placeholder="Enter Product Title"
            variant="outlined"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sx={{ marginTop: 3 }}>
        <FormControl fullWidth>
          <Typography variant="p">Product Description</Typography>
          <TextField
            name="ProductDescription"
            value={productDataState.ProductDescription}
            onChange={handleChange}
            placeholder="Enter Product Description"
            multiline
            rows={4}
            variant="outlined"
          />
        </FormControl>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginTop: 3,
        }}
      >
        <FormControl fullWidth>
          <Typography variant="p">Price</Typography>
          <TextField
            type="number"
            name="Price"
            value={productDataState.Price}
            onChange={handleChange}
            placeholder="Enter Price"
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="p">Quantity</Typography>
          <TextField
            name="Quantity"
            type="number"
            value={productDataState.Quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
            variant="outlined"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sx={{ marginTop: 3 }}>
        <FormControl fullWidth>
          <Typography variant="p">Upload Product Photos (Max 5)</Typography>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
            multiple
          />
        </FormControl>
        <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2, gap: 2 }}>
          {imagePreviews.map((preview, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                display: "inline-block",
                maxWidth: "100px",
              }}
            >
              <img
                src={preview}
                alt={`Preview ${index}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
              {/* Remove Icon */}
              <IconButton
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: 'red',
                  color: "#fff",
                  borderRadius: "50%",
                  padding: "2px",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                }}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Grid>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ marginTop: 3, gap: 5 }}
      >
        <Button size="large" variant={"outlined"} onClick={handleBack}>
          Close
        </Button>
        <Button
          size="large"
          variant="contained"
          disabled={isNextDisabled || isLoading}
          onClick={() => handleFormSubmit()}
        >
          {isLoading ? status=='create'?"Submitting....":"Updating...." : steps > 1 ? "Next" : status=='create'?"Submit":"Update"}
        </Button>
      </Box>
    </Grid>
  );
};

export default ProductInformationForm;
