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
import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from "./Pages/Dashboard/Settings";
import Layout from "./Pages/Dashboard/Layout";
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

import store from "./Redux/Store";
import { UserProvider } from "./Context/UserContext";
import BecomeADriver from "./Redux/BecomeDriver/BecomeADriver";
import Index from "./LandingPage/Index";
import TermsAndConditions from "./LandingPage/Terms/TermsAndConditions";
import Footer from "./LandingPage/footer/Footer";
import PrivacyPolicy from "./LandingPage/Terms/PrivacyPolicy";
import Navbar from "./LandingPage/NewNav/NewNav";

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

// Utility function to check authentication
const isAuthenticated = Boolean(localStorage.getItem("accessToken"));

// PrivateRoute Component
const PrivateRoute = ({ children }: any) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              {/* Public Routes  npm cache clean --force */}
              <Route path="/" element={<Index />} />
              <Route
                path="/terms"
                element={
                  <>
                    {" "}
                    <Navbar />
                    <TermsAndConditions />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/privacy"
                element={
                  <>
                    <Navbar />
                    <PrivacyPolicy />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/admin"
                element={
                  isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
                }
              />
              <Route path="/become-driver" element={<BecomeADriver />} />

              <Route
                path="/forgot-password"
                element={
                  !isAuthenticated ? (
                    <ForgotPassword />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />
              <Route
                path="/otp"
                element={
                  !isAuthenticated ? <OTPPage /> : <Navigate to="/dashboard" />
                }
              />
              <Route
                path="/reset-password"
                element={
                  !isAuthenticated ? (
                    <ResetPassword />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />
              <Route
                path="/success"
                element={
                  !isAuthenticated ? (
                    <SuccessPage />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
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
