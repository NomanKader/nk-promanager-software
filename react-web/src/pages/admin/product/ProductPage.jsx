import React, { useEffect, useState } from "react";
import { Button, ThemeProvider, TablePagination } from "@mui/material";
import theme from "../../../theme";
import "../../../App.css";
import tableHeaders from "../../../data/tableHeader";
import { _DecryptService } from "../../../service/EncryptDecryptService";
import _JWTDecodeService from "./../../../service/JWTDecodeService";
import DetailModalComponent from "../../../components/Modal/DetailModalComponent";
import {
  DeleteProductAPI,
  GetProductAPI,
} from "../../../api/product/ProductController";
import DataTableComponent from "../../../components/Table/DataTableComponent";
import DeleteDialogComponent from "../../../components/Dialog/DeleteDialogComponent";

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showIdColumns, setShowIdColumns] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Ads");
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [page, setPage] = useState(0); // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [FilterPayload, setFilterPayload] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product
  const [showDetailModal, setShowDetailModal] = useState(false); // New state for modal visibility
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchProductList = async () => {
      const postBody = {
        product_Id: 0, // 0 if there is no filter value
        size: [], // empty array if there is no filter value
        color: [], // empty array if there is no filter value
        category: "", // empty string if there is no filter value
        priceRange: "", // empty string if there is no filter value
      };
      // await GetProductAPI(postBody, setData, setIsLoading);
    };
    fetchProductList();
  }, []);

  const fetchData = async (pageNo, pageSize, FilterPayload = {}, category) => {
    setIsLoading(true);

    // Ensure FilterPayload is an object and not null or other invalid types
    const isFilterPayloadValid =
      typeof FilterPayload === "object" && FilterPayload !== null;

    // Merge pageNo, pageSize, and FilterPayload if it's valid
    // const payload =
    //   isFilterPayloadValid && Object.keys(FilterPayload).length > 0
    //     ? { pageNo, pageSize, ...FilterPayload } // Merge FilterPayload with pagination
    //     : { pageNo, pageSize }; // Only use pagination if FilterPayload is empty or invalid
    const payload = {
      product_Id: 0, // 0 if there is no filter value
      size: [], // empty array if there is no filter value
      color: [], // empty array if there is no filter value
      category: "", // empty string if there is no filter value
      priceRange: "", // empty string if there is no filter value
    };

    // Fetch the ads with the correct payload
    // await GetProductAPI(payload, setData, setIsLoading);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(0);
  };

  const handleMoreClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleViewDetails = (product, category) => {
    console.log("Selected Product to view detail", product);
    console.log("Selected category to view details", category);
    setSelectedProduct(product);
    setSelectedCategory(category);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedProduct(null);
  };

  const handleOpenDeleteDialog = (selectedRow) => {
    setSelectedRow(selectedRow);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (selectedRow) {
      // console.log("Selected Row",selectedRow.productId,setIsLoading)
      await DeleteProductAPI(selectedRow.productId, setIsLoading);
      fetchData(
        page === 0 ? page + 1 : page,
        rowsPerPage,
        FilterPayload,
        selectedCategory
      );
      handleClose();
    }
  };

  const handleFilterDrawerClose = () => {
    setIsFilterDrawerOpen(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);

    fetchData(newPage + 1, rowsPerPage, FilterPayload, selectedCategory); // newPage + 1 because it's 0-indexed
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div style={{ marginBottom: "20px" }}>
          {/* Other category buttons can be added here if needed */}
        </div>
        {/* <DataTableComponent
          data={Array.isArray(data) ? data : []} // Ensure data is always an array
          showIdColumns={showIdColumns}
          handleMoreClick={handleMoreClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleViewDetails={handleViewDetails}
          tableHeaders={tableHeaders?.["Product"] || []} // Ensure tableHeaders exists
          isLoading={isLoading}
          setIsFilter={setIsFilterDrawerOpen}
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          requested={"Product"}
          onRefresh={() =>
            fetchData(
              page === page ? page + 1 : page,
              rowsPerPage,
              FilterPayload,
              selectedCategory
            )
          }
        /> */}

        <TablePagination
          component="div"
          count={totalCount || 0}
          page={page || 0}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage || 0}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        <Button
          onClick={() => setShowIdColumns(!showIdColumns)}
          style={{ marginTop: "20px" }}
        >
          {showIdColumns ? "Hide ID Columns" : "Show ID Columns"}
        </Button>
        <DetailModalComponent
          open={showDetailModal}
          onClose={handleCloseDetailModal}
          data={selectedProduct}
          category="product"
        />
      </div>
      <DeleteDialogComponent
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={handleDelete}
      />
    </ThemeProvider>
  );
};

export default ProductPage;
