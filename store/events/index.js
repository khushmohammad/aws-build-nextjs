import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allEvents: [],
};

const EventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getAllEvents: (state, action) => {
      state.allEvents = [...state.allEvents, action.payload];
    },
  },
});

export const { getAllEvents } = EventSlice.actions;
export default EventSlice.reducer;
