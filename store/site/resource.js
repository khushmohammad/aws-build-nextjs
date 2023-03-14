import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceService } from "../../services/basic.service";

const initialState = {
  resourceCategory: [],
};

const ResourceSlice = createSlice({
  name: "Resource",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getResource.fulfilled, (state, action) => {
      console.log("action", action);
      state.resourceCategory = action.payload;
    });
  },
});

export const getResource = createAsyncThunk("Resource", async (resourceId) => {
  const data = await resourceService(resourceId);
  return data;
});

export default ResourceSlice.reducer;
