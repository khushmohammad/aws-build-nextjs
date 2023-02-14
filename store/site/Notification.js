import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../../services/basic.services";

const initialState = {
    list: [
        {
            user: "123",
            message: "Ankit added a new photo.",
            isRead: "true",
        }
    ],
};

const siteNotification = createSlice({
    name: "notification",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getNotification.fulfilled, (state, action) => {
                state.list = action.payload;
            })
    }

});

export const getNotification = createAsyncThunk(
    "notification",
    async () => {
        //  console.log(params, "paramdds");
        const data = await getNotifications()
        return data;
    }
);


// export const { notification } = siteNotification.actions

export default siteNotification.reducer;
