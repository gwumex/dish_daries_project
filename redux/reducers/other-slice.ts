import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OtherState {
    isModalOpen: boolean
}

const initialState: OtherState = {
    isModalOpen: false
}

const otherSlice = createSlice ({
    name: "other",
    initialState, 
    reducers: {
        setIsModal: (state) => {
            state.isModalOpen = (!state.isModalOpen)
        }
    }
})


export const {
    setIsModal
  } = otherSlice.actions;
  export default otherSlice.reducer;