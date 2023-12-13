'use client'
import React from 'react';
import Link from 'next/link';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { RenderMenuItemProps, FavouritesProps } from '../type';
import Image from 'next/image';


const RenderMenuItem: React.FC<RenderMenuItemProps> = ({ dish, deleteFavourite, dispatch }) => {
  return (
    <li className="media mb-4 ">
      <div className="card shadow-md max-w-[15rem] h-[100%] shadow-blue-100">
        <Link href={`/menu/${dish._id}`}>
          <figure>
            <Image className="mask mt-4  hover:opacity-80 " src={dish.image}
              alt={dish.name} width={250} height={250} />
          </figure>
        </Link>
        <div className="card-body bg-gray-200">
          <div className='flex items-center justify-start gap-x-2'>
            <h2 className="card-title text-lg">
              {dish.name}
            </h2>
            <div className="badge badge-secondary flex text-xs md:text-sm"><p>{dish.label} </p></div>
          </div>
          <div className="card-actions justify-end mt-2">
            <div className="badge badge-outline">{dish.category}</div>
          </div>
        </div>
        <button
          className=" absolute bottom-2 left-2 btn btn-ghost border-red-700  text-red-700 active:text-white active:bg-red-700  btn-sm text-xs focus:outline-none ease-linear transition-all duration-150"
          type="button" 
          onClick={() => dispatch(deleteFavourite(dish._id))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>

        </button>
      </div>
    </li>
  );
};


const Favourites: React.FC<FavouritesProps> = ({ favourites, deleteFavourite }) => {
  const dispatch: AppDispatch = useDispatch();
  if (favourites.isLoading) {
    return <Loading />;
  } else if (favourites.errMess) {
    return (
      <div className="mx-auto mt-3">
        <h4>{favourites.errMess}</h4>
      </div>
    );
  } else if (favourites.favourites?.dishes.length > 0) {
    const favouriteDishes = favourites.favourites.dishes.map((dish) => {
      return (
        <div key={dish._id} >
          <RenderMenuItem dish={dish} deleteFavourite={deleteFavourite} dispatch={dispatch} />

        </div>
      );
    });


    return (
      <div>
        <ul className="list-none">
          {favouriteDishes}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="mx-auto mt-3">
        <h4>You have no favorites</h4>
      </div>
    );
  }
};

export default Favourites;
