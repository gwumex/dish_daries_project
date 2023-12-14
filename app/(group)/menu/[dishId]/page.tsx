'use client'
import React, { useEffect } from 'react';
import DishDetail from '../../../component/DishdetailComponent';
import { fetchComments, fetchFavourites, postComment, postFavourite } from '../../../../redux/actions/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState, AppDispatch } from '../../../../redux/store'; // Import the type for your root state
import { Dish } from '@/app/type';

const DishWithId = () => {
  const dispatch: AppDispatch = useDispatch();

  const params = useParams()
  const {dishId} = params

  useEffect(() => {
    // Fetch dishes, comments, and favorites if they are not already in the state
    dispatch(fetchComments(dishId));
    dispatch(fetchFavourites());
  }, [dispatch]);

  const dishes = useSelector((state: RootState) => state.dishes);
  const comments = useSelector((state: RootState) => state.comments.comments);

  const favourites = useSelector((state: RootState) => state.favourites?.favourites);
  const auth = useSelector((state: RootState) => state.auth);

  const dish = dishes.dishesDetails.dishes.find((d:Dish) => d._id === dishId) // Use the dishId from the URL to find the dish;
  const favourite = favourites?.dishes?.some((f:Dish) => f._id === dishId)

  // Handle the case where the dish is not found
  if (!dish) {
    return <p>Dish not found</p>;
  }

  // Render dish detail
  return (
    auth.isAuthenticated
    ?
    <DishDetail dish={dish}  
          isLoading={dishes.isLoading} 
          errMess={dishes.errMess} 
          favourite={favourite} 
          postFavourite={postFavourite} 
          comments={comments} 
          postComment={postComment} />
          :
    <DishDetail dish={dish}  
          isLoading={dishes.isLoading} 
          errMess={dishes.errMess} 
          favourite={false} 
          postFavourite={postFavourite} 
          comments={comments} 
          postComment={postComment} />
  );
};

export default DishWithId;

