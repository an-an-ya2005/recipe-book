import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice.js"; // ✅ import your reducer

const store = configureStore({
  reducer: {
    user: userReducer, // ✅ Add reducer key
  },
});

export default store;
