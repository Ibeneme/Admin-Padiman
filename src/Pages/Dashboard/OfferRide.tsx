import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { deleteItems, fetchOfferRide } from "../../Redux/Dashboard/Dashboard";

// TypeScript interface for ride data
interface Ride {
  _id: string;
  is_booked: boolean;
  destination: string;
  travelling_date: string;
  current_city: string;
  no_of_passengers: string;
  plate_no: string;
  preferred_take_off: string;
  time_of_take_off: string;
  drop_off: string;
  userId: string;
  driver: string;
  user_first_name: string;
  user_last_name: string;
  users_phone_number: string;
  reportRide: boolean;
}


const OfferRide: React.FC = () => {
  const [selectedRides, setSelectedRides] = useState<string[]>([]);
  const [filterReported, setFilterReported] = useState<string>("all");
  const [deletedRides, setDeletedRides] = useState<string[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [rides, setRides] = useState<Ride[]>([]); // Storing fetched rides
  const [loading, setLoading] = useState(true); // Track loading state
  const dispatch = useDispatch<AppDispatch>();

  // Fetch rides data from API
  const fetchRides = async () => {
    try {
      const response = await dispatch(fetchOfferRide()).unwrap();
      console.log("fetchOfferRide successfully:", response);
      if (response?.success) {
        setRides(response.data); // Update state with fetched rides
      }
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false); // Set loading to false after fetch attempt
    }
  };

  useEffect(() => {
    fetchRides();
  }, [dispatch]);

  // Handle "Mark All" selection
  const handleMarkAll = () => {
    const allRideIds = rides.map((ride) => ride._id);
    const isAllSelected = selectedRides.length === rides.length;
    if (isAllSelected) {
      setSelectedRides([]);
    } else {
      setSelectedRides(allRideIds);
    }
  };

  // Handle individual ride selection
  const handleSelectRide = (rideId: string) => {
    if (selectedRides.includes(rideId)) {
      setSelectedRides(selectedRides.filter((id) => id !== rideId));
    } else {
      setSelectedRides([...selectedRides, rideId]);
    }
  };

  // Open confirmation modal for deleting rides
  const handleDeleteRides = () => {
    setOpenDeleteModal(true); // Open modal when delete button is clicked
  };

  // Confirm deletion
  // Confirm deletion
  const confirmDeleteRides = () => {
    // Create the parameters for the deleteItems action
    const deleteParams = {
      ids: selectedRides,
      itemType: "drivers" as
        | "drivers"
        | "deliverparcels"
        | "sendparcels"
        | "passengerrequests"
        | "withdrawals"
        | "admins", // Explicitly cast the string to the correct literal type
    };

    dispatch(deleteItems(deleteParams));
    fetchRides();
    // Remove deleted rides from the state (locally for immediate UI update)
    setRides(rides.filter((ride) => !selectedRides.includes(ride._id)));
    setDeletedRides([...deletedRides, ...selectedRides]);
    setSelectedRides([]);
    setOpenDeleteModal(false); // Close modal after deletion
  };

  // Cancel deletion
  const cancelDelete = () => {
    setOpenDeleteModal(false); // Close modal if user cancels
  };

  // Filter rides based on the "Filter" selection
  const filteredRides =
    filterReported === "reported"
      ? rides.filter((ride) => ride.reportRide)
      : rides;

  if (loading) {
    return <Typography variant="h6">Loading rides...</Typography>; // Loading state
  }

  return (
    <TableContainer component={Paper} sx={{ overflow: "auto" }}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Offer Ride Management
        </Typography>

        {/* Filter Controls for reported rides */}
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
              onClick={handleDeleteRides} // Trigger modal
              sx={{ marginRight: 2 }}
            >
              Delete Selected
            </Button>
          </Box>
        </Box>

        {/* Table with ride details */}
        <Box sx={{ overflowX: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    onChange={handleMarkAll}
                    checked={selectedRides.length === rides.length}
                    color="primary"
                  />
                </TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Travelling Date</TableCell>
                <TableCell>Current City</TableCell>
                <TableCell>No. of Passengers</TableCell>
                <TableCell>Plate No.</TableCell>
                <TableCell>Time of Takeoff</TableCell>
                <TableCell>Preferred Takeoff</TableCell>
                <TableCell>Drop Off</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRides
                .filter((ride) => !deletedRides.includes(ride._id))
                ?.slice()
                ?.reverse()
                ?.map((ride) => (
                  <TableRow key={ride._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRides.includes(ride._id)}
                        onChange={() => handleSelectRide(ride._id)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>{ride.destination}</TableCell>
                    <TableCell>
                      {new Date(ride.travelling_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{ride.current_city}</TableCell>
                    <TableCell>{ride.no_of_passengers}</TableCell>
                    <TableCell>{ride.plate_no}</TableCell>
                    <TableCell>{ride.time_of_take_off}</TableCell>
                    <TableCell>{ride.preferred_take_off}</TableCell>
                    <TableCell>{ride.drop_off}</TableCell>
                    <TableCell>{`${ride.user_first_name} ${ride.user_last_name}`}</TableCell>
                    <TableCell>{ride.users_phone_number}</TableCell>
                  </TableRow>
                ))}
              {deletedRides.map((rideId) => {
                const ride = rides.find((r) => r._id === rideId);
                return ride ? (
                  <TableRow key={rideId}>
                    <TableCell
                      colSpan={12}
                      style={{
                        textAlign: "center",
                        backgroundColor: "#f8d7da",
                      }}
                    >
                      Deleted Ride: {ride.destination} - {ride.travelling_date}
                    </TableCell>
                  </TableRow>
                ) : null;
              })}
            </TableBody>
          </Table>
        </Box>

        {/* Modal for confirming deletion */}
        <Dialog open={openDeleteModal} onClose={cancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the selected rides?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteRides} color="secondary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </TableContainer>
  );
};

export default OfferRide;
