import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllfriendRequest } from "../../services/friends.service";

const initialState = {
    status: "loading",
};

const AllFriendsRequestsSlice = createSlice({
    name: "FriendsRequests",
    initialState,
    activePage: "",
    FriendsRequests: [],
    extraReducers: (builder) => {
        builder
            .addCase(getAllFriendsRequestsList.pending, (state, action) => {
                state.status = "loading";
                state.error = "";
                state.FriendsRequests = [];
            })
            .addCase(getAllFriendsRequestsList.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.FriendsRequests = action.payload;
                state.error = "";
            })
            .addCase(getAllFriendsRequestsList.rejected, (state, action) => {
                state.status = "failed";
                //console.log(action,"action");
                state.error = action.error.message;
                state.FriendsRequests = [];
            });
    },
});

export const getAllFriendsRequestsList = createAsyncThunk(
    "Friends/FriendsRequests",
    async () => {
        const FriendsRequestslist = await getAllfriendRequest()
        //  console.log(FriendsRequestslist, "FriendsRequestslist");
        return FriendsRequestslist

    }
);




export default AllFriendsRequestsSlice.reducer;
