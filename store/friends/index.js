import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  friendsBirthdayList,
  getFriendList,
  getPendingRequestFriendListApi,
} from "../../services/friends.service";

const initialState = {
  friendList: null,
  birthdays: null,
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllFriendList.fulfilled, (state, action) => {
        state.friendList = action.payload;
      })
      .addCase(getAllBirthdays.fulfilled, (state, action) => {
        state.birthdays = action.payload;
      })
      .addCase(getPendingRequestFriendList.fulfilled, (state, action) => {

        state.PendingRequest = action.payload;
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

export const getAllBirthdays = createAsyncThunk(
  "friends/birthday",
  async () => {
    const data = await friendsBirthdayList();
    return data;
  }
);

export const getPendingRequestFriendList = createAsyncThunk(
  "friends/pendingRequest",
  async () => {
    const data = await getPendingRequestFriendListApi();
    console.log(data);
    return data;
  }
);

export default friendSlice.reducer;
