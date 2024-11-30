import React, { useState } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Dashboard,
  Settings,
  ExitToApp,
  Person,
  LocalShipping,
  CarRental,
  PostAdd,
  CreditCard,
} from "@mui/icons-material"; // Import CarRental for rides
import { Link, useLocation } from "react-router-dom"; // Import useLocation to track current route

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation(); // Get the current location

  const [openLogoutModal, setOpenLogoutModal] = useState(false); // State for modal visibility

  // Function to check if the current link is active
  const isActive = (path: string) => location.pathname === path;

  // Handle logout action
  const handleLogout = () => {
    // Clear localStorage or any other storage mechanism in use
    localStorage.clear(); // or sessionStorage.clear() if using session storage
    
    // Close the logout modal
    setOpenLogoutModal(false); 
    
    // Redirect to the root after clearing storage
    window.location.href = '/'; 
  };

  return (
    <List>
      {/* Dashboard Item */}
      <div style={{ marginTop: 64 }}></div>
      <ListItemButton
        component={Link}
        to="/dashboard"
        sx={{
          backgroundColor: isActive("/dashboard")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/dashboard")
            ? theme.palette.primary.main
            : "inherit",
          "&:hover": {
            backgroundColor: isActive("/dashboard")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <Dashboard
            sx={{
              fontSize: 20,
              color: isActive("/dashboard")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      {/* Users Item */}
      <ListItemButton
        component={Link}
        to="/users"
        sx={{
          backgroundColor: isActive("/users")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/users") ? theme.palette.primary.main : "inherit",
          "&:hover": {
            backgroundColor: isActive("/users")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <Person
            sx={{
              fontSize: 20,
              color: isActive("/users")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      {/* Deliver Parcel Item */}
      <ListItemButton
        component={Link}
        to="/deliver-parcel"
        sx={{
          backgroundColor: isActive("/deliver-parcel")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/deliver-parcel")
            ? theme.palette.primary.main
            : "inherit",
          "&:hover": {
            backgroundColor: isActive("/deliver-parcel")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <LocalShipping
            sx={{
              fontSize: 20,
              color: isActive("/deliver-parcel")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Deliver Parcel" />
      </ListItemButton>
      {/* Offer Ride Item */}
      <ListItemButton
        component={Link}
        to="/offer-ride"
        sx={{
          backgroundColor: isActive("/offer-ride")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/offer-ride")
            ? theme.palette.primary.main
            : "inherit",
          "&:hover": {
            backgroundColor: isActive("/offer-ride")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <CarRental
            sx={{
              fontSize: 20,
              color: isActive("/offer-ride")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Offer Ride" />
      </ListItemButton>

      {/* Send Parcel Item */}
      <ListItemButton
        component={Link}
        to="/send-parcel"
        sx={{
          backgroundColor: isActive("/send-parcel")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/send-parcel")
            ? theme.palette.primary.main
            : "inherit",
          "&:hover": {
            backgroundColor: isActive("/send-parcel")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <LocalShipping
            sx={{
              fontSize: 20,
              color: isActive("/send-parcel")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Send Parcel" />
      </ListItemButton>
      {/* Join Ride Item */}
      <ListItemButton
        component={Link}
        to="/join-ride"
        sx={{
          backgroundColor: isActive("/join-ride")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/join-ride")
            ? theme.palette.primary.main
            : "inherit",
          "&:hover": {
            backgroundColor: isActive("/join-ride")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <CarRental
            sx={{
              fontSize: 20,
              color: isActive("/join-ride")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Join Ride" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/posts"
        sx={{
          backgroundColor: isActive("/posts")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/posts") ? theme.palette.primary.main : "inherit",
          "&:hover": {
            backgroundColor: isActive("/posts")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <PostAdd
            sx={{
              fontSize: 20,
              color: isActive("/posts")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/admins"
        sx={{
          backgroundColor: isActive("/admins")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/admins") ? theme.palette.primary.main : "inherit",
          "&:hover": {
            backgroundColor: isActive("/admins")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <Settings
            sx={{
              fontSize: 20,
              color: isActive("/admins")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Admins" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/request-withdrawals"
        sx={{
          backgroundColor: isActive("/request-withdrawals")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/request-withdrawals")
            ? theme.palette.primary.main
            : "inherit",
          "&:hover": {
            backgroundColor: isActive("/request-withdrawals")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <CreditCard
            sx={{
              fontSize: 20,
              color: isActive("/request-withdrawals")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Withdrawal Requests" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/admin-earnings"
        sx={{
          backgroundColor: isActive("/admin-earnings")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/admin-earnings")
            ? theme.palette.primary.main
            : "inherit",
          "&:hover": {
            backgroundColor: isActive("/admin-earnings")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <CreditCard
            sx={{
              fontSize: 20,
              color: isActive("/admin-earnings")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Padiman Route Earnings" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to="/drivers-requests"
        sx={{
          backgroundColor: isActive("/drivers-requests")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/drivers-requests")
            ? theme.palette.primary.main
            : "inherit",
          "&:hover": {
            backgroundColor: isActive("/drivers-requests")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <LocalShipping
            sx={{
              fontSize: 20,
              color: isActive("/drivers-requests")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Drivers Requests" />
      </ListItemButton>

      <ListItemButton
        component={Link}
        to="/ref-earnings"
        sx={{
          backgroundColor: isActive("/ref-earnings")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/ref-earnings")
            ? theme.palette.primary.main
            : "inherit",
          "&:hover": {
            backgroundColor: isActive("/ref-earnings")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <LocalShipping
            sx={{
              fontSize: 20,
              color: isActive("/ref-earnings")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Referral Earnings" />
      </ListItemButton>

      {/* Logout Item */}
      <ListItemButton
        onClick={() => setOpenLogoutModal(true)} // Open the modal when logout is clicked
        sx={{
          backgroundColor: isActive("/logout")
            ? theme.palette.primary.main + "1A"
            : "transparent",
          color: isActive("/logout") ? theme.palette.primary.main : "inherit",
          "&:hover": {
            backgroundColor: isActive("/logout")
              ? theme.palette.primary.main + "1A"
              : "transparent",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
          <ExitToApp
            sx={{
              fontSize: 20,
              color: isActive("/logout")
                ? theme.palette.primary.main
                : "inherit",
            }}
          />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
      {/* Logout Confirmation Modal */}
      <Dialog
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)} // Close the modal when clicking outside or cancel
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

export default Sidebar;
