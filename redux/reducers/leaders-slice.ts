import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    errMess: null,
    leaders: []
};

const leadersSlice = createSlice({
    name: 'leaders',
    initialState,
    reducers: {
        addLeaders: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.leaders = action.payload
        },
        leadersLoading: (state, action) => {
            state.isLoading = true;
            state.errMess = null;
            state.leaders = [];
        },
        leadersFailed: (state, action) => {
            state.isLoading = false;
            state.errMess = action.payload;
            state.leaders = [];
          },
    }
})

export const {addLeaders, leadersLoading, leadersFailed} = leadersSlice.actions;
export default leadersSlice.reducer;