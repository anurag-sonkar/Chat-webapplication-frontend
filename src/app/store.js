import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice"
import notificationReducer from "../features/notifications/notificationSlice";


export const store = configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        notification : notificationReducer,

    }

})  