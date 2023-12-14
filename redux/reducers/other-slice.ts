import { OtherState } from '@/app/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useRef } from 'react';


const initialState: OtherState = {
    isLoginModalModalOpen: false,
    isSignUpModalOpen: false,
    toastIsOpen: false,
    toastMessage: 'hello',
    fetchedPages: [],
    currentPage: 1,
    shouldScroll: false
}

const otherSlice = createSlice ({
    name: "other",
    initialState, 
    reducers: {
        setLoginModal: (state) => {
            state.isLoginModalModalOpen = (!state.isLoginModalModalOpen)
        },
        setSignUpModal: (state) => {
            state.isSignUpModalOpen = (!state.isSignUpModalOpen)
        },
        setToast: (state) => {
            state.toastIsOpen = false
        },
        setToastMessage: (state, action) => {
            state.toastIsOpen = true,
            state.toastMessage = action.payload
        },
        setPageFetched: (state, action) => {
            state.fetchedPages = [...state.fetchedPages, action.payload]
        },
        setLastPageFetch: (state, action) => {
            state.fetchedPages = [...action.payload]
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setshouldScroll: (state, action) => {
            state.shouldScroll = action.payload
        }
    }
})

export const {
    setLoginModal,
    setSignUpModal,
    setToast,
    setToastMessage,
    setPageFetched,
    setLastPageFetch,
    setCurrentPage,
    setshouldScroll
  } = otherSlice.actions;
  export default otherSlice.reducer;