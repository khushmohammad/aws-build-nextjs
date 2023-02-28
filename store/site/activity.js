import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getActivityLogsApi } from "../../services/basic.services";

const initialState = {
    status: "loading",
};

const ActivityLogsSlice = createSlice({
    name: "Activity",
    initialState,
    activePage: "",
    FriendsRequests: [],
    extraReducers: (builder) => {
        builder
            .addCase(getActivityLogsList.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
                state.logsList = [];
            })
            .addCase(getActivityLogsList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.logsList = action.payload;
                state.error = "";
            })
            .addCase(getActivityLogsList.rejected, (state, action) => {
                state.status = "failed";

                state.error = action.error.message;
                state.logsList = [];
            });
    },
});

export const getActivityLogsList = createAsyncThunk(
    "Activity",
    async (params) => {
        const data = await getActivityLogsApi(params)

        return data

    }
);




export default ActivityLogsSlice.reducer;
