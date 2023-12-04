import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  errMess: null,
  promotions: [],
};

const promotionsSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    addPromos: (state, action) => {
      state.isLoading = false;
      state.errMess = null;
      state.promotions = action.payload;
    },
    promosLoading: (state, action) => {
      state.isLoading = true;
      state.errMess = null;
      state.promotions = [];
    },
    promosFailed: (state, action) => {
      state.isLoading = false;
      state.errMess = action.payload;
      state.promotions = [];
    },
  },
});

export const { addPromos, promosLoading, promosFailed } = promotionsSlice.actions;
export default promotionsSlice.reducer;
