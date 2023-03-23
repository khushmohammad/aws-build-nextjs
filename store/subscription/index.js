import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllSubscriptionPlansService } from "../../services/subscription.service";

const initialState = {
  plans: null,
};

const SubscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPlans.fulfilled, (state, action) => {
      state.plans = action.payload;
    });
  },
});

export const getAllPlans = createAsyncThunk("subscription/plans", async () => {
  const data = await getAllSubscriptionPlansService();
  return data;
});

export default SubscriptionSlice.reducer;
