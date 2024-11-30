import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import {
  deleteItems,
  fetchDeliverParcels,
} from "../../Redux/Dashboard/Dashboard";
import { ShimmerLoader } from "./ShimmerLoader";

// Helper function for formatting date
const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const day = parsedDate.getDate();
  const month = parsedDate.toLocaleString("default", { month: "long" });
  const year = parsedDate.getFullYear();
  const suffix = ["th", "st", "nd", "rd"][(day % 10) - 1] || "th";
  return `${day}${suffix} ${month} ${year}`;
};

// Define the Parcel type
interface Parcel {
  _id: string;
  destination: string;
  country: string;
  city: string;
  travel_date: string;
  arrival_date: string;
  reportRide: boolean;
  bus_stop: string;
  can_carry_heavy: boolean;
  max_price: number;
  min_price: number;
  state: string;
  user_first_name: string;
  user_last_name: string;
  users_phone_number: string;
}

const DeliverParcel = () => {
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "refund" | null>(
    null
  );
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [parcelFilter, setParcelFilter] = useState<string>("all");
  const [parcels, setData] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    try {
      const response = await dispatch(fetchDeliverParcels()).unwrap();
      console.log("fetchDeliverParcels successfully:", response);
      if (response?.success === true) {
        setData(response.data); // Assuming response.data is of type Parcel[]
        setLoading(false); // Stop loading when data is fetched
      }
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      setLoading(false); // Stop loading even in case of error
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  // Handle selection of a parcel
  const handleSelectParcel = (_id: string) => {
    setSelectedParcels((prev) =>
      prev.includes(_id) ? prev.filter((id) => id !== _id) : [...prev, _id]
    );
  };

  // Handle select all parcels
  const handleSelectAll = () => {
    if (selectedParcels.length === filteredParcels.length) {
      setSelectedParcels([]);
    } else {
      setSelectedParcels(filteredParcels.map((parcel) => parcel._id));
    }
  };

  // Close dialog without action
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActionType(null);
  };

  // Handle confirm delete action
  const handleConfirmAction = () => {
    if (actionType === "delete") {
      dispatch(
        deleteItems({
          ids: selectedParcels,
          itemType: "deliverparcels", // or "sendparcels", based on the type
        })
      )
        .unwrap() // unwrap the action result (if using Redux Toolkit)
        .then((response) => {
   
          console.log(response, selectedParcels, "responseresponseresponse");
          if (response?.success) {
            fetchData();
            setIsSuccess(true); // Set success state
            // Remove deleted parcels from the state
            setData((prevData) =>
              prevData.filter((parcel) => !selectedParcels.includes(parcel._id))
            );
          } else {
            setIsSuccess(false); // Set error state if nothing was deleted
          }
        })
        .catch(() => {
          setIsSuccess(false); // Set error state in case of an exception
        });
    }

    setOpenDialog(false); // Close confirmation dialog
    setSuccessModalOpen(true); // Open success modal
  };

  // Close success modal
  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setIsSuccess(false);
  };

  // Filter parcels based on selected filter
  const filteredParcels = parcels.filter((parcel) => {
    if (parcelFilter === "reported") return parcel.reportRide;
    return true; // "all" parcels, no filter
  });

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Typography
        variant="h5"
        sx={{
          padding: 2,
          color: "#8C08F0",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        Deliver Parcel Management
      </Typography>

      {/* Filter Dropdown */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Typography variant="body1">Filter Parcels:</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={parcelFilter}
            onChange={(e) => setParcelFilter(e.target.value)}
            label="Filter"
          >
            <MenuItem value="all">All Parcels</MenuItem>
            <MenuItem value="reported">Reported Parcels</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* No parcels message */}
      {loading ? (
        <ShimmerLoader />
      ) : filteredParcels.length === 0 ? (
        <Typography variant="body1" sx={{ padding: 2, textAlign: "center" }}>
          No parcels available for the selected filter.
        </Typography>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={
                      selectedParcels.length === filteredParcels.length &&
                      filteredParcels.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Bus Stop</TableCell>
                <TableCell>Can Carry Heavy</TableCell>
                <TableCell>Travel Date</TableCell>
                <TableCell>Arrival Date</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Max Price</TableCell>
                <TableCell>Min Price</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Driver's Name</TableCell>
                <TableCell>Driver's Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredParcels.map((parcel) => (
                <TableRow key={parcel?._id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedParcels.includes(parcel?._id)}
                      onChange={() => handleSelectParcel(parcel?._id)}
                    />
                  </TableCell>
                  <TableCell>{parcel?.bus_stop}</TableCell>
                  <TableCell>
                    {parcel?.can_carry_heavy ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>{formatDate(parcel?.travel_date)}</TableCell>
                  <TableCell>{formatDate(parcel?.arrival_date)}</TableCell>
                  <TableCell>{parcel?.destination}</TableCell>
                  <TableCell>{parcel?.max_price}</TableCell>
                  <TableCell>{parcel?.min_price}</TableCell>
                  <TableCell>{parcel?.state}</TableCell>
                  <TableCell>
                    {parcel?.user_first_name} {parcel?.user_last_name}
                  </TableCell>
                  <TableCell>{parcel?.users_phone_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {actionType === "delete" ? "Confirm Deletion" : "Confirm Refund"}
        </DialogTitle>
        <DialogContent>
          Are you sure you want to {actionType} the selected parcels?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmAction}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={successModalOpen} onClose={handleCloseSuccessModal}>
        <DialogTitle>{isSuccess ? "Success" : "Error"}</DialogTitle>
        <DialogContent>
          {isSuccess
            ? "The parcels were successfully deleted."
            : "An error occurred while deleting the parcels."}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default DeliverParcel;
