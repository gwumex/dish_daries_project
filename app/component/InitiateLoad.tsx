"use client"
import React from 'react'
import { useEffect } from 'react'
import { fetchDishes, fetchPromos, fetchLeaders, fetchFavourites } from '../../redux/actions/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken } from '../../redux/actions/ActionCreators';
import { RootState, AppDispatch } from '../../redux/store'; // Import the type for your root state


const InitiateLoad = () => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchPromos());
      dispatch(fetchLeaders());
      dispatch(fetchDishes()); // Make sure to dispatch fetchDishes
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(loginWithToken(token))
      }
      else {
        return
      }
  
    }, [dispatch]); 
  return (
    <>
    </>
  )
}

export default InitiateLoad