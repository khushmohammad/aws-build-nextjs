import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserDetailsByUserId,
  getUserInfoByUserId,
  updateProfileAndCoverPic,
  updateUserData,
} from "../../services/user.service";

import {
  getAllPhotos,
  getUserById,
  getUserList,
} from "../../services/profile.service";

const initialState = {
  data: null,
  allUser: null,
  userInfo: null,
  status: "loading",
  userProfileDetail: null,
  photos: [],
};

const ProfileSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.data = action?.payload?.data?.body || [];
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
        state.allUser = [];
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allUser = action.payload;
        state.error = "";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = "";
        state.allUser = [];
      })
      .addCase(getUserByUserId.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(getUserInfoById.fulfilled, (state, action) => {
        state.userProfileDetail = action.payload;
      })
      .addCase(allPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
      });
  },
});

export const getUserDetails = createAsyncThunk("user/userdetails", async () => {
  const data = await getUserInfoByUserId();
  return data;
});

export const updateUserInfo = createAsyncThunk(
  "user/updateUser",
  async (data) => {
    await updateUserData(data);
  }
);

export const getAllUsers = createAsyncThunk("user/allUser", async (params) => {
  const res = await getUserList(params.page, params.limit);
  return res;
});

export const getUserByUserId = createAsyncThunk("user/userInfo", async (id) => {
  const res = await getUserById(id);
  return res;
});

export const getUserInfoById = createAsyncThunk(
  "user/userById",
  async (data) => {
    const res = await getUserDetailsByUserId(data);
    return res;
  }
);

export const allPhotos = createAsyncThunk("/profile/gallery", async () => {
  const res = await getAllPhotos();
  return res;
});

export default ProfileSlice.reducer;
