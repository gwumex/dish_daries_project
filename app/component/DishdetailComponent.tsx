import React from 'react';
import { Loading } from './LoadingComponent';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { CommentFormModal, RenderComments } from './CommentComponent';
import { RenderDishProps, DishDetailProps } from '../type';
import { setToastMessage } from '@/redux/reducers/other-slice';
import Image from 'next/image';


const RenderDish: React.FC<RenderDishProps> = ({ dish, favourite, postFavourite, dispatch, no_of_comments }) => (
  <div className="card shadow-md shadow-blue-100 flex-col lg:flex-row">
    <div className='md:min-w-[40%] lg:min-w-[60%]'>
      <figure >
        <Image className="mt-4 md:mt-0 object-fill lg:min-w-[30rem]" src={dish.image}
          alt={dish.name} width={500} height={500} /></figure>
    </div>
    <div className="card-body md:min-w-[30%] lg:w-[30%] bg-gray-200">
      <div className='flex items-center justify-start gap-x-2'>
        <h2 className="card-title text-lg">
          {dish.name}
        </h2>
        <div className="badge badge-secondary flex text-xs md:text-sm"><p>{dish.label} </p></div>
      </div>
      <div className='h-[10rem] md:h-full overflow-y-auto text-sm md:text-md lg:text-lg'>
        <p>{dish.description}</p>
      </div>
      <div className='flex items-center justify-between mt-2'>
        <div>
          <button
            className={`${favourite ? 'text-red-500' : 'text-gray-500'} hover:text-red-600 transition-colors duration-300 focus:outline-none`}
            onClick={() => favourite ? dispatch(setToastMessage("Already Favourite")) : dispatch(postFavourite(dish._id))}
          >
            {favourite ? '❤️' : '🤍'} Favorite
          </button>
        </div>
        <div className="card-actions justify-end mt-2">
          <div className="badge badge-outline">{dish.category}</div>
          <div className="badge badge-outline">{`${dish.likes ? dish.likes : 0} likes`}</div>
          <div className="badge bg-transparent"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
            {no_of_comments}
            </div>
        </div>
      </div>
    </div>
  </div>

);

const DishDetail: React.FC<DishDetailProps> = ({ dish, isLoading, errMess, favourite, postFavourite, comments, postComment }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="">
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : errMess ? (
        <div className="text-center text-red-500">
          <h4>{errMess}</h4>
        </div>
      ) : dish ? (
        <div className="flex flex-col justify-evenly   md:flex-row ">
          <div className='md:w-[65%] lg:w-[75%] '>
            <RenderDish dish={dish} favourite={favourite} postFavourite={postFavourite} dispatch={dispatch} no_of_comments={comments.length} />
          </div>
          <hr className="my-2 border-gray-300 md:hidden " />
          <div className='md:w-[33%] lg:w-[25%] '>
            <RenderComments comments={comments} postComment={postComment} dishId={dish._id} />
            <CommentFormModal dishId={dish._id} postComment={postComment} />
          </div>
        </div>
      ) : (
        <div>Content not available</div>
      )}
    </div>
  );

};

export default DishDetail;

