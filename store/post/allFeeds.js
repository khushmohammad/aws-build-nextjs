import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFeeds, getSavePostListApi } from "../../services/posts.service";

const initialState = {
  allFeeds: { postList: [], postcount: 0 },
  status: "loading",
  error: "",
};

const AllFeedsSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedsList.pending, (state) => {
        state.status = "loading";
        state.allFeeds.postList = [];
      })
      .addCase(getAllFeedsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.allFeeds.postList = action.payload?.data?.body?.feeds;
        state.allFeeds.postcount =
          action.payload.data?.body?.postCount?.postCount;
      })
      .addCase(getAllFeedsList.rejected, (state, action) => {
        state.status = "failed";
        //console.log(action,"action");
        state.error = action.error.message;
      });
  },
});

export const getAllFeedsList = createAsyncThunk(
  "post/getAllFeeds",
  async (params) => {
    const data = await getFeeds(params);
    return data;
  }
);

export default AllFeedsSlice.reducer;
