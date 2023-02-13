import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEvents, getEventByEventId } from "../../services/event.service";

const initialState = {
  allEvents: [],
  eventDetail: null,
};

const EventSlice = createSlice({
  name: "events",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.fulfilled, (state, action) => {
        state.allEvents = action.payload;
      })
      .addCase(getEventDetail.fulfilled, (state, action) => {
        state.eventDetail = action.payload;
      });
  },
});

export const getEvents = createAsyncThunk(
  "event/allEvents",
  async (eventType) => {
    const data = await getAllEvents(eventType);
    return data;
  }
);

export const getEventDetail = createAsyncThunk(
  "event/evetnDetail",
  async (eventid) => {
    const data = await getEventByEventId(eventid);
    return data;
  }
);

export default EventSlice.reducer;
