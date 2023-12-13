import { OtherState } from '@/app/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: OtherState = {
    isLoginModalModalOpen: false,
    isSignUpModalOpen: false,
    toastIsOpen: false,
    toastMessage: 'hello'
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
        }
    }
})

export const {
    setLoginModal,
    setSignUpModal,
    setToast,
    setToastMessage
  } = otherSlice.actions;
  export default otherSlice.reducer;