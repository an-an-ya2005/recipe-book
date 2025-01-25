import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./features/alertSlice.js"; // Ensure this is the default export
import userSlice from "./features/userSlice.js"; // Ensure this is the default export

const store = configureStore({
  reducer: {
    alerts: alertSlice.reducer, // Correct usage of the slice
    user: userSlice.reducer,    // Correct usage of the slice
  },
});

export default store;
