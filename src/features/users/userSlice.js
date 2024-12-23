import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'; 
import userService from "./userService";

const initialState = {
  users: [],
  searchedSelectedUser : null,
  onlineUsers : [],
  isLoading: false,
  successMessage: "",
  errorMessage: ""
};

export const search = createAsyncThunk(
  "user/search",
  async (data, thunkAPI) => {
    try {
      const response = await userService.search(data);
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  "user/sendrequest",
  async (data, thunkAPI) => {
    try {
      const response = await userService.sendFriendRequest(data);
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "user/acceptFriendRequest",
  async (requestId, thunkAPI) => {
    try {
      const response = await userService.acceptFriendRequest(requestId);
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {

      const selectedUser = state.users.find((user) => user._id === action.payload);
      state.searchedSelectedUser = selectedUser;

    },
    resetSelectedUser : (state , action)=>{
      state.searchedSelectedUser = null
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
        toast.loading("searching...", {
          id: "loading-toast",  // Set a specific ID to control this toast
          position: "top-right",
          autoClose: false,
          theme: "dark"
        });
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload?.response || [];
        state.successMessage = action.payload?.message || "Search successfully";
        state.errorMessage = "";

        // Dismiss the loading toast and show success message
        toast.dismiss("loading-toast");
        toast.success(state.successMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
      .addCase(search.rejected, (state, action) => {
        state.isLoading = false;
        state.users = [];
        state.successMessage = "";
        state.errorMessage = action.payload || "search failed";

        // Dismiss the loading toast and show error message
        toast.dismiss("loading-toast");
        toast.error(state.errorMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
      .addCase(sendFriendRequest.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
        toast.loading("sending request...", {
          id: "loading-toast",  // Set a specific ID to control this toast
          position: "top-right",
          autoClose: false,
          theme: "dark"
        });
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.users = action.payload?.response || [];
        state.successMessage = action.payload?.message || "Search successfully";
        state.errorMessage = "";

        // Dismiss the loading toast and show success message
        toast.dismiss("loading-toast");
        toast.success(state.successMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.isLoading = false;
        // state.users = [];
        state.successMessage = "";
        state.errorMessage = action.payload || "search failed";

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

export const { setSelectedUser, setOnlineUsers, resetSelectedUser } = userSlice.actions;
export default userSlice.reducer;
