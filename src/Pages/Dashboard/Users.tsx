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
  Avatar,
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
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import {
  User,
  fetchUsers,
  updateUserStatus,
} from "../../Redux/Dashboard/Dashboard";

const Users = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "block" | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userFilter, setUserFilter] = useState<string>("all");
  const [actionLoading, setActionLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.dashboard.users);
  const loading = useSelector((state: RootState) => state.dashboard.loading);
  const error = useSelector((state: RootState) => state.dashboard.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleConfirmAction = async () => {
    if (!actionType || selectedUsers.length === 0) return;

    // Ensure only valid string IDs are included in userIds
    const userIds = selectedUsers
      .map((user) => user._id) // Extract _id values
      .filter((id): id is string => id !== undefined); // Filter out undefined values

    const deleteFlag = actionType === "delete";
    const blockFlag = actionType === "block";

    setActionLoading(true);
    try {
      await dispatch(
        updateUserStatus({
          userIds,
          deleteFlag,
          blockFlag,
        })
      ).unwrap();

      setIsSuccess(true);
      setOpenDialog(false);
      setSuccessModalOpen(true);

      // Refresh user list
      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error updating user status:", error);
      setIsSuccess(false);
      setOpenDialog(false);
      setSuccessModalOpen(true);
    } finally {
      setActionLoading(false);
    }
  };
  const handleSelectUser = (user: User) => {
    setSelectedUsers((prev) =>
      prev.some((selected) => selected._id === user._id)
        ? prev.filter((selected) => selected._id !== user._id)
        : [...prev, user]
    );
  };
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers);
    }
  };

  // const handleConfirmBlock = () => {
  //   setIsSuccess(true);
  //   setOpenDialog(false);
  //   setSuccessModalOpen(true);
  // };

  // const handleConfirmDelete = () => {
  //   setIsSuccess(true);
  //   setOpenDialog(false);
  //   setSuccessModalOpen(true);
  // };

  const handleSendMails = () => {
    const mailTo = selectedUsers.join(",");
    window.location.href = `mailto:${mailTo}`;
  };

  const handleOpenDialog = (action: "delete" | "block") => {
    setActionType(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActionType(null);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setIsSuccess(false);
  };

  const filteredUsers: User[] = users.filter((user) => {
    if (userFilter === "blocked") return user.blocked;
    if (userFilter === "is_driver") return user.is_driver;
    if (userFilter === "is_verified") return user.is_verified;
    if (userFilter === "not_verified") return !user.is_verified;
    return true;
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: 4, position: "relative" }}
    >
      <Typography
        variant="h5"
        sx={{
          padding: 2,
          color: "#8C08F0",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        User Management
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Typography variant="body1">Filter Users:</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            label="Filter"
          >
            <MenuItem value="all">All Users</MenuItem>
            <MenuItem value="is_driver">Drivers </MenuItem>
            <MenuItem value="blocked">Blocked Users</MenuItem>
            <MenuItem value="is_verified">Verified Users</MenuItem>
            <MenuItem value="not_verified">Not Verified Users</MenuItem>
          </Select>
        </FormControl>

        {/* Add the Button to open the dialog */}
      </Box>
      {selectedUsers?.length >= 1 && (
        <Box sx={{ display: "flex", gap: 2, padding: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpenDialog("block")}
            disabled={selectedUsers.length === 0}
          >
            Block Selected
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenDialog("delete")}
            disabled={selectedUsers.length === 0}
          >
            Delete Selected
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMails}
            disabled={selectedUsers.length === 0}
          >
            Send Emails
          </Button>
        </Box>
      )}

      {/* Loading State with Shimmer Effect */}
      {loading && (
        <Box sx={{ padding: 2 }}>
          {[...Array(5)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={40}
              sx={{ marginBottom: 2 }}
            />
          ))}
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography variant="body1" color="error" sx={{ padding: 2 }}>
          {error}
        </Typography>
      )}

      {/* User Table */}
      {!loading && !error && filteredUsers.length === 0 ? (
        <Typography variant="body1" sx={{ padding: 2, textAlign: "center" }}>
          No users available for the selected filter.
        </Typography>
      ) : (
        !loading &&
        !error && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Profile</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Total Earnings (₦)</TableCell>
                <TableCell>Withdrawals (₦)</TableCell>
                <TableCell>Refunds (₦)</TableCell>
                <TableCell>Balance (₦)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                ?.slice()
                ?.reverse()
                ?.map((user) => {
                  const {
                    _id,
                    profile_img_url,
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    totalEarnings,
                    totalWithdrawals,
                    totalRefunds,
                    totalBalance,
                  } = user;

                  return (
                    <TableRow key={_id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={selectedUsers.some(
                            (user) => user._id === _id
                          )} // Check if user is selected
                          onChange={() => {
                            const user = selectedUsers.find(
                              (user) => user._id === _id
                            );
                            if (user) {
                              handleSelectUser(user); // Pass the full user object
                            } else {
                              // Handle the case where no user is found (if needed)
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Avatar
                          src={profile_img_url}
                          alt={`${first_name} ${last_name}`}
                        />
                      </TableCell>

                      <TableCell>{first_name}</TableCell>
                      <TableCell>{last_name}</TableCell>
                      <TableCell>{phone_number}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>₦{totalEarnings.toLocaleString()}</TableCell>
                      <TableCell>
                        ₦{totalWithdrawals.toLocaleString()}
                      </TableCell>
                      <TableCell>₦{totalRefunds.toLocaleString()}</TableCell>
                      <TableCell>₦{totalBalance.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {actionType === "delete" ? "Delete User(s)" : "Block User(s)"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to {actionType} the selected user(s)?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary">
            {actionLoading ? "Processing..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>

      <>
        {/* Success Modal */}
        <Dialog open={successModalOpen} onClose={handleCloseSuccessModal}>
          <DialogTitle>Action Successful</DialogTitle>
          <DialogContent>
            {isSuccess && (
              <Typography variant="body1" color="success.main">
                The action was completed successfully!
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSuccessModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </TableContainer>
  );
};

export default Users;
