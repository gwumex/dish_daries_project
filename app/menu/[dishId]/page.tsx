'use client'
import React, { useEffect } from 'react';
import DishDetail from '../../component/DishdetailComponent';
import { fetchComments, fetchFavourites, postComment, postFavourite } from '../../../redux/actions/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState, AppDispatch } from '../../../redux/store'; // Import the type for your root state

interface Dish {
  _id: string;
  name: string;
  image: string;
  category: string;
  label: string;
  price: string;
  featured: boolean;
  description: string;
}
const DishWithId = () => {
  const dispatch: AppDispatch = useDispatch();

  const params = useParams()
  const {dishId} = params

  useEffect(() => {
    // Fetch dishes, comments, and favorites if they are not already in the state
    dispatch(fetchComments());
    dispatch(fetchFavourites());
  }, [dispatch]);

  const dishes = useSelector((state: RootState) => state.dishes);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const comments_per_dish = comments.filter((comment) => comment.dish === dishId)

  const favourites = useSelector((state: RootState) => state.favourites?.favourites);
  const auth = useSelector((state: RootState) => state.auth);

  const dish = dishes.dishes.find((d:Dish) => d._id === dishId) // Use the dishId from the URL to find the dish;
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
          comments={comments_per_dish} 
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

