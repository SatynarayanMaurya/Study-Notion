import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./Slices/loginSlice";
import signupSlice from "./Slices/signupSlice";
import userSlice from "./Slices/userSlice";



export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    signup:signupSlice,
    user:userSlice
  },
})