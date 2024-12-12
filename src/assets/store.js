import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice.js";
import UserSlice from "./userSlice.js";
import TasksSlice from "./tasksSlice.js"

export const store = configureStore({
  reducer: {
    App: AppSlice,
    User: UserSlice,
    Tasks:TasksSlice
  },
});
