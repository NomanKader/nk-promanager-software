import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Button,
  TextField,
  TableSortLabel,
  Skeleton,
  Box,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon
import { stableSort, getComparator } from "../../service/TableSortingService";
import ProductDialog from "../Dialog/product/ProductDialog";
import DetailModalComponent from "../Modal/DetailModalComponent";
import UserCreateDialogComponent from "../Dialog/user/UserCreateDialogComponent";
import UserEditDialogComponent from '../Dialog/user/UserEditDialogComponent';
import DeleteDialogComponent from '../Dialog/DeleteDialogComponent';
import PromoCodeDialog from "../Dialog/promoCode/PromoCodeDialog";
import OrderStatus from "../../pages/common/OrderStatus";
 
const DataTableComponent = ({
  data,
  showIdColumns,
  handleStatusChange,
  tableHeaders,
  isLoading,
  setIsFilter,
  onRefresh,
  addBtnLabel,
  requested,
  handleOpenDeleteDialog,
  showNewAddButton = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogStatus, setDialogStatus] = useState("create");
 
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
 
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
 
  const handleMoreClick = (event, row) => {
    setAnchorEl(event.target);
    setSelectedRow(row);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const handleViewDetailsClick = () => {
    setOpenDetailDialog(true);
    handleClose();
  };
 
  const handleDialogClose = () => {
    setOpenDetailDialog(false);
    setSelectedRow(null);
  };
 
  const tableData = data.map((item) => ({
    ...item,
    Images: item.dataLst
      ? item.dataLst.map((img) => img.image).join(", ")
      : "No Image",
  }));
 
  const filteredData = tableData.filter((row) =>
    tableHeaders.some(
      (header) =>
        row[header] &&
        row[header].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
 
  const sortedData = stableSort(filteredData, getComparator(order, orderBy));
 
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
 
  const handleOpenCreateAdsDialog = () => {
    setDialogOpen(true);
    setDialogStatus("create");
  };
 
  const handleCloseCreateAdsDialog = () => {
    setDialogOpen(false);
  };
 
  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
    setDialogStatus("edit");
  };
 
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setDialogStatus("edit");
  };
 
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={tableHeaders.length}>
                <Box display="flex" alignItems="center">
                  <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginRight: 10 }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={() => setIsFilter(true)}
                    style={{ marginRight: 10 }}
                  >
                    Filter
                  </Button>
                  {showNewAddButton && (
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      color="primary"
                      onClick={handleOpenCreateAdsDialog}
                      sx={{
                        marginLeft: "auto",
                        textTransform: "none",
                      }}
                    >
                      {addBtnLabel || "Add New Product"}
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell
                  key={header}
                  style={{
                    display:
                      (header.includes("Id") ||
                        header.includes("By") ||
                        header.includes("id") ||
                        header.includes("ImageName")) &&
                      !showIdColumns
                        ? "none"
                        : "table-cell",
                  }}
                  sortDirection={orderBy === header ? order : false}
                >
                  {header === "Done" || header === "Actions" ? (
                    header
                  ) : (
                    <TableSortLabel
                      active={orderBy === header}
                      direction={orderBy === header ? order : "asc"}
                      onClick={() => handleRequestSort(header)}
                    >
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array.from(new Array(10)).map((_, index) => (
                <TableRow key={index}>
                  {tableHeaders.map((header) => (
                    <TableCell
                      key={header}
                      style={{
                        display:
                          header.includes("id") ||
                          (header.includes("Id") && !showIdColumns)
                            ? "none"
                            : "table-cell",
                      }}
                    >
                      <Skeleton variant="text" width="100%" height={40} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : sortedData.length > 0 ? (
              sortedData.map((row) => (
                <TableRow key={row.productId}>
                  {tableHeaders.map((header) => {
                    const cellContent = row[header];
 
                    return (
                      <TableCell
                        key={header}
                        style={{
                          display:
                            (header.includes("Id") ||
                              header.includes("By") ||
                              header.includes("id") ||
                              header.includes("ImageName")) &&
                            !showIdColumns
                              ? "none"
                              : "table-cell",
                        }}
                      >
                        {header === "Done" ? (
                          <Switch
                            checked={row.IsDeleted}
                            onChange={() => handleStatusChange(row)}
                            color="primary"
                          />
                        ) : header === "Actions" ? (
                          <IconButton
                            onClick={(event) => handleMoreClick(event, row)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        ) : header === "Status" ? (
                          <Chip
                            label={
                              row.Status === "Active" ? "Active" : "Expired"
                            }
                            style={{
                              backgroundColor:
                                row.Status === "Active"
                                  ? "#28B31C33"
                                  : "#ff000033",
                              color:
                                row.Status === "Active" ? "#096D00" : "#C30000",
                            }}
                          />
                        ) : (
                          cellContent || null
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {requested != "Account" && requested !== "PromoCode" && (
            <MenuItem onClick={handleViewDetailsClick}>View Details</MenuItem>
          )}
          <MenuItem onClick={handleOpenEditDialog}>Edit</MenuItem>
          <MenuItem onClick={() => [handleOpenDeleteDialog(selectedRow),setAnchorEl(null)]}>
            Delete
          </MenuItem>
        </Menu>
      </TableContainer>
      {requested === "Product" ? (
        <ProductDialog
          open={dialogStatus === "create" ? dialogOpen : editDialogOpen}  
          onClose={dialogStatus==="create"?handleCloseCreateAdsDialog:handleCloseEditDialog}
          onRefresh={onRefresh}
          dialogStatus={dialogStatus}
          adsDataForEdit={selectedRow}          
        />
      ) : requested === "Account" && dialogStatus === "create" ? (
        <UserCreateDialogComponent
          open={dialogOpen}
          onClose={handleCloseCreateAdsDialog}
          onRefresh={onRefresh}
          dialogStatus={dialogStatus}
          adsDataForEdit={selectedRow}
          status={dialogStatus}
        />
      ) : requested === "Order" ? (
        <DetailModalComponent
          open={dialogOpen}
          onClose={handleCloseCreateAdsDialog}
          data={selectedRow}
          category={requested}
        />
      ) : requested === "PromoCode" ? (
        <PromoCodeDialog
          open={dialogStatus === "create" ? dialogOpen : editDialogOpen}
          onClose={
            dialogStatus === "create"
              ? handleCloseCreateAdsDialog
              : handleCloseEditDialog
          }
          onRefresh={onRefresh}
          selectedRow={dialogStatus === "edit" ? selectedRow : null}
        />
      ) : (
        <UserEditDialogComponent
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          onRefresh={()=>[onRefresh(),setAnchorEl(null)]}
          dialogStatus={dialogStatus}
          editMode={"profile update"}
          adsDataForEdit={selectedRow}
          rowData={selectedRow}
          setopenUserEditCreateDialog={setEditDialogOpen}
        />
      )}
 
      {/* Custom Backdrop */}
      <Modal
        open={openDetailDialog}
        onClose={handleDialogClose}
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(5px)", // Apply blur effect
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Darken background
          },
        }}
      >
        <DetailModalComponent
          open={openDetailDialog}
          onClose={handleDialogClose}
          data={selectedRow}
          category={requested}
        />
      </Modal>
    </>
  );
};
 
export default DataTableComponent;