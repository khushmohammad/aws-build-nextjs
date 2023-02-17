import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  discoverEventService,
  getAllEvents,
  getEventByEventId,
  inviteFriendOnEventService,
} from "../../services/event.service";

const initialState = {
  allEvents: [],
  eventDetail: null,
  eventInviteeList: null,
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
      })
      .addCase(discoverEvents.fulfilled, (state, action) => {
        state.allEvents = action.payload;
      })
      .addCase(inteveFriendOnEvent.fulfilled, (state, action) => {
        state.eventInviteeList = action.payload;
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

export const discoverEvents = createAsyncThunk("events/discover", async () => {
  const data = await discoverEventService();
  return data;
});

export const inteveFriendOnEvent = createAsyncThunk(
  "events/invitee",
  async ({ eventid, friendId, status }) => {
    const res = await inviteFriendOnEventService(eventid, friendId, status);
    return res;
  }
);

export default EventSlice.reducer;
