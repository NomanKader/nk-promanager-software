import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Table,
  TablePagination,
  Button,
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";
import { GetOrderSummary } from "../../api/order/OrderController";
import DataTableComponent from "../../components/Table/DataTableComponent";
import DetailModalComponent from "../../components/Modal/DetailModalComponent";
import tableHeaders from "../../data/tableHeader";

const steps = ["Order Created", "Viewing Order", "On Way", "Completed"];

const simulatedResponse = {
  status: "Completed",
};

const OrderStatus = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showIdColumns, setShowIdColumns] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Ads");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [page, setPage] = useState(0); // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [UserId, setUserId] = useState("");
  const [FilterPayload, setFilterPayload] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product
  const [showDetailModal, setShowDetailModal] = useState(false); // New state for modal visibility

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

  useEffect(() => {
    getOrderStatus();
  }, []);

  const getOrderStatus = async () => {
    try {
      const response = await GetOrderSummary(setLoading);
      console.log("Order Status:", response);
      setData(response.orderListSummary)
    } catch (err) {
      console.error("Error fetching order status:", err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} color="primary" />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div style={{ marginBottom: "20px" }}>
          {/* Other category buttons can be added here if needed */}
        </div>
        <DataTableComponent
          data={data}
          showIdColumns={showIdColumns}
          handleMoreClick={handleMoreClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleViewDetails={handleViewDetails}
          tableHeaders={tableHeaders["OrderSummary"]}
          isLoading={loading}
          setIsFilter={setIsFilterDrawerOpen}
          // handleDelete={handleDelete}
          // onRefresh={onRefresh}
          showNewAddButton={false}
          requested={"Order"}
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
    </ThemeProvider>
  );
};

export default OrderStatus;
