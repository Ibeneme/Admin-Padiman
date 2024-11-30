import React from "react";
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Animation for the check circle icon (scaling effect)
  const scaleAnimation = useSpring({
    to: { transform: "scale(1.5)" },
    from: { transform: "scale(0)" },
    config: { duration: 1000 },
  });

  const handleProceedToLogin = () => {
    navigate("/"); // Navigate to login page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "16px",
        backgroundColor:'#f4f4f4'
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          padding: isMobile ? "16px" : "24px",
          borderRadius: isMobile ? "0px" : "8px",
          backgroundColor:'#fff'
        }}
      >
        <animated.div style={scaleAnimation}>
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              color: theme.palette.primary.main,
              marginBottom: theme.spacing(2),
              marginTop: 2
            }}
          />
        </animated.div>
        <Typography variant="h4" mb={2} color="textPrimary">
          Password Reset Successfully
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Your password has been reset successfully. You can now proceed to login.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1.4 }}
          onClick={handleProceedToLogin}
        >
          Proceed to Login
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPage;