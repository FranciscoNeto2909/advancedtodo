import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice.js";
import UserSlice from "./UserSlice.js";
import TasksSlice from "src\assets\TasksSlice.js";

export const store = configureStore({
  reducer: {
    App: AppSlice,
    User: UserSlice,
    Tasks: TasksSlice,
  },
});
