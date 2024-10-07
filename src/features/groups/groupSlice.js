import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';  // Import toast here
import groupService from "./groupService";

const initialState = {
  groups: [], // all groups whose admin is auth user
  selectedGroup : null ,  // select group (manage btn) to edit users/profile/delete
  isLoading: false,
  successMessage: "",
  errorMessage: ""
};

export const getAllMyGroups = createAsyncThunk(
  "group/getAllMyGroups",
  async (_, thunkAPI) => {
    try {
      const response = await groupService.getAllMyGroups();
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateGroupName = createAsyncThunk(
  "group/updateGroupName",
  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await groupService.updateGroupName(data);
      return response;
    } catch (error) {
      // Use `rejectWithValue` to return error message to reducer
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// export const updateAvatar = createAsyncThunk("auth/avatar", async (data, thunkAPI) => {
//   console.log(data)
//   try {
//     const response = await authService.updateAvatar(data);
//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(
//       error?.response?.data?.message || "Something went wrong"
//     );
//   }
// })

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroupChat: (state, action) => {
      console.log(action.payload)
      let selectedSpecificGroup = state.groups.find((group) => group._id === action.payload);
      state.selectedGroup = selectedSpecificGroup;
    },
    resetSelectedGroup: (state, action) => {
      state.selectedGroup = null
    },
    // filterChats : (state , action)=>{
    //   console.log(action.payload)
    //   const filteredChats = state.chats.filter(chat => {
    //     return chat.members.some(member =>
    //       member.name.toLowerCase().includes(action.payload.toLowerCase()) ||
    //       member.email.toLowerCase().includes(action.payload.toLowerCase())
    //     );
    //   });
    //   state.chats = filteredChats
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMyGroups.pending, (state) => {
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
      .addCase(getAllMyGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload || null;
        // state.successMessage = action.payload?.message || "chats fetched";
        state.errorMessage = "";

        // Dismiss the loading toast and show success message
        // toast.dismiss("loading-toast");
        // toast.success(state.successMessage, {
        //   position: "top-right",
        //   autoClose: 4000,
        //   theme: "dark"
        // });
      })
      .addCase(getAllMyGroups.rejected, (state, action) => {
        state.isLoading = false;
        // state.user = null;
        state.successMessage = "";
        state.errorMessage = action.payload || "fetch failed";

        // Dismiss the loading toast and show error message
        // toast.dismiss("loading-toast");
        // toast.error(state.errorMessage, {
        //   position: "top-right",
        //   autoClose: 4000,
        //   theme: "dark"
        // });
      })
      .addCase(updateGroupName.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
        toast.loading("Updating...", {
          id: "loading-toast",  // Set a specific ID to control this toast
          position: "top-right",
          autoClose: false,
          theme: "dark"
        });
      })
      .addCase(updateGroupName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = state.groups.map((ele)=>ele._id === action.payload._id ? action.payload : ele)
        state.successMessage = action.payload?.message || "Updated Successfully";
        state.errorMessage = "";

        // Dismiss the loading toast and show success message
        toast.dismiss("loading-toast");
        toast.success(state.successMessage, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark"
        });
      })
      .addCase(updateGroupName.rejected, (state, action) => {
        state.isLoading = false;
        // state.user = null;
        state.successMessage = "";
        state.errorMessage = action.payload || "Updation failed";

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

export const { setGroupChat, resetSelectedGroup } = groupSlice.actions;
export default groupSlice.reducer;
