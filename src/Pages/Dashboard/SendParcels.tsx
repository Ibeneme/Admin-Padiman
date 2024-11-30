import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { AppDispatch } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import { deleteItems, fetchSendParcels } from "../../Redux/Dashboard/Dashboard";
import { ShimmerLoader } from "./ShimmerLoader";

interface Parcel {
  _id: string;
  user_first_name: string;
  user_last_name: string;
  receiver_name: string;
  paid: boolean;
  amount: number;
  endRide: boolean;
  cancelRide: boolean;
  confirmRide: boolean;
  startRide: boolean;
  refundRide: boolean;
  state: string | null;
  sender_city: string | null;
  receiver_city: string | null;
  delivery_date: string | null;
  is_perishable: boolean;
  is_fragile: boolean;
}

const SendParcels: React.FC = () => {
  const [rides, setRides] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState({
    endRide: false,
    cancelRide: false,
    confirmRide: false,
    paid: false,
    startRide: false,
    refundRide: false,
  });
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    action: "delete" | "refund" | null;
  }>({ open: false, action: null });
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const formatDate = (date: string | null) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    const day = parsedDate.getDate();
    const month = parsedDate.toLocaleString("default", { month: "long" });
    const year = parsedDate.getFullYear();
    const suffix = ["th", "st", "nd", "rd"][(day % 10) - 1] || "th";
    return `${day}${suffix} ${month} ${year}`;
  };

  const fetchRides = async () => {
    try {
      const response = await dispatch(fetchSendParcels()).unwrap();
      if (response?.success) setRides(response.data);
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [dispatch]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.checked ? rides.map((parcel) => parcel._id) : []);
  };

  const handleSelectOne = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setSelected((prev) =>
      event.target.checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleConfirmAction = async () => {
    if (!dialogState.action) return;

    try {
      console.log(selected, "selected"); // Should be an array of objects or IDs

      const response = await dispatch(
        deleteItems({
          ids: selected, // Ensure only IDs are passed
          itemType: "sendparcels",
        })
      ).unwrap();

      fetchRides(); // Refresh data

      if (response?.success) {
        // Check deletedCount instead of success
        setIsSuccess(true);
        setRides((prevData) =>
          prevData.filter((parcel) => !selected.includes(parcel._id))
        );
        setSelected([]); // Clear selection
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
    } finally {
      setSuccessModalOpen(true);
      setDialogState({ open: false, action: null });
    }
  };

  const filteredParcels = rides.filter((parcel) =>
    Object.keys(filter).every((key) => {
      const filterKey = key as keyof typeof filter; // Explicitly assert key type
      return !filter[filterKey] || parcel[filterKey];
    })
  );

  if (loading) {
    return (
      <div className="shimmer-container">
        <ShimmerLoader />
        <ShimmerLoader />
        <ShimmerLoader />
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ padding: 12 }}>Send Parcels Management</h1>

      {/* Filters Section */}
      <Box sx={{ gap: 2, padding: 2 }}>
        <Typography variant="body1">Filter Parcels:</Typography>
        <FormControl sx={{ minWidth: 120, marginTop: 2 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter.endRide ? "endRide" : "all"}
            onChange={(e) => {
              setFilter({ ...filter, endRide: e.target.value === "endRide" });
            }}
            label="Filter"
          >
            <MenuItem value="all">All Parcels</MenuItem>
            <MenuItem value="endRide">End Parcels</MenuItem>
            <MenuItem value="startRide">Start Parcels</MenuItem>
            <MenuItem value="cancelRide">Cancel Parcels</MenuItem>
            <MenuItem value="confirmRide">Confirm Parcels</MenuItem>
            <MenuItem value="refundRide">Refund Parcels</MenuItem>
            <MenuItem value="paid">Paid Parcels</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Action Buttons */}
      {selected.length > 0 && (
        <Box sx={{ marginBottom: 2, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDialogState({ open: true, action: "delete" })}
          >
            Delete Selected
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogState({ open: true, action: "refund" })}
          >
            Refund Selected
          </Button>
        </Box>
      )}

      {/* Table */}
      <TableContainer sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selected.length === filteredParcels.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Sender</TableCell>
              <TableCell>Receiver</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Sender City</TableCell>
              <TableCell>Receiver City</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Perishable</TableCell>
              <TableCell>Fragile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParcels.map((parcel) => (
              <TableRow key={parcel._id}>
                <TableCell>
                  <Checkbox
                    checked={selected.includes(parcel._id)}
                    onChange={(e) => handleSelectOne(e, parcel._id)}
                  />
                </TableCell>
                <TableCell>
                  {parcel.user_first_name} {parcel.user_last_name}
                </TableCell>
                <TableCell>{parcel.receiver_name}</TableCell>
                <TableCell>{parcel.paid ? "Paid" : "Unpaid"}</TableCell>
                <TableCell>{parcel.amount}</TableCell>
                <TableCell>{parcel.state}</TableCell>
                <TableCell>{parcel.sender_city}</TableCell>
                <TableCell>{parcel.receiver_city}</TableCell>
                <TableCell>{formatDate(parcel.delivery_date)}</TableCell>
                <TableCell>{parcel.is_perishable ? "Yes" : "No"}</TableCell>
                <TableCell>{parcel.is_fragile ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Success Modal */}
      <Dialog
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      >
        <DialogTitle>{isSuccess ? "Success" : "Error"}</DialogTitle>
        <DialogContent>
          {isSuccess
            ? "The parcels were successfully processed."
            : "An error occurred during processing."}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={dialogState.open}>
        <DialogTitle>
          Confirm {dialogState.action === "delete" ? "Delete" : "Refund"}
        </DialogTitle>
        <DialogContent>
          Are you sure you want to{" "}
          {dialogState.action === "delete" ? "delete" : "refund"}{" "}
          {selected.length} parcel(s)?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogState({ open: false, action: null })}>
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SendParcels;
