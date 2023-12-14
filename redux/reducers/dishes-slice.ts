import { createSlice } from "@reduxjs/toolkit";
import { DishesState } from "@/app/type";

const initialState: DishesState = {
    isLoading: false,
    errMess: null,
    dishesDetails: {
        dishes: [],
        total: 0,
        pages: 0
    }
};
const dishesSlice = createSlice({
    name: 'dishesData',
    initialState,
    reducers: {
        addDishes: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.dishesDetails = action.payload
        },
        addMoreDishes: (state, action) => {
            state.isLoading = false;
            const moreDishes = action.payload.dishes
            state.dishesDetails.dishes = [...state.dishesDetails.dishes, ...moreDishes]
            state.dishesDetails.pages = action.payload.pages;
            state.dishesDetails.total = action.payload.total;
        },        
        dishesLoading: (state, action) => {
            state.isLoading = true;
            state.errMess = null;
            state.dishesDetails.dishes = [];
        },
        moreDishesLoading: (state, action) => {
            state.isLoading = true;
            state.errMess = null;
        },
        dishesFailed: (state, action) => {
            state.isLoading = false;
            state.errMess = action.payload;
            state.dishesDetails.dishes = [];
        },
        addDish: (state, action) => {
            state.isLoading = false;
            const dish = action.payload
            state.errMess = null;
            state.dishesDetails.dishes = [dish, ...state.dishesDetails.dishes]
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

export const {addDishes, dishesLoading, dishesFailed, addDish, dishFailed, dishLoading, addMoreDishes, moreDishesLoading} = dishesSlice.actions;
export default dishesSlice.reducer;
