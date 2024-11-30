import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../BaseUrl';

interface AuthState {
    admin: {
        id?: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        superAdmin?: boolean;
    } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    otpSent: boolean;
}

const initialState: AuthState = {
    admin: null,
    token: null,
    loading: false,
    error: null,
    otpSent: false,
};



// Async Thunks
export const createAccount = createAsyncThunk(
    'auth/createAccount',
    async (data: { firstName: string; lastName: string; phoneNumber: string; password: string; superAdmin?: boolean }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/create-account`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error creating account.');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (data: { phoneNumber: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/login`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error logging in.');
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data: { phoneNumber: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/forgot-password`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error sending OTP.');
        }
    }
);

export const validateOtp = createAsyncThunk(
    'auth/validateOtp',
    async (data: { phoneNumber: string; otp: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/admin/validate-otp`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Invalid OTP.');
        }
    }
);

export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async (data: { phoneNumber: string; newPassword: string }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/admin/update-password`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error updating password.');
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.admin = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAccount.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                const { id, firstName, lastName, phoneNumber, superAdmin } = action.payload;
                state.admin = { id, firstName, lastName, phoneNumber, superAdmin };
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(validateOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validateOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(validateOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;