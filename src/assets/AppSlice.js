import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

export const getUsers = createAsyncThunk("getUsers", async () => {
  try {
    const res = await api.get("users/");
    const data = res.data;
    return data;
  } catch (err) {
    return err;
  }
});

const AppSlice = createSlice({
  name: "App",
  initialState: {
    notice: "",
    hasNotice: false,
    authCode: "",
    users: [],
  },
  reducers: {
    hideMsg: state => {
      return { ...state, hasNotice: false };
    },
    setMsg: (state, { payload }) => {
      return { ...state, notice: payload, hasNotice: true };
    },
    clearMsg: state => {
      return { ...state, notice: "", hasNotice: false };
    },
    setAuthCode: (state, { payload }) => {
      return { ...state, authCode: payload };
    },
  },
  extraReducers: build => {
    build.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload.message === "Network Error") {
        localStorage.clear();
        return { ...state };
      } else {
        return { ...state, users: action.payload };
      }
    });
  },
});

export const { hideMsg, setMsg, clearMsg, setAuthCode } = AppSlice.actions;

export default AppSlice.reducer;
