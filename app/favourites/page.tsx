'use client'
import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavourites, deleteFavourite } from '../../redux/actions/ActionCreators';
import { RootState, AppDispatch } from '../../redux/store'; // Import the type for your root state
import Favourites from '../component/FavouriteComponent'


const page = () => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFavourites)
    }, [dispatch])

    const favourites = useSelector((state: RootState) => state.favourites);
    
  return (
    <div>
        <Favourites favourites={favourites} deleteFavourite={deleteFavourite}/>
    </div>
  )
}

export default page