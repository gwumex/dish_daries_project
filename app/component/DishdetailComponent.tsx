import React from 'react';
import { Loading } from './LoadingComponent';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { CommentFormModal, RenderComments } from './CommentComponent';
import { RenderDishProps, DishDetailProps } from '../type';


const RenderDish: React.FC<RenderDishProps> = ({ dish, favourite, postFavourite, dispatch }) => (
  <div className="card shadow-md shadow-blue-100 flex-col lg:flex-row">
    <div className='md:min-w-[40%] lg:min-w-[60%]'>
      <figure >
        <img className="mt-4 md:mt-0 object-fill lg:min-w-[30rem]" src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt={dish.name} /></figure>
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
            onClick={() => favourite ? console.log('Already favorite') : dispatch(postFavourite(dish._id))}
          >
            {favourite ? '❤️' : '🤍'} Favorite
          </button>
        </div>
        <div className="card-actions justify-end mt-2">
          <div className="badge badge-outline">{dish.category}</div>
          <div className="badge badge-outline">{`${dish.likes ? dish.likes : 0} likes`}</div>
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
        <div className="flex flex-col justify-evenly   md:flex-row max-h-[70vh] ">
          <div className='md:w-[65%] lg:w-[75%] '>
            <RenderDish dish={dish} favourite={favourite} postFavourite={postFavourite} dispatch={dispatch} />
          </div>
            <hr className="my-2 border-gray-300 md:hidden " />
          <div className='md:w-[33%] lg:w-[25%] bg-gray-200'>
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

