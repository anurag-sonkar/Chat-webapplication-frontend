import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';  // Import toast here
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user-info")
  ? JSON.parse(localStorage.getItem("user-info"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  isLoading: false,
  successMessage: "",
  errorMessage: ""
};

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await authService.register(data);
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateAvatar = createAsyncThunk("auth/avatar" , async(data , thunkAPI)=>{
  try {
    const response = await authService.updateAvatar(data);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message || "Something went wrong"
    );
  }
})

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await authService.login(data);
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.successMessage = "",
      state.errorMessage = "";
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
        toast.loading("Creating Account...", {
          id: "loading-toast",  // Set a specific ID to control this toast
          position: "top-right",
          autoClose: false,
          theme: "dark"
        });
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.response || null;
        state.successMessage = action.payload?.message || "Registration successful";
        state.errorMessage = "";

        // Dismiss the loading toast and show success message
        toast.dismiss("loading-toast");
        toast.success(state.successMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        // state.user = null;
        state.successMessage = "";
        state.errorMessage = action.payload || "Registration failed";

        // Dismiss the loading toast and show error message
        toast.dismiss("loading-toast");
        toast.error(state.errorMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
        toast.loading("Uploading...", {
          id: "loading-toast",  // Set a specific ID to control this toast
          position: "top-right",
          autoClose: false,
          theme: "dark"
        });
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.response || null;
        state.successMessage = action.payload?.message || "Avatar uploaded";
        state.errorMessage = "";

        // Dismiss the loading toast and show success message
        toast.dismiss("loading-toast");
        toast.success(state.successMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.isLoading = false;
        // state.user = null;
        state.successMessage = "";
        state.errorMessage = action.payload || "Avatar upload failed";

        // Dismiss the loading toast and show error message
        toast.dismiss("loading-toast");
        toast.error(state.errorMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
        toast.loading("logging...", {
          id: "loading-toast",  // Set a specific ID to control this toast
          position: "top-right",
          autoClose: false,
          theme: "dark"
        });
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.response || null;
        state.successMessage = action.payload?.message || "Login successful";
        state.errorMessage = "";

        // Dismiss the loading toast and show success message
        toast.dismiss("loading-toast");
        toast.success(state.successMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        // state.user = null;
        state.successMessage = "";
        state.errorMessage = action.payload || "login failed";

        // Dismiss the loading toast and show error message
        toast.dismiss("loading-toast");
        toast.error(state.errorMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
    
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
