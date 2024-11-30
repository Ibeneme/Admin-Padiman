import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import dispatch hook
import { forgotPassword } from "../../Redux/Auth/authSlice";
import { AppDispatch } from "../../Redux/Store";

interface ForgotPasswordValues {
  phoneNumber: string;
}

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Initialize dispatch
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for OTP request
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to store error messages

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only numbers")
      .length(11, "Phone number must be 11 digits")
      .required("Phone number is required"),
  });

  const initialValues: ForgotPasswordValues = {
    phoneNumber: "",
  };

  const handleSubmit = (
    values: ForgotPasswordValues,
    { resetForm }: FormikHelpers<ForgotPasswordValues>
  ) => {
    setLoading(true); // Set loading state before sending OTP request
    setErrorMessage(null); // Reset any previous error messages
    // Dispatch forgotPassword action and handle response with then and catch
    dispatch(forgotPassword({ phoneNumber: values.phoneNumber }))
      .then((response) => {
        setLoading(false); // Reset loading state after response
        if (response.payload.message === "OTP sent successfully.") {
          resetForm(); // Reset the form after successful submission
          navigate("/otp", { state: { phoneNumber: values.phoneNumber } }); // Navigate to OTP page
        } else {
          setErrorMessage("Phone Number isn't in the Admin Database."); // Display error message
        }
        console.log("OTP sent to:", response, values.phoneNumber);
      })
      .catch((error) => {
        setLoading(false); // Reset loading state on error
        console.error("Error sending OTP:", error);
        setErrorMessage("Error sending OTP. Please try again later."); // Display error message
      });
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
        Forgot Password
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        Please enter your valid phone number to Proceed
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form style={{ width: "100%", maxWidth: "400px" }}>
            {/* Display error message if exists */}
            {errorMessage && (
              <Alert
                severity="error"
                sx={{ width: "90%", marginBottom: 2, alignSelf: "center" }}
              >
                {errorMessage}
              </Alert>
            )}

            <Field
              as={TextField}
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              margin="normal"
              variant="outlined"
              error={touched.phoneNumber && Boolean(errors.phoneNumber)} // Error state
              helperText={touched.phoneNumber && errors.phoneNumber} // Display error message
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, padding: 1.4 }}
              disabled={
                !(touched.phoneNumber && !errors.phoneNumber) || loading
              } // Disable if there's an error or if loading
            >
              {loading ? "Sending..." : "Send OTP"}{" "}
              {/* Show loading text or button text */}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPassword;
