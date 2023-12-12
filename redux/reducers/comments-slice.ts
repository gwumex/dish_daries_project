import { createSlice } from "@reduxjs/toolkit";
import { CommentsState } from "@/app/type";

const initialState: CommentsState = {
    isLoading: true,
    errMess: null,
    comments: []
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComments: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.comments = action.payload
        },
        commentsFailed: (state, action) => {
            state.isLoading = false;
            state.errMess = action.payload;
            state.comments = [];
        },
        commentPostFailed: (state, action) => {
            state.isLoading = false;
            state.errMess = action.payload
        },
        addComment: (state, action) => {
            var comment = action.payload
            state.errMess = null;
            state.comments = state.comments.concat(comment);
        },
    }
})

export const {addComments, addComment, commentsFailed, commentPostFailed} = commentsSlice.actions;
export default commentsSlice.reducer;