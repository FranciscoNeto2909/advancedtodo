import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
  name: "App",
  initialState: {
    notice: "",
    hasNotice: false,
    authCode: "",
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
    setAuthCode: (state, { payload }) => {
      return { ...state, authCode: payload };
    },
  },
});

export const { hideMsg, setMsg, clearMsg, setAuthCode } = AppSlice.actions;

export default AppSlice.reducer;
