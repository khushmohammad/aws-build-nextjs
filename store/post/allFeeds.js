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
        //console.log(action.payload.newarray, "action.payload.newarray");
        state.allFeeds = action.payload.newarray;
        state.postcount = action.payload.PostCount;
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
    //  console.log(params, "paramdds");
    const data =
      params.activePage == "home"
        ? await getAllFeeds(params.page, params.limit)
        : params.activePage == "myProfile"
          ? await getPostsByTokenUserId(params.page, params.limit)
          : params.activePage == "userProfile"
            ? await getAllPostsByUserId(params.page, params.limit, params.uerId, "userId")
            : params.activePage == "group"
              ? await getAllPostsByUserId(params.page, params.limit, params.groupId, "groupId") :
              await getAllFeeds(params.page, params.limit)
    return data;
  }
);

export default AllFeedsSlice.reducer;
