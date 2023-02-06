import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPost,
  editPostByPostId,
  getAllPostPhoto,
  updatePost,
} from "../../services/posts.service";

const initialState = {
  postDetail: null,
  status: null,
  photos: [],
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.postDetail = action.payload;
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(allPostPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
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

export const createPosts = createAsyncThunk("post/createpost", async (data) => {
  const res = await createPost(data);
  return res;
});

export const updatePostDetails = createAsyncThunk(
  "post/updatepost",
  async (data) => {
    await updatePost(data);
  }
);

export const allPostPhotos = createAsyncThunk("post/gallery", async () => {
  const data = await getAllPostPhoto();
  return data;
});

export default PostSlice.reducer;
