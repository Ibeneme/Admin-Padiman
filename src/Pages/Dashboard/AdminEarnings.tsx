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
  Modal,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import {
  fetchEarnings,
  updateWithdrawal,
} from "../../Redux/Dashboard/Dashboard";

const AdminEarnings: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]); // Store API data here
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [action, setAction] = useState<"accepted" | "rejected" | null>(null);
  const [requestsTotal, setRequestsTotal] = useState<number>(0); // Store total amount here
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    try {
      const response = await dispatch(fetchEarnings()).unwrap();
      if (response?.success) {
        setRequests(response.data); // Set the response data to the state
        setRequestsTotal(response.totalAmount); // Set the total amount of accepted withdrawals
      } else {
        console.error("Failed to load requests");
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  // Filter the requests based on status



  const confirmAction = async () => {
    if (selectedRequest && action) {
      try {
        const response = await dispatch(
          updateWithdrawal({
            _id: selectedRequest._id,
            status: action,
          })
        );
        if (response.payload.success) {
          fetchData();
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
        Padiman Route Earnings
      </Typography>
      <Typography variant="body1">
        Total Earnings, NGN{requestsTotal}:
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell>Accepted Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests
              ?.slice()
              ?.reverse()
              ?.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>
                    {request.user.first_name} {request.user.last_name}
                  </TableCell>
                  <TableCell>{request.amount}</TableCell>

                  <TableCell>
                    {new Date(request.date).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {request.acceptedTime
                      ? new Date(request.acceptedTime).toLocaleString()
                      : "Not Accepted"}
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

export default AdminEarnings;
