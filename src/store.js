import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "./components/ProgressSteps/switchSlice.js";

export const store = configureStore({
  reducer: { users: usersReducers },
});
export default store;