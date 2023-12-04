import { createSlice } from "@reduxjs/toolkit";

type Dish = {
    _id: string;
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    featured: boolean;
    description: string;
  };

const initialState = {
    isLoading: true,
    errMess: null,
    favourites: {dishes:[] as Dish[]}
};

interface FavouritesState {
    isLoading: boolean;
    errMess: string | null;
    favourites: {
      dishes: Dish[];
    };
  }

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
            state.favourites.dishes = [];
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