'use client'
import React from 'react';
import Link from 'next/link';
import { Loading, DishesSkeletonLoading } from '../../component/LoadingComponent';
import { baseUrl } from '../../../shared/baseUrl';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'; // Import the type for your root state
import { Dish, MenuProps } from '../../type'
import Image from 'next/image';

function RenderMenuItem({ dish }: { dish: Dish }) {
  return (
    <div >
      <Link href={`/menu/${dish._id}`}>
        <div className="card shadow-md md:max-w-sm shadow-blue-100 hover:opacity-80">
          <figure>
            <Image className="mask mt-4 " src={dish.image}
              alt={dish.name} height={500} width={500} /></figure>
          <div className="card-body bg-gray-200">
            <div className='flex items-center justify-start gap-x-2'>
              <h2 className="card-title text-lg">
                {dish.name}
              </h2>
              <div className="badge badge-secondary flex text-xs md:text-sm"><p>{dish.label} </p></div>
            </div>
            <div className='h-[10rem] overflow-y-auto text-sm'>
              <p>{dish.description}</p>
            </div>
            <div className="card-actions justify-end mt-2">
              <div className="badge badge-outline">{dish.category}</div>
              <div className="badge badge-outline">{`${dish.likes ? dish.likes : 0} likes`}</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

const Menu= () => {
  const dishes = useSelector((state: RootState) => state.dishes);
  if (dishes.isLoading) {
    return (
      <div className='flex flex-wrap justify-center items-start gap-8'>
        <DishesSkeletonLoading />
        <DishesSkeletonLoading />
        <DishesSkeletonLoading />
        <DishesSkeletonLoading />

      </div>
    )
  } else if (dishes.errMess) {
    return <h4 className="text-center text-red-500">{dishes.errMess}</h4>;
  } else {
    return (
      <div className="flex flex-wrap items-start gap-8">
        {dishes.dishes.map((dish: Dish) => (
          <RenderMenuItem key={dish._id} dish={dish} />
        ))}
      </div>
    );
  }
};

export default Menu;

