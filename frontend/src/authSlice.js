import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient.js";

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/user/register', userData);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue}) => {
        try {
            const response = await axiosClient.post('/user/login', credentials);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/check',
    async(_, { rejectWithValue}) => {
        try {
            const { data } = await axiosClient.get('/user/check');
            return data.user;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            await axiosClient.post('/logout');
            return null;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        // You can add any synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            // Register User Case
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = !!action.payload;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || action.payload?.message || "Registration failed";
                state.isAuthenticated = false;
                state.user = null;
            })
            // Login User Cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false; // Changed from true to false
                state.isAuthenticated = !!action.payload;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || action.payload?.message || "Login failed";
                state.isAuthenticated = false;
                state.user = null;
            })
            // Check Auth Cases
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = !!action.payload;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || action.payload?.message || "Authentication check failed";
                state.isAuthenticated = false;
                state.user = null;
            })
            // Logout User Cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || action.payload?.message || "Logout failed";
                // Note: Even if logout fails, we might still want to clear auth state
                state.isAuthenticated = false;
                state.user = null;
            });
    }
});

export default authSlice.reducer;