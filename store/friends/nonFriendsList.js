import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNonFriendList } from "../../services/friends.service";

const initialState = {
    status: "loading",
};

const NonFriendListSlice = createSlice({
    name: "nonFriendsList",
    initialState,
    activePage: "",
    NonFriendList: [],
    extraReducers: (builder) => {
        builder
            .addCase(getNonFriendsList.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
                state.NonFriendList = [];
            })
            .addCase(getNonFriendsList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.NonFriendList = action.payload;
                state.error = "";
            })
            .addCase(getNonFriendsList.rejected, (state, action) => {
                state.status = "failed";
                //console.log(action,"action");
                state.error = action.error.message;
                state.NonFriendList = [];
            });
    },
});

export const getNonFriendsList = createAsyncThunk(
    "Friends/nonFriendsList",
    async () => {
        const nonFriendsList = await getNonFriendList()

        return nonFriendsList

    }
);




export default NonFriendListSlice.reducer;
