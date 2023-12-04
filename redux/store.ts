// src/app/store.ts
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import promotionsSlice from './reducers/promotions-slice';
import authSlice from './reducers/auth-slice';
import commentsSlice from './reducers/comments-slice';
import dishesSlice from './reducers/dishes-slice';
import leadersSlice from './reducers/leaders-slice';
import favouritesSlice from './reducers/favourites-slice';
import {InitialFeedback} from './reducers/forms';
import otherSlice from './reducers/other-slice';

export const store = configureStore({
  reducer: {
    promotions: promotionsSlice,
    auth: authSlice,
    comments: commentsSlice,
    dishes: dishesSlice,
    leaders: leadersSlice,
    favourites: favouritesSlice,
    other: otherSlice
  },
  
},
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
