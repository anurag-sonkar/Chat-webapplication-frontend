import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';  // Import toast here
import messageService from "./messageService";

const initialState = {
  messages: [],
  typingUser : null,
  isLoading: false,
  successMessage: "",
  errorMessage: ""
};

export const getAllMessages = createAsyncThunk(
  "message/getAllMessages",
  async (data, thunkAPI) => {
    try {
      const response = await messageService.getAllMessages(data);
      return response;
    } catch (error) {
      // Use rejectWithValue to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (data, thunkAPI) => {
    try {
      const response = await messageService.sendMessage(data);
      return response;
    } catch (error) {
      // Use rejectWithValue to return error message to reducer
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
    setNewMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setTypingUser : (state , action)=>{
      state.typingUser = action.payload

    },
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
      .addCase(sendMessage.pending, (state) => {
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
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push(action.payload.message) || null;
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
      .addCase(sendMessage.rejected, (state, action) => {
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

export const { setNewMessage, setTypingUser } = messageSlice.actions;
export default messageSlice.reducer;