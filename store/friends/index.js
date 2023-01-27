import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFriendList } from "../../services/friends.service";

const initialState = {
  friendList: null,
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllFriendList.fulfilled, (state, action) => {
      state.friendList = action.payload;
    });
  },
});

export const getAllFriendList = createAsyncThunk(
  "friends/allFriend",
  async () => {
    const data = await getFriendList();
    return data;
  }
);

export default friendSlice.reducer;
