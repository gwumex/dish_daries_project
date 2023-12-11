'use client'
import React, { useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavourites, deleteFavourite } from '../../../redux/actions/ActionCreators';
import { RootState, AppDispatch } from '../../../redux/store'; // Import the type for your root state
import Favourites from '../../component/FavouriteComponent'


const page = () => {
    const dispatch: AppDispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth.isAuthenticated)
    const router = useRouter();

    useEffect(() => {
      if (!auth) {
        router.push('/');
      }
        dispatch(fetchFavourites)

    }, [dispatch, router, auth])

    const favourites = useSelector((state: RootState) => state.favourites);
    
  return (
    <div>
        <Favourites favourites={favourites} deleteFavourite={deleteFavourite}/>
    </div>
  )
}

export default page