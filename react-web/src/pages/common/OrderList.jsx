import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Grid,
  Button,
  Menu,
  Tooltip,
  MenuItem,
  useMediaQuery,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // Import the copy icon
import theme from "../../theme";
import { GetOrderList } from "../../api/order/OrderController";
import UserNavbarComponent from "../../components/Navbar/UserNavbarComponent";
import { _DecryptService } from "../../service/EncryptDecryptService";
import _JWTDecodeService from "../../service/JWTDecodeService";

const OrderList = ({ history }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expandedOrders, setExpandedOrders] = useState({});
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const toggleExpand = (orderId) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchOrderList = async () => {
      const userToken = sessionStorage.getItem("token");
      if (!userToken) {
        console.error("User token not found");
        return;
      }

      const userId = _DecryptService(
        _JWTDecodeService(_DecryptService(userToken)).UserId
      );
      const response = await GetOrderList(setIsLoading,{userId:userId});

      if (response?.lstOrderDetails) {
        const sortedOrderDetails = response.lstOrderDetails.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrderList({
          ...response,
          lstOrderDetails: sortedOrderDetails,
        });
      } else {
        setOrderList(response);
      }
    };

    fetchOrderList();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserNavbarComponent history={history} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: isMobile ? "10px" : "20px",
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
              zIndex: 9999, // Ensure it appears above all content
            }}
          >
            <CircularProgress size={60} color="primary" />
          </Box>
        )}
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Order History
        </Typography>
        {orderList?.lstOrderDetails?.length > 0
          ? Object.values(
              orderList.lstOrderDetails.reduce((acc, item) => {
                if (!acc[item.order_Id]) {
                  acc[item.order_Id] = {
                    order_Id: item.order_Id,
                    items: [],
                    totalAmount: 0,
                  };
                }
                acc[item.order_Id].items.push(item);
                acc[item.order_Id].totalAmount += item.amount;
                return acc;
              }, {})
            ).map((order) => (
              <Card
                key={order.order_Id}
                sx={{
                  width: isMobile ? "100%" : "70%",
                  marginBottom: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f9fafc", // Subtle light background for the card
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row", // Always row for single-line layout
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px", // Space between Order ID and Copy Icon
                        flex: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#3F51B5",
                          whiteSpace: "nowrap", // Prevent text from wrapping
                          overflow: "hidden", // Truncate long text if necessary
                          textOverflow: "ellipsis", // Add ellipsis for truncated text
                        }}
                      >
                        Order ID: <strong>{order.order_Id}</strong>
                      </Typography>
                      <Tooltip title="Copy Order ID">
                        <IconButton
                          size="small"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              `Order ID:${order.order_Id}`
                            )
                          }
                          sx={{ color: "#3F51B5" }}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        color: "#5A5A5A",
                        minWidth: "200px", // Fixed width for consistent alignment
                        textAlign: "right",
                        whiteSpace: "nowrap", // Prevent text from wrapping
                      }}
                    >
                      Total:{" "}
                      <strong style={{ color: "#28A745" }}>
                        {new Intl.NumberFormat("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(order.totalAmount)}{" "}
                        MMK
                      </strong>
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => toggleExpand(order.order_Id)}
                        sx={{ color: "#3F51B5" }}
                      >
                        {expandedOrders[order.order_Id] ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                  <Collapse
                    in={expandedOrders[order.order_Id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        backgroundColor: "#ffffff", // White background for collapsible section
                        borderRadius: "8px",
                        boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.1)",
                        padding: "15px",
                      }}
                    >
                      {order.items.map((item, index) => (
                        <Box
                          key={item.id}
                          sx={{
                            padding: "10px",
                            borderBottom:
                              index < order.items.length - 1
                                ? "1px solid #E3E3E3"
                                : "none",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ color: "#3F51B5" }}
                          >
                            {item.product_Name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              sx={{ color: "#3F51B5" }}
                            >
                              Product Code: {item.productCode}
                            </Typography>
                            <Tooltip title="Copy Product Code">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    `Product Code:${item.productCode}`
                                  )
                                }
                                sx={{ color: "#3F51B5" }}
                              >
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Typography variant="body2" sx={{ color: "#5A5A5A" }}>
                            Quantity: {item.quantity}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#28A745" }}>
                            Amount: ${item.amount.toFixed(2)}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            ))
          : !loading && (
              <Typography
                variant="h6"
                sx={{
                  color: "#3F51B5",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                No order history available.
              </Typography>
            )}
      </Box>
    </ThemeProvider>
  );
};

export default OrderList;
