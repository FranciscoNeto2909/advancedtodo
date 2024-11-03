import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    name: "User",
    conected: false,
    email: "user@gmail.com",
    senha: "12345",
  },
  reducers: {
    getuser: (state) => {
      return { ...state };
    },
  },
});

export default UserSlice.reducer;
