import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'; 
import notificationService from "./notificationService";

const initialState = {
  notifications: [],
  isLoading: false,
  successMessage: "",
  // errorMessage: ""
};

export const getAllNotifications = createAsyncThunk(
  "notification/getAllNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await notificationService.getAllNotifications();
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);


const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification : (state , action)=>{
      const {message , response} = action.payload
      state.notifications.push(response)
      state.successMessage = message
      toast.success(state.successMessage, {
        position: "top-center",
        autoClose: 8000,
        theme: "dark"
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.isLoading = true;
        // state.successMessage = "";
        // state.errorMessage = "";
        // toast.loading("getAllNotificationsing...", {
        //   id: "loading-toast",  // Set a specific ID to control this toast
        //   position: "top-right",
        //   autoClose: false,
        //   theme: "dark"
        // });
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload?.response || [];
        state.successMessage = action.payload?.message || "new notification";
        // state.errorMessage = "";

        // Dismiss the loading toast and show success message
        // toast.dismiss("loading-toast");
        toast.success(state.successMessage, {
          position: "top-right",
          autoClose: 8000,
          theme: "dark"
        });
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.isLoading = false;
        // state.notifications = [];
        // state.successMessage = "";
        // state.errorMessage = action.payload || "search failed";

        // Dismiss the loading toast and show error message
        // toast.dismiss("loading-toast");
        // toast.error(state.errorMessage, {
        //   position: "top-right",
        //   autoClose: 4000,
        //   theme: "dark"
        // });
      })
      
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
