import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice"
import notificationReducer from "../features/notifications/notificationSlice";
import chatReducer from "../features/chats/chatSlice"
import messageReducer from "../features/messages/messageSlice"
import groupReducer from "../features/groups/groupSlice"
import previewReducer from "../features/previews/previewSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        notification : notificationReducer,
        chat: chatReducer,
        message : messageReducer,
        group : groupReducer,
        preview: previewReducer

    }

})  