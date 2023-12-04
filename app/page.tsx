"use client";
import React, { useEffect } from 'react';
import HomeComponent from './component/HomeComponent';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDishes, fetchPromos, fetchLeaders, fetchFavourites } from '../redux/actions/ActionCreators';
import { RootState, AppDispatch } from '../redux/store'; // Import the type for your root state
import { loginSuccess, setUser } from '../redux/reducers/auth-slice';
import { lusitana } from './fonts';


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

export default function HomePage() {

  const value: Dish = {
    _id: "1",
    name: "test",
    image: "test",
    category: "test",
    label: "test",
    price: "test",
    featured: true,
    description: "test"
  } 
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(loginSuccess(token));
      // try {
      //   const user = 
      //   dispatch(setUser(user));
      // } catch (error) {
      //   console.error("Failed to parse user credentials", error);
      // }
    }


    dispatch(fetchPromos());
    dispatch(fetchLeaders());
    dispatch(fetchDishes()); // Make sure to dispatch fetchDishes

    // If you want this effect to run only once on mount, you should pass an empty dependency array.
  }, [dispatch]); 
  // Access state directly from the Redux store using typed selectors
  const dishes = useSelector((state: RootState) => state.dishes.dishes);
  const promotions = useSelector((state: RootState) => state.promotions.promotions);
  const leaders = useSelector((state: RootState) => state.leaders.leaders);
  
  const dishesLoading = useSelector((state: RootState) => state.dishes.isLoading);
  const dishesErrMess = useSelector((state: RootState) => state.dishes.errMess);
  const promosLoading = useSelector((state: RootState) => state.promotions.isLoading);
  const promosErrMess = useSelector((state: RootState) => state.promotions.errMess);
  const leaderLoading = useSelector((state: RootState) => state.leaders.isLoading);
  const leaderErrMess = useSelector((state: RootState) => state.leaders.errMess);

  return (
    < div className={`${lusitana.className} antialiased relative`}>
    <HomeComponent
      dish={dishes.find((dish: Dish) => dish.featured) || value}
      dishesLoading={dishesLoading}
      dishesErrMess={dishesErrMess}
      promotion={promotions.find((promo: Dish) => promo.featured) || value}
      promosLoading={promosLoading}
      promosErrMess={promosErrMess}
      leader={leaders.find((leader: Dish) => leader.featured) || value}
      leaderLoading={leaderLoading}
      leaderErrMess={leaderErrMess}
    />
    </div>
  );
}
