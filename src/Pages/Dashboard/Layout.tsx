import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; // This will render the nested routes

const Layout: React.FC = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen width is small (Mobile)

  // State to control the mobile sidebar visibility
  const [openSidebar, setOpenSidebar] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Box
      sx={{
        display: isMobile ? "row" : "flex",
        minHeight: "100vh",

      }}
    >
      {/* AppBar (Top bar with menu icon on mobile) */}
      {isMobile && (
        <AppBar position="sticky" sx={{ height: "60px", boxShadow: "none" }}>
          <Toolbar sx={{ height: "100%" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontSize: 14 }}>
              {user ? `${user.firstName} ${user.lastName}` : "Padiman Route"}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar, visible only on larger screens */}
      <Drawer
        sx={{
          width: 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240, // Adjust width for desktop
            boxSizing: "border-box",
          },
        }}
        variant={isMobile ? "temporary" : "permanent"} // Toggle based on screen size
        anchor="left"
        open={isMobile ? openSidebar : true} // For mobile, use state to control open/close
        onClose={toggleSidebar} // Close on clicking outside for mobile
      >
        <Sidebar />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: isMobile ? 0 : 0,
          transition: "margin-left 0.3s ease", // Smooth transition for margin change
          marginLeft: isMobile ? 0 : "240px", // Adjust content margin for mobile
        }}
      >
        {/* Render the current page */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
