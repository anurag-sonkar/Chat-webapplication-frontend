import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';  // Import toast here
import groupService from "./groupService";

const initialState = {
  groups: [],
  selectedGroup : null , 
  isLoading: false,
  successMessage: "",
  errorMessage: ""
};







const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
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
      
  },
});

// export const { } = groupSlice.actions;
export default groupSlice.reducer;
