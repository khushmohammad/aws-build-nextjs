import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGroupPosts,
  getAllGroups,
  getGroupByGroupId,
  getGroupPrivacy,
  inviteFriend,
  getPostByPostId,
  getInvitationList,
  invitationAcceptAndDelineService,
  groupJoinRequestList,
  groupJoinedList,
  groupMemberListService,
  groupPrivilegesService,
  inviteMemberListService,
} from "../../services/groups.service";

const initialState = {
  allGroups: null,
  groupInfo: null,
  groupMember: null,
  inviteMember: null,
  groupPrivacy: null,
  groupFeeds: null,
  postDetails: null,
  groupInvited: null,
  joinRequestList: [],
  joinedGroup: null,
  groupPrivilege: false,
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
      .addCase(getGroupPrivacyKeys.fulfilled, (state, action) => {
        state.groupPrivacy = action.payload;
      })
      .addCase(getGroupFeeds.fulfilled, (state, action) => {
        state.groupFeeds = action.payload;
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.postDetails = action.payload;
      })
      .addCase(groupInvitationList.fulfilled, (state, action) => {
        state.groupInvited = action.payload;
      })
      .addCase(groupJoinRequestLists.fulfilled, (state, action) => {
        state.joinRequestList = action.payload;
      })
      .addCase(allJoinedGroupList.fulfilled, (state, action) => {
        state.joinedGroup = action.payload;
      })
      .addCase(groupMemberList.fulfilled, (state, action) => {
        state.groupMember = action.payload;
      })
      .addCase(groupPrivileges.fulfilled, (state, action) => {
        state.groupPrivilege = action.payload;
      })
      .addCase(inviteMemberList.fulfilled, (state, action) => {
        state.inviteMember = action.payload;
      });
  },
});

export const getAllGroupsList = createAsyncThunk(
  "groups/allGroups",
  async (page) => {
    const data = await getAllGroups(page);
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

export const groupInvitationList = createAsyncThunk(
  "groups/invitationList",
  async () => {
    const data = await getInvitationList();
    return data;
  }
);

export const groupJoinRequestLists = createAsyncThunk(
  "groups/joinRequestList",
  async (groupId) => {
    const data = await groupJoinRequestList(groupId);
    return data;
  }
);

export const allJoinedGroupList = createAsyncThunk(
  "groups/joinedGroup",
  async () => {
    const data = await groupJoinedList();
    return data;
  }
);

export const groupMemberList = createAsyncThunk(
  "groups/memberList",
  async ({ limit, pageNumber, groupId }) => {
    const data = await groupMemberListService(limit, pageNumber, groupId);
    return data;
  }
);

export const groupPrivileges = createAsyncThunk(
  "groups/groupPrivileges",
  async (groupid) => {
    const data = await groupPrivilegesService(groupid);
    return data;
  }
);

export const inviteMemberList = createAsyncThunk(
  "groups/inviteMemberList",
  async ({ groupId, pageNumber, inviteKey }) => {
    const data = await inviteMemberListService(groupId, pageNumber, inviteKey);
    return data;
  }
);

export const { allJoinRequestSent } = GroupSlice.actions;
export default GroupSlice.reducer;
