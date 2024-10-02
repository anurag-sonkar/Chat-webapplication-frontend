import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';  // Import toast here
import messageService from "./messageService";

const initialState = {
  messages : [],
  isLoading: false,
  successMessage: "",
  errorMessage: ""
};

export const getAllMessages = createAsyncThunk(
  "message/getAllMessages",
  async (data, thunkAPI) => {
    try {
      console.log(data)
      const response = await messageService.getAllMessages(data);
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);


const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    //   state.successMessage = "",
    //   state.errorMessage = "";
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
        // toast.loading("Creating Account...", {
        //   id: "loading-toast",  // Set a specific ID to control this toast
        //   position: "top-right",
        //   autoClose: false,
        //   theme: "dark"
        // });
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload?.messages || null;
        // state.successMessage = action.payload?.message || "Registration successful";
        state.errorMessage = "";

        // Dismiss the loading toast and show success message
        // toast.dismiss("loading-toast");
        // toast.success(state.successMessage, {
        //   position: "top-right",
        //   autoClose: 4000,
        //   theme: "dark"
        // });
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.isLoading = false;
        // state.user = null;
        state.successMessage = "";
        state.errorMessage = action.payload || "Something went wrong";

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

// export const {  } = messageSlice.actions;
export default messageSlice.reducer;
