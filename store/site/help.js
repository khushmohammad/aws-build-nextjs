import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { helpService } from "../../services/basic.service";

const initialState = {
  helpCategory: null,
};

const HelpSlice = createSlice({
  name: "Help",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getHelp.fulfilled, (state, action) => {
      state.helpCategory = action.payload;
    });
  },
});

export const getHelp = createAsyncThunk("help/getHelp", async (helpId) => {
  const data = await helpService(helpId);
  return data;
});

export default HelpSlice.reducer;
