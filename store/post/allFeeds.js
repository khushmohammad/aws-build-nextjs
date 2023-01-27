import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFeeds, getAllPostsByUserId, getPostsByTokenUserId } from "../../services/posts.service";

const initialState = {
  allFeeds: "",
  status: "loading",
};

const AllFeedsSlice = createSlice({
  name: "post",
  initialState,
  activePage: "",
  allFeeds: [],
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedsList.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
        state.allFeeds = [];
      })
      .addCase(getAllFeedsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allFeeds = action.payload;
        state.error = "";
      })
      .addCase(getAllFeedsList.rejected, (state, action) => {
        state.status = "failed";
        //console.log(action,"action");
        state.error = action.error.message;
        state.allFeeds = [];
      });
  },
});

export const getAllFeedsList = createAsyncThunk(
  "post/getAllFeeds",
  async (params) => {
    //console.log(params);
    const data =
      params.activePage == "home"
        ? await getAllFeeds(params.page, params.limit)
        : params.activePage == "myProfile"
          ? await getPostsByTokenUserId(params.page, params.limit)
          : params.activePage == "userProfile"
            ? await getAllPostsByUserId(params.page, params.limit, params.uerId)
            : await getAllFeeds(params.page, params.limit)
    return data;
  }
);

export default AllFeedsSlice.reducer;
