import React, { Component, useRef, useState } from 'react';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { postComment } from '@/redux/actions/ActionCreators';
import {CommentFormModal, RenderComments} from './CommentComponent';
import { RenderDishProps, DishDetailProps } from '../type';
 

const RenderDish: React.FC<RenderDishProps> = ({ dish, favourite, postFavourite, dispatch}) => (

<div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
  <img className="w-full h-64 object-cover" src={baseUrl + dish.image} alt={dish.name} />
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-2">{dish.name}</h2>
    <p className="text-gray-700">{dish.description}</p>
    <button
      className={`mt-4 ${favourite ? 'text-red-500' : 'text-gray-500'} hover:text-red-600 transition-colors duration-300 focus:outline-none`}
      onClick={() => favourite ? console.log('Already favorite') : dispatch(postFavourite(dish._id))}
    >
      {favourite ? '❤️' : '🤍'} Favorite
    </button>
  </div>
</div>

);



const DishDetail: React.FC<DishDetailProps> = ({ dish, isLoading, errMess, favourite, postFavourite, comments, postComment }) => {
  const dispatch: AppDispatch = useDispatch();

  return <div className="container mx-auto p-4">
    {isLoading ? (
      <div className="flex justify-center">
        <Loading />
      </div>
    ) : errMess ? (
      <div className="text-center text-red-500">
        <h4>{errMess}</h4>
      </div>
    ) : dish ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RenderDish dish={dish} favourite={favourite} postFavourite={postFavourite} dispatch={dispatch}/>
        <div>
          <RenderComments comments={comments} postComment={postComment} dishId={dish._id} />
          <CommentFormModal dishId={dish._id} postComment={postComment} />
        </div>
      </div>
    ) : (
      <div>Content not available</div>
    )}
  </div>;

};

export default DishDetail;

