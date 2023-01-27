import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGroupPosts,
  getAllGroups,
  getGroupByGroupId,
  getGroupPrivacy,
  inviteFriendOnGroup,
  getPostByPostId,
} from "../../services/groups.service";

const initialState = {
  allGroups: null,
  groupInfo: null,
  invitedFriend: null,
  groupPrivacy: null,
  groupFeeds: null,
  postDetails: null,
};

const GroupSlice = createSlice({
  name: "groups",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroupsList.fulfilled, (state, action) => {
        state.allGroups = action.payload;
      })
      .addCase(getGroupByID.fulfilled, (state, action) => {
        state.groupInfo = action.payload;
      })
      .addCase(inviteFriendsOnGroup.fulfilled, (state, action) => {
        state.invitedFriend = action.payload;
      })
      .addCase(getGroupPrivacyKeys.fulfilled, (state, action) => {
        state.groupPrivacy = action.payload;
      })
      .addCase(getGroupFeeds.fulfilled, (state, action) => {
        state.groupFeeds = action.payload;
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.postDetails = action.payload;
      });
  },
});

export const getAllGroupsList = createAsyncThunk(
  "groups/allGroups",
  async () => {
    const data = await getAllGroups();
    return data;
  }
);

export const inviteFriendsOnGroup = createAsyncThunk(
  "grouips/inviteFriend",
  async (memberId, groupId) => {
    console.log("gID:", groupId);
    const data = await inviteFriendOnGroup(memberId, groupId);
    return data;
  }
);

export const getGroupByID = createAsyncThunk(
  "groups/getGroupById",
  async (id) => {
    const data = await getGroupByGroupId(id);
    return data;
  }
);

export const getGroupPrivacyKeys = createAsyncThunk(
  "groups/getGroupPrivacy",
  async () => {
    const data = await getGroupPrivacy();
    return data;
  }
);

export const getGroupFeeds = createAsyncThunk(
  "groups/allGroupFeeds",
  async (groupId) => {
    const data = await getGroupPosts(groupId);
    return data;
  }
);

export const getPostDetails = createAsyncThunk(
  "groups/postDetails",
  async (groupId) => {
    const data = await getPostByPostId(groupId);
    return data;
  }
);

export default GroupSlice.reducer;
