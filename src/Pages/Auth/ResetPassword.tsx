import React, { useState } from "react";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Redux/Auth/authSlice";
import { AppDispatch, RootState } from "../../Redux/Store";

interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); // Local state to handle errors
  const [successMessage, setSuccessMessage] = useState<string>(""); // Local state to handle success message
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber; // Access phone number from state
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues: ResetPasswordValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: ResetPasswordValues) => {
    if (phoneNumber) {
      try {
        setErrorMessage(""); // Reset any previous error messages
        setSuccessMessage(""); // Reset success message before making request

        // Dispatch the password update action
        const response = await dispatch(updatePassword({ phoneNumber, newPassword: values.password }));

        // Check if the response was successful and update successMessage
        if (response?.payload?.success) {
          setSuccessMessage("Password reset successful.");
          navigate('/success')
        } else {
          setErrorMessage("Failed to reset password. Please try again.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while resetting the password. Please try again.");
      }
    }
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
      }}
    >
      <Typography variant="h4" mb={1}>
        Reset Password
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        Please enter a new password to proceed.
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        Phone Number: {phoneNumber} {/* Display phone number */}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form style={{ width: "100%", maxWidth: "400px" }}>
            {/* New Password Field */}
            <Field
              as={TextField}
              name="password"
              label="New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {/* Confirm Password Field */}
            <Field
              as={TextField}
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    aria-label="toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, padding: 1.4 }}
              disabled={!(isValid && dirty) || loading} // Disable button if form is not valid, dirty or loading
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
            {errorMessage && (
              <Typography color="error" mt={2}>
                {errorMessage} {/* Display error message */}
              </Typography>
            )}
            {successMessage && (
              <Typography color="primary" mt={2}>
                {successMessage} {/* Display success message */}
              </Typography>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ResetPassword;