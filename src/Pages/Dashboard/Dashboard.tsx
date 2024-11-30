import { useState, useEffect } from "react";
import "./Dashboard.css"; // Import styles for the dashboard
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import { fetchDashboardSummary } from "../../Redux/Dashboard/Dashboard";
import { ShimmerLoader } from "./ShimmerLoader";

interface DashboardData {
  signupsByMonth: {
    _id: { month: number; year: number };
    signupCount: number;
  }[];
  totals: {
    totalWithdrawals: number;
    totalRefunds: number;
    totalBalance: number;
  };
  blockedDrivers: number;
  referredUsers: number;
  sendParcelStatusCounts: {
    placed: number;
    paid: number;
    startRide: number;
    refundRide: number;
    confirmRide: number;
    endRide: number;
  };
  joinRide: {
    placed: number;
    paid: number;
    startRide: number;
    refundRide: number;
    confirmRide: number;
    endRide: number;
  };
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null); // Holds the dashboard data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchChatDetails = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await dispatch(fetchDashboardSummary()).unwrap();
        setData(response);
      } catch (err) {
        setError("Cannot load data. An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="shimmer-container">
        <ShimmerLoader />
        <ShimmerLoader />
        <ShimmerLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const {
    signupsByMonth,
    totals,
    blockedDrivers,
    referredUsers,
    sendParcelStatusCounts,
    joinRide,
  } = data;

  const monthNames: { [key: number]: string } = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {/* Summary Section */}
      <div className="summary">
        <div className="summary-item">
          <h2>Total Withdrawals</h2>
          <div className="count">{formatCurrency(totals.totalWithdrawals)}</div>
        </div>
        <div className="summary-item">
          <h2>Total Refunds</h2>
          <div className="count">{formatCurrency(totals.totalRefunds)}</div>
        </div>
        <div className="summary-item">
          <h2>Total Money Held for Clients</h2>
          <div className="count">{formatCurrency(totals.totalBalance)}</div>
        </div>
        <div className="summary-item">
          <h2>Blocked Drivers</h2>
          <div className="count">{blockedDrivers}</div>
        </div>
        <div className="summary-item">
          <h2>Referred Users</h2>
          <div className="count">{referredUsers}</div>
        </div>
      </div>
      {/* Signups by Month Section */}
      <br />
      <div className="parcel-status">
        <h2>Monthly Signups</h2>
        <div className="parcel-status-grid">
          {signupsByMonth.map((item, index) => (
            <div key={index} className="status-card">
              <span className="status-title">{monthNames[item._id.month]}</span>
              <div className="status-count">{item.signupCount}</div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="parcel-status">
        <h2>Send Parcel Status</h2>
        <div className="parcel-status-grid">
          {Object.entries(sendParcelStatusCounts).map(([status, count]) => (
            <div key={status} className="status-card">
              <div className="status-title">{status}</div>
              <div className="status-count">{count}</div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="parcel-status">
        <h2>Join a Ride Status</h2>
        <div className="parcel-status-grid">
          {Object.entries(joinRide).map(([status, count]) => (
            <div key={status} className="status-card">
              <div className="status-title">{status}</div>
              <div className="status-count">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
