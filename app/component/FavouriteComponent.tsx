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
    <li className="media mb-4">
      <div className="card shadow-md max-w-[15rem] shadow-blue-100 hover:opacity-80">
        <figure>
          <Image className="mask mt-4 " src={dish.image}
            alt={dish.name} width={250} height={250}/></figure>
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
      </div>
      <button
        className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => dispatch(deleteFavourite(dish._id))}
      >
        <span className="fa fa-times">X</span>
      </button>
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
          <Link href={`/menu/${dish._id}`}>
            <RenderMenuItem dish={dish} deleteFavourite={deleteFavourite} dispatch={dispatch} />
          </Link>

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
