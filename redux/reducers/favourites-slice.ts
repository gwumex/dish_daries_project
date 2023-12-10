import { createSlice } from "@reduxjs/toolkit";
import { FavouritesState } from "@/app/type";

const initialState: FavouritesState = {
    isLoading: true,
    errMess: null,
    favourites: {dishes: []}
};

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: initialState as FavouritesState,
    reducers: {
        addFavourites: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.favourites = action.payload
        },
        favouritesLoading: (state, action) => {
            state.isLoading = true;
            state.errMess = null;
        },
        favouritesFailed: (state, action) => {
            state.isLoading = false;
            state.errMess = action.payload;
            state.favourites.dishes = [];
          },
    }
})

export const {addFavourites, favouritesLoading, favouritesFailed} = favouritesSlice.actions;
export default favouritesSlice.reducer;