import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { systemResource } from "../../services/system-resource.service";

const initialState = {
  socialMediaHandler: [],
};

const SystemResourceSlice = createSlice({
  name: "systemresource",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSystemResources.fulfilled, (state, action) => {
     
      state.socialMediaHandler = action.payload;
    });
  },
});

export const getSystemResources = createAsyncThunk(
  "systemresource/allSystemResource",
  async (resource) => {
    const data = await systemResource({ ...resource.action, ...resource.data });
    return data;
  }
);

export default SystemResourceSlice.reducer;
