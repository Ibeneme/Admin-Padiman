import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import LoginPage from "./Pages/Auth/LoginPage";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import OTPPage from "./Pages/Auth/OTPPage";
import ResetPassword from "./Pages/Auth/ResetPassword";
import SuccessPage from "./Pages/Auth/SuccessPage";
import store from "./Redux/Store";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from "./Pages/Dashboard/Settings";
import Layout from "./Pages/Dashboard/Layout";
import { UserProvider } from "./Context/UserContext";
import Users from "./Pages/Dashboard/Users";
import DeliverParcel from "./Pages/Dashboard/DeliverParcel";
import OfferRide from "./Pages/Dashboard/OfferRide";
import RidePassengers from "./Pages/Dashboard/RidePassengers";
import SendParcels from "./Pages/Dashboard/SendParcels";
import PostDisplay from "./Pages/Dashboard/Post";
import AdminTable from "./Pages/Dashboard/AdminTable";
import RequestWithdrawalTable from "./Pages/Dashboard/RequestWithdrawalTable";
import AdminEarnings from "./Pages/Dashboard/AdminEarnings";
import RefferralEarnings from "./Pages/Dashboard/ReferralEarnings";
import DriverRequests from "./Pages/Dashboard/DriverRequests";

const theme = createTheme({
  typography: {
    fontFamily: "'DM Sans', sans-serif",
  },

  palette: {
    primary: {
      main: "#8C08F0",
    },
  },
});

const App: React.FC = () => {
  // Check if there's an access token in localStorage
  const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

  return (
    <UserProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              {/* Conditional Route rendering */}
              <Route
                path="/"
                element={
                  isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
                }
              />

              {/* Protect routes that require authentication */}
              <Route
                path="/forgot-password"
                element={!isAuthenticated ? <ForgotPassword /> : <Dashboard />}
              />
              <Route
                path="/otp"
                element={!isAuthenticated ? <OTPPage /> : <Dashboard />}
              />
              <Route
                path="/reset-password"
                element={!isAuthenticated ? <ResetPassword /> : <Dashboard />}
              />
              <Route
                path="/success"
                element={!isAuthenticated ? <SuccessPage /> : <Dashboard />}
              />

              <Route
                element={isAuthenticated ? <Layout /> : <Navigate to="/" />}
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/deliver-parcel" element={<DeliverParcel />} />
                <Route path="/offer-ride" element={<OfferRide />} />
                <Route path="/join-ride" element={<RidePassengers />} />
                <Route path="/send-parcel" element={<SendParcels />} />
                <Route path="/posts" element={<PostDisplay />} />
                <Route path="/admins" element={<AdminTable />} />
                <Route
                  path="/request-withdrawals"
                  element={<RequestWithdrawalTable />}
                />
                <Route path="/ref-earnings" element={<RefferralEarnings />} />
                <Route path="/drivers-requests" element={<DriverRequests />} />
                <Route path="/admin-earnings" element={<AdminEarnings />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </UserProvider>
  );
};

export default App;
