import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  friendsBirthdayList,
  getFriendList,
  getPendingRequestFriendListApi,
} from "../../services/friends.service";

const initialState = {
  friendList: { list: [], error: "", status: "loading" },
  birthdays: null,
  PendingRequest: { list: [], error: "", status: "loading" },
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getAllBirthdays.fulfilled, (state, action) => {
        state.birthdays = action.payload;
      })
      .addCase(getPendingRequestFriendList.pending, (state, action) => {
        state.PendingRequest.status = "loading";
      })
      .addCase(getPendingRequestFriendList.fulfilled, (state, action) => {
        state.PendingRequest.status = "succeeded";
        state.PendingRequest.list = action.payload?.data?.body;
      })
      .addCase(getPendingRequestFriendList.rejected, (state, action) => {
        state.PendingRequest.status = "failed";
        state.PendingRequest.error = action.error.message;
      })
      .addCase(getAllFriendList.pending, (state, action) => {
        state.friendList.status = "loading";
      })
      .addCase(getAllFriendList.fulfilled, (state, action) => {
        state.friendList.status = "succeeded";
        state.friendList.list = action.payload?.data?.body?.friendsList || [];
      })
      .addCase(getAllFriendList.rejected, (state, action) => {
        state.friendList.status = "failed";
        state.friendList.error = action.error.message;
      });
  },
});

export const getAllFriendList = createAsyncThunk(
  "friends/allFriendList",
  async (params) => {
    const data = await getFriendList(params);
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
  async (params) => {
    const data = await getPendingRequestFriendListApi(params);
    return data;
  }
);

export default friendSlice.reducer;
