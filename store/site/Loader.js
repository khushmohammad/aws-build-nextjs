import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loader: false,
};

const siteLoader = createSlice({
    name: "friends",
    initialState,
    reducers: {
        loaderStatus: (state, action) => {
            state.loader = action.payload
            //console.log(action.payload, "dfdddf")
        },

    },
});

export const { loaderStatus } = siteLoader.actions

export default siteLoader.reducer;
