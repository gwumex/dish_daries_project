import { createSlice } from "@reduxjs/toolkit";
import { DishesState } from "@/app/type";

const initialState: DishesState = {
    isLoading: true,
    errMess: null,
    dishes: []
};

const dishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {
        addDishes: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.dishes = action.payload
        },
        dishesLoading: (state, action) => {
            state.isLoading = true;
            state.errMess = null;
            state.dishes = [];
        },
        dishesFailed: (state, action) => {
            state.isLoading = false;
            state.errMess = action.payload;
            state.dishes = [];
          },
    }
})

export const {addDishes, dishesLoading, dishesFailed} = dishesSlice.actions;
export default dishesSlice.reducer;
