import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../BaseUrl';


// Helper function to get accessToken from localStorage
const getAccessToken = () => localStorage.getItem("accessToken");


export type User = {
  _id?: string;
  email: string;
  profile_img_url: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  totalEarnings: number;
  totalWithdrawals: number;
  totalRefunds: number;
  totalBalance: number;
  is_driver_blocked: boolean;
  facial_verified: boolean;
  is_verified: boolean;
  blocked?: boolean;
  is_driver?: string
};


// Define the expected type for the payload
interface UpdateWithdrawalPayload {
  _id: string;
  status: "accepted" | "rejected";
  withdrawalID?: any;
}

// Type definitions
interface UpdateUserStatusParams {
  userIds: string[];
  deleteFlag: boolean;
  blockFlag: boolean;
  withdrawalID?: any;
}

interface DeleteItemsParams {
  ids: string[];
  itemType: 'deliverparcels' | 'sendparcels' | 'drivers' | 'passengerrequests' | 'withdrawals' | 'admins';
}


// Type definitions for parameters
interface CreateAdminParams {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

export interface DeleteAdminParams {
  adminId: string;
}


// Define the type for the parameters used in the async functions
interface PostParams {
  text: string;
  userId: string;
  first_name?: string;
  last_name?: string;
  admin?: boolean;
}

interface DeletePostParams {
  postId: string;
}

interface DashboardState {
  dashboardSummary: any | null; // Adjust type accordingly if you have a specific structure
  parcels: any[]; // Adjust type based on the structure of the parcels data
  rides: any[]; // Adjust type based on the structure of the rides data
  //posts: any[]; // Adjust type based on the structure of the posts data
  withdrawalRequests: any[]; // Adjust type based on the structure of the withdrawal requests data
  passengerRequests: any[]; // Adjust type based on the structure of the passenger requests data
  sendParcels: any[]; // Adjust type based on the structure of the send parcels data
  admins: User[]; // Use the User type here for admins
  users: User[]; // Use the User type here for users
  loading: boolean;
  error: string | null;
  posts: PostParams[],
  deletePosts: DeletePostParams[],
  deleteResults: Array<{ itemType: string; deletedCount: number }>;


}
// Initial state for the dashboard slice
const initialState: DashboardState = {
  dashboardSummary: null,
  parcels: [],
  rides: [],
  posts: [],
  withdrawalRequests: [],
  passengerRequests: [],
  sendParcels: [],
  admins: [],
  users: [],
  loading: false,
  error: null,
  deleteResults: [],
  deletePosts: [],
};

//


// Async thunks for each API endpoint
export const fetchDashboardSummary = createAsyncThunk(
  "data/fetchDashboardSummary",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/dashboard-summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Dashboard Summary Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Dashboard Summary Error:", error);
      return error;
    }
  }
);

export const fetchDeliverParcels = createAsyncThunk(
  "data/fetchDeliverParcels",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/deliver-parcels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Deliver Parcels Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Deliver Parcels Error:", error);
      return error;
    }
  }
);

export const fetchOfferRide = createAsyncThunk(
  "data/fetchOfferRide",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/offer-ride`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Offer Ride Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Offer Ride Error:", error);
      return error;
    }
  }
);

export const fetchPosts = createAsyncThunk(
  "data/fetchPosts",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Posts Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Posts Error:", error);
      return error;
    }
  }
);

export const fetchWithdrawalRequests = createAsyncThunk(
  "data/fetchWithdrawalRequests",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/withdrawal-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Withdrawal Requests Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Withdrawal Requests Error:", error);
      return error;
    }
  }
);

export const fetchPassengerRequests = createAsyncThunk(
  "data/fetchPassengerRequests",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/passenger-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Passenger Requests Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Passenger Requests Error:", error);
      return error;
    }
  }
);

export const fetchSendParcels = createAsyncThunk(
  "data/fetchSendParcels",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/send-parcels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Send Parcels Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Send Parcels Error:", error);
      return error;
    }
  }
);

export const fetchEarnings = createAsyncThunk(
  "data/fetchEarnings",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/withdrawals-accepted`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Send Parcels Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Send Parcels Error:", error);
      return error;
    }
  }
);
export const fetchref = createAsyncThunk(
  "data/fetchref",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/withdrawals-ref`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Send Parcels Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Send Parcels Error:", error);
      return error;
    }
  }
);

export const fetchAdmins = createAsyncThunk(
  "data/fetchAdmins",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Admins Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Admins Error:", error);
      return error;
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "data/fetchUsers",
  async () => {
    try {
      const token = getAccessToken();
      const response = await axios.get(`${API_BASE_URL}/dashboard/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Users Response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Users Error:", error);
      return error;
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'data/updateUserStatus',
  async ({ userIds, deleteFlag, blockFlag }: UpdateUserStatusParams, { rejectWithValue }) => {
    try {

      const response = await axios.post(`${API_BASE_URL}/dashboard/users/update-status`, {
        userIds,
        deleteFlag,
        blockFlag,
      });
      return response.data.data; // Return updated users
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Thunks for deleting items (DeliverParcel, SendParcel, etc.)
export const deleteItems = createAsyncThunk(
  'data/deleteItems',
  async ({ ids, itemType }: DeleteItemsParams, { rejectWithValue }) => {
    try {
      let endpoint = '';
      switch (itemType) {
        case 'deliverparcels':
          endpoint = `${API_BASE_URL}/dashboard/deliverparcels/delete`;
          break;
        case 'sendparcels':
          endpoint = `${API_BASE_URL}/dashboard/sendparcels/delete`;
          break;
        case 'drivers':
          endpoint = `${API_BASE_URL}/dashboard/drivers/delete`;
          break;
        case 'passengerrequests':
          endpoint = `${API_BASE_URL}/dashboard/passengerrequests/delete`;
          break;
        case 'withdrawals':
          endpoint = `${API_BASE_URL}/dashboard/withdrawals/accept-reject`;
          break;
        case 'admins':
          endpoint = `${API_BASE_URL}/dashboard/admins`;
          break;
        default:
          throw new Error('Invalid item type.');
      }

      const response = await axios.post(endpoint, { ids });

      // Return an object that includes itemType and deletedCount
      return {
        success: response.data.success,
        itemType,
        deletedCount: response.data.success ? ids.length : 0
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


// Create post
export const createPost = createAsyncThunk(
  'data/createPost',
  async (postParams: PostParams, { rejectWithValue }) => {
    try {
      const { text, userId, first_name, last_name } = postParams;

      const response = await axios.post(`${API_BASE_URL}/dashboard/posts`, {
        text,
        userId,
        first_name,
        last_name,
        admin: true,
      });
      console.log('postsr', response.data)
      return response.data; // Return created post data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create post');
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  'data/deletePost',
  async (deleteParams: DeletePostParams, { rejectWithValue }) => {
    try {
      const { postId } = deleteParams;

      const response = await axios.delete(`${API_BASE_URL}/dashboard/posts/${postId}`);

      return response.data; // Return deleted post data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete post');
    }
  }
);



// Create Admin
export const createAdmin = createAsyncThunk(
  'data/createAdmin',
  async (adminParams: CreateAdminParams, { rejectWithValue }) => {
    try {
      const { firstName, lastName, phoneNumber, password } = adminParams;

      const response = await axios.post(`${API_BASE_URL}/admin/create`, {
        firstName,
        lastName,
        phoneNumber,
        password,
      });

      return response.data; // Return the created admin data
    } catch (error: any) {
      // Enhanced error handling with fallback message
      const errorMessage = error.response?.data?.message || 'Failed to create admin';
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete Admin
export const deleteAdmin = createAsyncThunk(
  'data/deleteAdmin',
  async (deleteParams: DeleteAdminParams, { rejectWithValue }) => {
    try {
      const { adminId } = deleteParams;
      console.log(adminId, 'adminId')
      const response = await axios.delete(`${API_BASE_URL}/dashboard/delete-admin/${adminId}`);

      return response.data; // Return the result of the deleted admin action
    } catch (error: any) {
      // Enhanced error handling with fallback message
      const errorMessage = error.response?.data?.message || 'Failed to delete admin';
      return rejectWithValue(errorMessage);
    }
  }
);


export const updateWithdrawal = createAsyncThunk(
  "data/updateWithdrawal",
  async (payload: UpdateWithdrawalPayload, { rejectWithValue }) => {
    try {
      // Get the token for authorization
      const token = getAccessToken();

      // Make the PUT request to update the withdrawal
      const response = await axios.put(
        `${API_BASE_URL}/dashboard/update-withdrawal/`, // Send the withdrawal ID in the URL
        payload, // Send the status as the body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log the response for debugging (can be removed in production)
      console.log("Update Withdrawal Response:", response.data);

      // Return the response data
      return response.data;
    } catch (error: any) {
      // Log the error for debugging (can be removed in production)
      console.error("Update Withdrawal Error:", error);

      // Return the error using rejectWithValue to capture and handle in the reducers
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const fetchBecomeDrivers = createAsyncThunk(
  "data/fetchBecomeDrivers",
  async () => {
    try {
      // Get the token for authorization
      const token = getAccessToken();

      // Make the PUT request to update the withdrawal
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/drivers/applications`, // Send the withdrawal ID in the URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log the response for debugging (can be removed in production)
      console.log("Update Withdrawal Response:", response.data);

      // Return the response data
      return response.data;
    } catch (error: any) {
      // Log the error for debugging (can be removed in production)
      console.error("Update Withdrawal Error:", error);

      // Return the error using rejectWithValue to capture and handle in the reducers
      return error
    }
  }
);

export const updateRideStatus = createAsyncThunk(
  "data/updateRideStatus",
  async ({ rideId, status }: { rideId: string; status: string }, { rejectWithValue }) => {
    try {
      const token = getAccessToken(); // Get the token for authorization

      // Make the PUT request to update the driver application status
      const response = await axios.put(
        `${API_BASE_URL}/dashboard/drivers/applications/${rideId}`, // Assuming rideId is the userId here
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Return the response data
      return response.data;
    } catch (error: any) {
      console.error("Error updating ride status:", error);
      return rejectWithValue(error.response?.data || error.message); // Return error for handling in the reducers
    }
  }
);

export const updateAdminRights = createAsyncThunk(
  "data/updateAdminRights",
  async (
    { adminId, rights }: { adminId: string; rights: { [key: string]: boolean } },
    { rejectWithValue }
  ) => {
    try {
      const token = getAccessToken();

      // Make the PUT request
      const response = await axios.put(
        `${API_BASE_URL}/dashboard/update-rights/admin/${adminId}`,
        { rights },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Return the response data
      return response.data;
    } catch (error: any) {
      console.error("Error updating rights:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchAdminByID = createAsyncThunk(
  "data/fetchAdminByID",
  async (id: string) => {
    try {
      // Get the token for authorization
      const token = getAccessToken();

      console.log(id, 'ididididid')
      // Make the PUT request to update the withdrawal
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/fetch/admins/admin/${id}`, // Send the withdrawal ID in the URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log the response for debugging (can be removed in production)
      console.log("adminssss", response.data);

      // Return the response data
      return response.data;
    } catch (error: any) {
      // Log the error for debugging (can be removed in production)
      console.log("adminssss", error);

      // Return the error using rejectWithValue to capture and handle in the reducers
      return error
    }
  }
);


//updateAdminRights
// Slice to manage the data
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Dashboard Summary
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardSummary = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Parcels
      .addCase(fetchDeliverParcels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeliverParcels.fulfilled, (state, action) => {
        state.loading = false;
        state.parcels = action.payload.data;
      })
      .addCase(fetchDeliverParcels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Earnings
      .addCase(fetchEarnings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.parcels = action.payload.data;
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      // Earnings
      .addCase(fetchref.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchref.fulfilled, (state, action) => {
        state.loading = false;
        state.parcels = action.payload.data;
      })
      .addCase(fetchref.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Rides
      .addCase(fetchOfferRide.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOfferRide.fulfilled, (state, action) => {
        state.loading = false;
        state.rides = action.payload.data;
      })
      .addCase(fetchOfferRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Withdrawal Requests
      .addCase(fetchWithdrawalRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWithdrawalRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawalRequests = action.payload.data;
      })
      .addCase(fetchWithdrawalRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Passenger Requests
      .addCase(fetchPassengerRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPassengerRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.passengerRequests = action.payload.data;
      })
      .addCase(fetchPassengerRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Send Parcels
      .addCase(fetchSendParcels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSendParcels.fulfilled, (state, action) => {
        state.loading = false;
        state.sendParcels = action.payload.data;
      })
      .addCase(fetchSendParcels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Admins
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        // Ensure action.payload is an array before attempting to loop through it
        if (Array.isArray(action.payload)) {
          action.payload.forEach((updatedUser: User) => {
            const index = state.users.findIndex(
              (user) => user._id === updatedUser._id
            );
            if (index !== -1) {
              state.users[index] = updatedUser;
            }
          });
        } else {
          console.error("Action payload is not an array or is undefined.");
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle deleting items
      .addCase(deleteItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItems.fulfilled, (state, action) => {
        // Ensure action.payload has the right structure
        const { itemType, deletedCount, success } = action.payload;

        // Push the result to the state, ensuring the shape matches expectations
        state.deleteResults.push({ itemType, deletedCount });

        // Optionally log or handle success status
        if (success) {
          console.log(`Successfully deleted ${deletedCount} items of type ${itemType}`);
        }
      })
      .addCase(deleteItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Post Parcels
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      // delete Post Parcels
      .addCase(fetchAdminByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminByID.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
      })
      .addCase(fetchAdminByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // delete Post Parcels
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Post Parcels
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.data;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Post Parcels
      .addCase(updateAdminRights.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdminRights.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.data;
      })
      .addCase(updateAdminRights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // delete Post Parcels
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.data;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // delete Post Parcels
      .addCase(updateWithdrawal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWithdrawal.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        if (success) {
          // Handle success logic
          state.withdrawalRequests = data;
        }
      })
      .addCase(updateWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchBecomeDrivers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBecomeDrivers.fulfilled, (state, action) => {
        const { success, data } = action.payload;
        if (success) {
          // Handle success logic
          state.withdrawalRequests = data;
        }
      })
      .addCase(fetchBecomeDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      .addCase(updateRideStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRideStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Find the ride and update it with the new status
        const updatedRide = action.payload.application;
        state.rides = state.rides.map((ride) =>
          ride._id === updatedRide._id ? updatedRide : ride
        );
        state.error = null;
      })
      .addCase(updateRideStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

  },
});

export default dataSlice.reducer;