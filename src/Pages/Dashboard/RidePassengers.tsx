import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import {
  deleteItems,
  fetchPassengerRequests,
} from "../../Redux/Dashboard/Dashboard";

// TypeScript interface for passenger request data
interface PassengerRequest {
  _id: string;
  destination: string;
  travelling_date: string;
  current_city: string;
  userId: string;
  user_first_name: string;
  user_last_name: string;
  users_phone_number: string;
  paid: boolean;
  endRide: boolean;
  cancelRide: boolean;
  confirmRide: boolean;
  refundRide: boolean;
  reportRide: boolean;
  startRide: boolean;
  driver: string;
  driver_first_name: string;
  driver_last_name: string;
  driver_phone_number: string;
}

const RidePassengers: React.FC = () => {
  const [requests, setRequests] = useState<PassengerRequest[]>([]);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [filterReported, setFilterReported] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "refund" | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>();

  // Fetch passenger requests
  const fetchRides = async () => {
    try {
      const response = await dispatch(fetchPassengerRequests()).unwrap();
      if (response?.success) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [dispatch]);

  // Handle selecting all or individual requests
  const handleSelectRequest = (requestId: string) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId)
        ? prev.filter((id) => id !== requestId)
        : [...prev, requestId]
    );
  };

  // Handle marking all requests
  const handleMarkAll = () => {
    setSelectedRequests(requests.map((request) => request._id));
  };

  // Filter requests based on the reported status
  const filteredRequests = requests.filter((request) => {
    return (
      filterReported === "all" ||
      (filterReported === "reported" && request.reportRide)
    );
  });

  // Handle action confirmation (delete/refund)
  const handleConfirmAction = () => {
    if (actionType === "delete") {
      dispatch(deleteItems({ ids: selectedRequests, itemType: "passengerrequests" }))
        .unwrap()
        .then((response) => {
          console.log(response, 'response')
          if (response?.success === true) {
            setIsSuccess(true);
            setRequests((prev) =>
              prev.filter((request) => !selectedRequests.includes(request._id))
            );
            setSelectedRequests([]);
          } else {
            setIsSuccess(false);
          }
        })
        .catch(() => setIsSuccess(false));
    }
    setOpenDialog(false);
    setSuccessModalOpen(true);
  };

  // Close success modal
  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setIsSuccess(false);
  };

  // Open action dialog for delete or refund
  const handleOpenDialog = (type: "delete" | "refund") => {
    setActionType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActionType(null);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ padding: 2 }}>
        Ride Passengers Management
      </Typography>

      {/* Filter Control for Reported Rides */}
      <Box sx={{ gap: 2, padding: 2 }}>
        <Typography variant="body1">Filter Reported Rides:</Typography>
        <FormControl sx={{ minWidth: 120, marginTop: 2 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filterReported}
            onChange={(e) => setFilterReported(e.target.value)}
            label="Filter"
          >
            <MenuItem value="all">All Rides</MenuItem>
            <MenuItem value="reported">Reported Rides</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenDialog("delete")}
          >
            Delete Selected
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog("delete")}
            sx={{ marginLeft: 2 }}
          >
            Refund Selected
          </Button>
        </Box>
      </Box>

      {/* Table displaying the ride requests */}
      <TableContainer sx={{ overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedRequests.length === requests.length}
                  onChange={handleMarkAll}
                />
              </TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Travelling Date</TableCell>
              <TableCell>Current City</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Paid</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading
              ? // Display skeleton rows when loading
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="rectangular" width={24} height={24} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                  </TableRow>
                ))
              : filteredRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRequests.includes(request._id)}
                        onChange={() => handleSelectRequest(request._id)}
                      />
                    </TableCell>
                    <TableCell>{request.destination}</TableCell>
                    <TableCell>
                      {new Date(request.travelling_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{request.current_city}</TableCell>
                    <TableCell>
                      {request.user_first_name} {request.user_last_name} <br />
                      {request.users_phone_number}
                    </TableCell>
                    <TableCell>
                      {request.driver_first_name} {request.driver_last_name}{" "}
                      <br />
                      {request.driver_phone_number}
                    </TableCell>
                    <TableCell>{request.paid ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Success Modal */}
      <Dialog open={successModalOpen} onClose={handleCloseSuccessModal}>
        <DialogTitle>{isSuccess ? "Success" : "Error"}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {isSuccess
              ? "The selected requests were successfully deleted."
              : "There was an error processing your request."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to {actionType} the selected requests?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
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

export default RidePassengers;
