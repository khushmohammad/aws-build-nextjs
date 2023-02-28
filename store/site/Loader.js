import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  userName: "",
};

const siteLoader = createSlice({
  name: "loader",
  initialState,
  reducers: {
    loaderStatus: (state, action) => {
      state.loader = action.payload;
      //console.log(action.payload, "dfdddf")
    },
    getUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { loaderStatus, getUserName } = siteLoader.actions;

export default siteLoader.reducer;
