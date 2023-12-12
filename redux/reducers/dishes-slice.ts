import { createSlice } from "@reduxjs/toolkit";
import { DishesState } from "@/app/type";

const initialState: DishesState = {
    isLoading: false,
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
        addDish: (state, action) => {
            state.isLoading = false;
            const dish = action.payload
            state.errMess = null;
            state.dishes = state.dishes.concat(dish)
        },
        dishFailed: (state, action) => {
            state.isLoading = false;
            state.errMess = action.payload;
        },
        dishLoading: (state) => {
            state.isLoading = true;
            state.errMess = null;

        }
    }
})

export const {addDishes, dishesLoading, dishesFailed, addDish, dishFailed, dishLoading} = dishesSlice.actions;
export default dishesSlice.reducer;
