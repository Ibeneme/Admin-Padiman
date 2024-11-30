import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Box,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import {
  fetchWithdrawalRequests,
  updateWithdrawal,
} from "../../Redux/Dashboard/Dashboard";

const RequestWithdrawalTable: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]); // Store API data here
  const [filterStatus, setFilterStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [action, setAction] = useState<"accepted" | "rejected" | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    try {
      const response = await dispatch(fetchWithdrawalRequests()).unwrap();
      if (response?.success) {
        setRequests(response.data); // Set the response data to the state
      } else {
        console.error("Failed to load requests");
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };
  // Fetch withdrawal requests
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterStatus(event.target.value);
  };

  // Filter the requests based on status
  const filteredRequests = requests.filter((request) => {
    if (filterStatus === "all") return true;
    return request.status === filterStatus;
  });

  const handleAction = (request: any, actionType: "accepted" | "rejected") => {
    setSelectedRequest(request);
    setAction(actionType);
    setModalOpen(true);
  };

  const confirmAction = async () => {
    console.log(selectedRequest, "selectedRequest");
    if (selectedRequest && action) {
      try {
        const response = await dispatch(
          updateWithdrawal({
            _id: selectedRequest.userId,
            status: (action as "accepted") || "rejected",
            withdrawalID: selectedRequest?.withdrawalID || " ",
          })
        );
        console.log(response, "hh");

        // Check if the action was fulfilled
        if (response.payload.success === true) {
          // If fulfilled, handle success
          const successPayload = response.payload;
          if (successPayload?.success) {
            fetchData();
            // Update the local state after successful update
            setRequests((prevRequests) =>
              prevRequests.map((request) =>
                request._id === selectedRequest._id
                  ? { ...request, status: action }
                  : request
              )
            );
          } else {
            console.error("Failed to update withdrawal status.");
          }
        }

        // Check if the action was rejected
        else if (response.type === "updateWithdrawal/rejected") {
          const errorMessage = "An unknown error occurred";
          console.error("Failed to update withdrawal status:", errorMessage);
        } else {
          console.error("Unexpected response type:", response.type);
        }
      } catch (error) {
        console.error("Error updating withdrawal status:", error);
      }
    }

    setModalOpen(false);
    setSelectedRequest(null);
    setAction(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRequest(null);
    setAction(null);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Request Withdrawals
      </Typography>
      <Typography variant="body1">Filter Withdrawals:</Typography>
      <FormControl sx={{ minWidth: 120, marginTop: 2 }}>
        <InputLabel>Filter</InputLabel>
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          label="Filter"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell>Bank</TableCell>
              <TableCell>Bank Code</TableCell>
              <TableCell>Requested Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests
              ?.slice()
              ?.reverse()
              ?.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.accountNumber}</TableCell>
                  <TableCell>{request.bank}</TableCell>
                  <TableCell>{request.bankCode}</TableCell>
                  <TableCell>{request.requestedAmount}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {new Date(request.dateRequested).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {request.status === "pending" && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAction(request, "accepted")}
                          sx={{ marginRight: 1 }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleAction(request, "rejected")}
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
      </TableContainer>

      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            minWidth: 300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm {action === "accepted" ? "Acceptance" : "Rejection"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to {action} this request for{" "}
            {selectedRequest?.accountName}?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button onClick={closeModal} sx={{ marginRight: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color={action === "accepted" ? "success" : "error"}
              onClick={confirmAction}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default RequestWithdrawalTable;
