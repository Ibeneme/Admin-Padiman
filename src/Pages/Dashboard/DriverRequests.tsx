import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchBecomeDrivers,
  updateRideStatus,
} from "../../Redux/Dashboard/Dashboard"; // Assuming you have an updateRideStatus action
import { AppDispatch } from "../../Redux/Store";

const DriverRequests = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [rides, setRides] = useState<any[]>([]); // Store rides data from API
  const [loading, setLoading] = useState<boolean>(true); // Loading state for API call
  const [filter, setFilter] = useState({
    accepted: false,
    rejected: false,
  });

  // Modal state
  const [open, setOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<any | null>(null);
  const [status, setStatus] = useState<string>("");

  // Fetch rides data from API
  const fetchRides = async () => {
    try {
      const response = await dispatch(fetchBecomeDrivers()).unwrap();
      console.log(response.data, "response.datresponse.dat");
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

  // Filter rides based on selected filter criteria
  const filteredRides = rides.filter((ride) =>
    Object.keys(filter).every((key) => {
      const filterKey = key as keyof typeof filter;
      return !filter[filterKey] || ride[filterKey];
    })
  );

  // Function to handle opening the confirmation modal
  const handleOpen = (ride: any, action: string) => {
    setSelectedRide(ride);
    setStatus(action);
    setOpen(true);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedRide(null);
  };

  // Function to handle updating ride status
  const handleStatusUpdate = async () => {
    if (selectedRide && status) {
      try {
        // Dispatch the action to update the ride status
        const response = await dispatch(
          updateRideStatus({ rideId: selectedRide.userId, status })
        ).unwrap();
        console.log("Status update response:", response);

        // Refresh the rides data after status update
        fetchRides();

        // Close the modal after updating the status
        handleClose();
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Driver Requests
      </Typography>

      {/* Filter Dropdown */}
      <FormControl sx={{ minWidth: 120, marginTop: 2 }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={
            filter.accepted ? "accepted" : filter.rejected ? "rejected" : "all"
          }
          onChange={(e) => {
            const newFilter = {
              accepted: false,
              rejected: false,
              [e.target.value]: true,
            };
            setFilter(newFilter);
          }}
          label="Filter"
        >
          <MenuItem value="all">All Requests</MenuItem>
          <MenuItem value="accepted">Accepted Requests</MenuItem>
          <MenuItem value="rejected">Rejected Requests</MenuItem>
        </Select>
      </FormControl>

      {/* Loader while data is being fetched */}
      {loading ? (
        <CircularProgress sx={{ marginTop: 4 }} />
      ) : (
        <Table sx={{ marginTop: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>License Number</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Car Video</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRides
              ?.slice()
              ?.reverse()
              ?.map((ride) => (
                <TableRow key={ride._id}>
                  <TableCell>{ride.firstName}</TableCell>
                  <TableCell>{ride.lastName}</TableCell>
                  <TableCell>{ride.licenseNumber}</TableCell>
                  <TableCell>{ride.phoneNumber}</TableCell>
                  <TableCell>{ride.status}</TableCell>
                  <TableCell>
                    <a
                      href={ride.carVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Car Video
                    </a>
                  </TableCell>
                  <TableCell>
                    {new Date(ride.dateOfBirth).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {/* Display buttons only if status is "Pending" */}
                    {ride.status === "pending" && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpen(ride, "accepted")}
                          sx={{ marginRight: 1 }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleOpen(ride, "rejected")}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm {status} Request</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {status.toLowerCase()} this driver request?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusUpdate} color="primary">
            {status}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DriverRequests;
