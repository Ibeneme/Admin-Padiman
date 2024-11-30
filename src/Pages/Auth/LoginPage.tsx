import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { login } from "../../Redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store"; // Import RootState
import { useUserContext } from "../../Context/UserContext";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth); // Type state with RootState

  // User context
  const { setUser } = useUserContext(); // Access setUser function from context

  // Validation schema
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only numbers")
      .length(11, "Phone number must be 11 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*]/,
        "Password must contain at least one special character"
      )
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const initialValues = {
    phoneNumber: "",
    password: "",
  };

  const handleSubmit = async (
    values: { phoneNumber: string; password: string },
    { resetForm }: FormikHelpers<{ phoneNumber: string; password: string }>
  ) => {
    try {
      const result = await dispatch(login(values)).unwrap();
      console.log("Login Successful:", result);

      // Store token in localStorage
      if (result.token) {
        const { password, ...userData } = result.user;
        setUser(userData); // Set user data in context

        localStorage.setItem("accessToken", result.token);
        localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
      }

      // Store user data in context (except password)

      // Reload the page
      window.location.reload();

      // Once the page is reloaded, navigate to the dashboard
      navigate("/dashboard");

      resetForm(); // Only reset the form if login is successful
    } catch (err) {
      console.error("Login Failed:", err);
      // Handle error if login fails
      if (err instanceof Error) {
        alert(`Login Failed: ${err.message}`); // Customize error message if needed
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
        Admin Login
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        Please enter your valid phone number and password to log in.
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form style={{ width: "100%", maxWidth: "400px" }}>
            <Field
              as={TextField}
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              margin="normal"
              variant="outlined"
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              variant="outlined"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography
                variant="body2"
                color="error"
                textAlign="center"
                mt={2}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                padding: 1.4,
              }}
              disabled={!(isValid && dirty) || loading}
              startIcon={
                loading ? <CircularProgress size={20} color="inherit" /> : null
              }
            >
              Submit
            </Button>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                marginTop: 2,
                cursor: "pointer",
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
