import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFeeds, getAllPostsByUserId, getFeeds, getPostsByTokenUserId, getSavePostListApi } from "../../services/posts.service";

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
        state.allFeeds.postList = action.payload.postWithUserDetails;
        state.allFeeds.postcount = action.payload.PostCount;
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

    const data = params && await getFeeds(params)
    return data;
  }
);

export default AllFeedsSlice.reducer;
