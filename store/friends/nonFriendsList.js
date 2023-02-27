import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNonFriendList } from "../../services/friends.service";

const initialState = {
  status: "loading",
  NonFriendList: [],
};

const NonFriendListSlice = createSlice({
  name: "nonFriendsList",
  initialState,
  activePage: "",
  NonFriendList: [],
  extraReducers: (builder) => {
    builder
      .addCase(getNonFriendsList.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getNonFriendsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload, "action.payload");
        state.NonFriendList = action.payload ? action.payload : [];
        state.error = "";
      })
      .addCase(getNonFriendsList.rejected, (state, action) => {
        state.status = "failed";
        //console.log(action,"action");
        state.error = action.error.message;
      });
  },
});

export const getNonFriendsList = createAsyncThunk(
  "Friends/nonFriendsList",
  async (params) => {
    console.log(params);
    const nonFriendsList = await getNonFriendList(params);

    return nonFriendsList;
  }
);

export default NonFriendListSlice.reducer;
