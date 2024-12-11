
type Props = {}

function BecomeADriver({}: Props) {
  return (
    <div>BecomeADriver</div>
  )
}

export default BecomeADriver


// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Alert,
//   IconButton,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { launchImageLibrary } from "react-native-image-picker";
// import axios from "axios";
// // Adjust the import path
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../BaseUrl";

// const BecomeADriver = () => {
//   const [licenseNumber, setLicenseNumber] = useState("");
//   const [carVideoUri, setCarVideoUri] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [errors, setErrors] = useState<{
//     licenseNumber: string;
//     carVideo: string;
//   }>({
//     licenseNumber: "",
//     carVideo: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [DOBErr, setDOBErr] = useState("");
//   const history = useNavigate();

//   const selectVideo = () => {
//     launchImageLibrary(
//       { mediaType: "video", quality: 0.5, selectionLimit: 1 },
//       (response) => {
//         if (response.assets && response.assets.length > 0) {
//           const selectedVideo = response.assets[0];
//           setCarVideoUri(selectedVideo.uri);
//         }
//       }
//     );
//   };

//   const validateForm = () => {
//     let formValid = true;
//     const newErrors = { licenseNumber: "", carVideo: "" };

//     if (!licenseNumber) {
//       newErrors.licenseNumber = "License number is required";
//       formValid = false;
//     }

//     if (!selectedDate) {
//       setDOBErr("Date of Birth is required");
//       formValid = false;
//     } else {
//       setDOBErr("");
//     }

//     if (!carVideoUri) {
//       newErrors.carVideo = "Please upload a video of the car.";
//       formValid = false;
//     }

//     setErrors(newErrors);
//     return formValid;
//   };

//   const handleFormSubmit = async () => {
//     if (!validateForm()) return;

//     setIsLoading(true); // Start loading

//     try {
//       const user_id = localStorage.getItem("user_id");
//       if (!user_id) {
//         alert("User not logged in. Please log in first.");
//         setIsLoading(false);
//         return;
//       }

//       const formData = new FormData();
//       formData.append("licenseNumber", licenseNumber);
//       formData.append("dateOfBirth", formatDate(selectedDate));
//       formData.append("user_id", user_id);

//       if (carVideoUri) {
//         formData.append("video", {
//           uri: carVideoUri,
//           name: "car_video.mp4",
//           type: "video/mp4",
//         });
//       }

//       const response = await axios.post(
//         `${API_BASE_URL}/api/backblaze/become-a-driver`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Form submitted successfully");
//         history.goBack(); // Navigate back on success
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert(
//         "An error occurred while submitting the form. Would you like to send us a mail?"
//       );
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   const formatDate = (date: Date | null): string => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     return `${year}/${month}/${day}`;
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Become a Driver
//       </Typography>

//       <TextField
//         label="License Number"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         value={licenseNumber}
//         onChange={(e) => setLicenseNumber(e.target.value)}
//         error={!!errors.licenseNumber}
//         helperText={errors.licenseNumber}
//       />

//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <DatePicker
//           label="Date of Birth"
//           value={selectedDate}
//           onChange={(newValue) => setSelectedDate(newValue)}
//           renderInput={(props) => <TextField {...props} fullWidth />}
//         />
//       </LocalizationProvider>
//       {DOBErr && <Typography color="error">{DOBErr}</Typography>}

//       <Button variant="outlined" sx={{ marginTop: 2 }} onClick={selectVideo}>
//         Upload Car Video
//       </Button>
//       {carVideoUri && (
//         <video
//           src={carVideoUri}
//           controls
//           width="100%"
//           style={{ marginTop: 10 }}
//         />
//       )}
//       {errors.carVideo && (
//         <Typography color="error">{errors.carVideo}</Typography>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleFormSubmit}
//         sx={{ marginTop: 3 }}
//         disabled={isLoading}
//       >
//         {isLoading ? <CircularProgress size={24} /> : "Submit"}
//       </Button>
//     </Box>
//   );
// };

// export default BecomeADriver;

