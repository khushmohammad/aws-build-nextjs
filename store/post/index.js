import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editPostByPostId, updatePost } from "../../services/posts.service";

const initialState = {
  postDetail: "",
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPostDetails.fulfilled, (state, action) => {
      state.postDetail = action.payload;
    });
  },
});

export const getPostDetails = createAsyncThunk(
  "post/postDetails",
  async (postid) => {
    const data = await editPostByPostId(postid);
    return data;
  }
);

export const updatePostDetails = createAsyncThunk(
  "post/updatepost",
  async (data) => {
    await updatePost(data);
  }
);

export default PostSlice.reducer;
