import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [
        {
            user: "123",
            message: "Ankit added a new photo.",
            isRead: "true",
        },
        {
            user: "456",
            message: "Ankit  shared your post.",
            isRead: "",
        },
        {
            user: "798",
            message: "sagar accepted your friend request.",
            isRead: "",
        },
        {
            user: "798",
            message: "Ankit  shared your post",
            isRead: "",
        }

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
