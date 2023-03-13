import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../../services/basic.service";

const initialState = {
    list: [],
};

const siteNotification = createSlice({
    name: "notification",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getNotification.fulfilled, (state, action) => {
                console.log(action, "sdfd")
                state.list = action.payload;
            })
    }

});

export const getNotification = createAsyncThunk(
    "notification",
    async (params) => {
        const data = await getNotifications(params)
        return data;
    }
);


// export const { notification } = siteNotification.actions

export default siteNotification.reducer;
