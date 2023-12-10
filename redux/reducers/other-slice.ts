import { OtherState } from '@/app/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: OtherState = {
    isLoginModalModalOpen: false,
    isSignUpModalOpen: false
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
        }
    }
})


export const {
    setLoginModal,
    setSignUpModal
  } = otherSlice.actions;
  export default otherSlice.reducer;