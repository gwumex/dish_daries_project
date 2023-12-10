"use client";
import React from 'react';
import HomeComponent from './component/HomeComponent';
import { useSelector, useDispatch } from 'react-redux';
import { lusitana } from './fonts';
import { RootState, AppDispatch } from '../redux/store'; // Import the type for your root state
import { Dish, Promos } from './type';

export default function HomePage() {

  const value: Dish = {
    _id: "1",
    name: "test",
    image: "test",
    category: "test",
    label: "test",
    price: "test",
    featured: true,
    description: "test",
    likes: 0,
    no_of_comments: 0
  } 

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
      promotion={promotions.find((promo: Promos) => promo.featured) || value}
      promosLoading={promosLoading}
      promosErrMess={promosErrMess}
      leader={leaders.find((leader: Dish) => leader.featured) || value}
      leaderLoading={leaderLoading}
      leaderErrMess={leaderErrMess}
    />
    </div>
  );
}
