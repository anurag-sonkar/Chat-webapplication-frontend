import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';  // Import toast here
import chatService from "./chatService";

const initialState = {
  chats: [],
  selectedChat : null , 
  isLoading: false,
  successMessage: "",
  errorMessage: ""
};

export const getAllChats = createAsyncThunk(
  "chat/getAllChats",
  async (_, thunkAPI) => {
    try {
      const response = await chatService.getAllChats();
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);


const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setFriendChat: (state, action) => {
      console.log(action.payload)
      const selectedUser = state.chats.find((chat) => chat.members?.[0]?._id === action.payload);
      state.selectedChat = selectedUser;

      
    },
    resetSelectedChat : (state,action)=>{
      state.selectedChat = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, (state) => {
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
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload || null;
        state.successMessage = action.payload?.message || "chats fetched";
        state.errorMessage = "";

        // Dismiss the loading toast and show success message
        // toast.dismiss("loading-toast");
        // toast.success(state.successMessage, {
        //   position: "top-right",
        //   autoClose: 4000,
        //   theme: "dark"
        // });
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.isLoading = false;
        // state.user = null;
        state.successMessage = "";
        state.errorMessage = action.payload || "Registration failed";

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

export const { setFriendChat, resetSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;