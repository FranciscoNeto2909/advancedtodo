import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "../slices/AppSlice.js";
import UserSlice from "../slices/UserSlice.js";
import TasksSlice from "../slices/TasksSlice.js";

export const store = configureStore({
  reducer: {
    App: AppSlice,
    User: UserSlice,
    Tasks: TasksSlice,
  },
});
