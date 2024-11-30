import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword, validateOtp } from "../../Redux/Auth/authSlice";
import { AppDispatch } from "../../Redux/Store";

interface OTPValues {
  otp: string;
}

const OTPPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Initialize dispatch
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30); // Countdown timer for resend OTP
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false); // State for success alert

  const phoneNumber = location.state?.phoneNumber; // Access phone number from state

  // Timer effect to countdown every second
  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined;

    if (otpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown); // Stop the timer when it reaches 0
    }

    return () => clearInterval(countdown); // Cleanup on component unmount or when timer stops
  }, [otpSent, timer]);

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]+$/, "OTP must contain only numbers")
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const initialValues: OTPValues = {
    otp: "",
  };

  const handleSubmit = (values: OTPValues) => {
    setError(null); // Reset error state before submitting
    if (phoneNumber) {
      dispatch(validateOtp({ phoneNumber, otp: values.otp }))
        .then((response) => {
          if (response.payload.message === "OTP validated successfully.") {
            navigate("/reset-password", { state: { phoneNumber } });
          } else {
            setError("OTP Incorrect");
          }
        })
        .catch((error) => {
          setError(error?.response?.data?.message || "OTP validation failed.");
        });
    }
  };

  const handleResendOTP = () => {
    setError(null); // Reset error state before resending OTP
    if (phoneNumber) {
      dispatch(forgotPassword({ phoneNumber }))
        .then((response) => {
          if (response.payload.message === "OTP sent successfully.") {
            setSuccess(true); // Set success to true to show the success alert
          }
          setOtpSent(true); // Mark OTP as sent
          setTimer(30); // Reset timer for resend OTP
          console.log("OTP resent to:", phoneNumber);
        })
        .catch((error) => {
          setError(error?.response?.data?.message || "Error resending OTP.");
        });
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
        Enter OTP
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        Please enter the OTP sent to your phone number.
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={3}>
        Phone Number: {phoneNumber} {/* Display phone number */}
      </Typography>

      {!otpSent ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form style={{ width: "100%", maxWidth: "400px" }}>
              {error && (
                <Alert
                  severity="error"
                  sx={{ width: "90%", marginBottom: 2, alignSelf: "center" }}
                >
                  {error}
                </Alert>
              )}
              {success && (
                <Alert
                  severity="success"
                  sx={{ width: "90%", marginBottom: 2, alignSelf: "center" }}
                >
                  OTP Sent Successfully!
                </Alert>
              )}
              <Field
                as={TextField}
                name="otp"
                label="OTP"
                fullWidth
                margin="normal"
                variant="outlined"
                error={touched.otp && Boolean(errors.otp)}
                helperText={touched.otp && errors.otp}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2, padding: 1.4 }}
                disabled={otpSent || !touched.otp || Boolean(errors.otp)}
              >
                Verify OTP
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Typography variant="h6" color="success.main">
          OTP Verified! Proceed to reset your password.
        </Typography>
      )}

      {/* Resend OTP button and countdown */}
      {!otpSent && (
        <Button
          variant="text"
          color="secondary"
          sx={{ marginTop: 2 }}
          onClick={handleResendOTP}
          disabled={timer > 0} // Disable resend button if timer is running
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </Button>
      )}
    </Box>
  );
};

export default OTPPage;