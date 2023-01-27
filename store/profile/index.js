import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserData,
  updateProfileAndCoverPic,
  updateUserData,
} from "../../services/user.service";

import { getUserById, getUserList } from "../../services/profile.service";

const initialState = {
  data: null,
  allUser: null,
  userInfo: null,
  status: "loading",
};

const ProfileSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.data = action.payload;
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
      .addCase(updateProfileAndCoverPicture.fulfilled, (state, action) => {
        if (imageType === "coverImage") {
          state.cover_picture = action.payload;
        } else {
          state.profile_picture = action.payload;
        }
      });
  },
});

export const getUserDetails = createAsyncThunk("user/userdetails", async () => {
  const data = await getUserData();
  return data;
});

export const updateProfileAndCoverPicture = createAsyncThunk(
  "user/profileAndCoverPic",
  async (imageType, image) => {
    const data = await updateProfileAndCoverPic(imageType, image);
    return data;
  }
);

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

export default ProfileSlice.reducer;
