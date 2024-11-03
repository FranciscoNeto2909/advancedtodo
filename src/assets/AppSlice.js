import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "App",
  initialState: {
    notice: "",
    hasNotice: false,
  },
  reducers: {
    hideMsg: (state) => {
      return { ...state, hasNotice: false };
    },
    setMsg: (state, { payload }) => {
      return { ...state, notice: payload, hasNotice: true };
    },
    clearMsg: (state) => {
      return { ...state, notice: "", hasNotice: false };
    },
  },
});

export const { hideMsg, setMsg, clearMsg } = AppSlice.actions;

export default AppSlice.reducer;
