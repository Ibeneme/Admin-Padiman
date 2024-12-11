import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  Switch,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchAdmins,
  createAdmin,
  deleteAdmin,
  DeleteAdminParams,
  updateAdminRights,
} from "../../Redux/Dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";

// Define the TypeScript interface for the Admin type
interface Admin {
  _id?: string;
  adminId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  superAdmin: boolean;
  markedForDelete: boolean;
  rights: {
    viewUsers: boolean;
    editUsers: boolean;
    deleteUsers: boolean;
  };
}

const AdminTable: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [adminErr, setAdminErr] = useState<string>("");
  const [adminsDelete, setAdminsDelete] = useState<Admin[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const formatRightText = (right: string) => {
    return right
      .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
      .toLowerCase(); // Convert the rest to lowercase
  };

  const fetchData = async () => {
    try {
      const response = await dispatch(fetchAdmins()).unwrap();
      if (response?.success) {
        setAdmins(response.admins);
      } else {
        console.error("Failed to load admin data.");
      }
    } catch (err) {
      console.error("Error fetching admins data.", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newAdmin = {
        ...values,
        superAdmin: false,
        markedForDelete: false,
      };
      dispatch(createAdmin(newAdmin))
        .unwrap()
        .then((response) => {
          console.log(response, "response");
          if (response.success) {
            setAdmins([...admins, response]);
            setOpenModal(false);
            fetchData();
          }
        })
        .catch((error) => {
          setAdminErr(error);
          console.error("Failed to create admin:", error);
        });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDeleteSelectedAdmins = () => {
    if (adminsDelete.length > 0) {
      adminsDelete.forEach((admin) => {
        const deleteParams: DeleteAdminParams = {
          adminId: admin._id || "", // Pass the correct structure here
        };

        dispatch(deleteAdmin(deleteParams))
          .unwrap()
          .then((response) => {
            console.log(response);
            if (response.success) {
              setAdmins((prevAdmins) =>
                prevAdmins.filter((a) => a.adminId !== admin.adminId)
              );
              fetchData(); // Refresh the admin list
            }
          })
          .catch((error) => {
            console.error("Failed to delete admin:", error);
          });
      });
    }

    setDeleteModalOpen(false); // Close the delete confirmation modal
  };

  // Check if any admin is selected for deletion
  const handleToggleRights = async (
    adminId: string,
    right: keyof Admin["rights"],
    currentValue: boolean
  ) => {
    try {
      const updatedRights = { [right]: !currentValue };

      const response = await dispatch(
        updateAdminRights({ adminId, rights: updatedRights })
      ).unwrap();

      if (response?.success) {
        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === adminId
              ? { ...admin, rights: { ...admin.rights, ...updatedRights } }
              : admin
          )
        );
      }
    } catch (error) {
      console.error("Error updating rights:", error);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>Admin Management</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Add Admin
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Super Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins
              .slice()
              .reverse()
              .map((admin) => (
                <TableRow key={admin.adminId}>
                  <TableCell>{admin.firstName}</TableCell>
                  <TableCell>{admin.lastName}</TableCell>
                  <TableCell>{admin.phoneNumber}</TableCell>
                  <TableCell>{admin.superAdmin ? "Yes" : "No"}</TableCell>{" "}
                  <TableCell>
                    {!admin.superAdmin ? (
                      <div>
                        {Object.entries(admin.rights).map(([right, value]) => (
                          <div
                            key={right}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span>{formatRightText(right)}</span>
                            <Switch
                              checked={value}
                              onChange={() =>
                                admin._id &&
                                handleToggleRights(
                                  admin._id, // Ensure admin._id is a valid string
                                  right as keyof Admin["rights"],
                                  value
                                )
                              }
                              color="primary"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span>N/A</span>
                    )}
                  </TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setAdminsDelete([admin]); // Wrap admin in an array
                      setDeleteModalOpen(true);
                    }} // Open confirmation modal
                  >
                    Delete Selected
                  </Button>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to add an admin */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ ...modalStyle }}>
          <h2>Add Admin</h2>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              margin="normal"
            />
            <Button onClick={togglePasswordVisibility}>
              {showPassword ? "Hide Password" : "Show Password"}
            </Button>

            <p style={{ marginTop: 12, marginBottom: 12, color: "red" }}>
              {adminErr}
            </p>
            <div>
              <Button type="submit" variant="contained" color="primary">
                Add Admin
              </Button>
              <Button
                onClick={() => setOpenModal(false)}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box sx={{ ...modalStyle, padding: "20px", width: "300px" }}>
          <h3>Are you sure you want to delete the selected admins?</h3>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteSelectedAdmins}
          >
            Yes, Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default AdminTable;
