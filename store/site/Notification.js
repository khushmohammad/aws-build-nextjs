import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [
        {
            user: "123",
            message: "message",
            isRead: "true",
        },
        {
            user: "123",
            message: "message",
            isRead: "",
        },
        {
            user: "123",
            message: "message",
            isRead: "",
        },
        {
            user: "123",
            message: "message",
            isRead: "",
        },
    ],
};

const siteNotification = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notification: (state, action) => {
            state.list = action.payload
            console.log(action, "dfdfdddff")
        },

    },
});

export const { notification } = siteNotification.actions

export default siteNotification.reducer;
