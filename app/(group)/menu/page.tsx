'use client'
import React from 'react';
import Link from 'next/link';
import { Loading, DishesSkeletonLoading } from '../../component/LoadingComponent';
import { baseUrl } from '../../../shared/baseUrl';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'; // Import the type for your root state
import { Dish, MenuProps } from '../../type';

function RenderMenuItem({ dish }: { dish: Dish }) {
  return (
    <div >
<Link href={`/menu/${dish._id}`}>
  <div className="card max-w-sm shadow-md shadow-blue-100">
  <figure>
        <img className="mask mask-squircle h-56" src={baseUrl + dish.image}
        alt={dish.name} /></figure>
  <div className="card-body">
    <h2 className="card-title">
    {dish.name}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>{dish.description}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">{dish.category}</div> 
      <div className="badge badge-outline">{dish.likes? dish.likes : 0}</div>
    </div>
  </div>
</div>
</Link>
    </div>
  );
}

const Menu: React.FC<MenuProps> = () => {
  const dishes = useSelector((state: RootState) => state.dishes);
  if (dishes.isLoading) {
    return(
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
          <div className="flex flex-wrap justify-center items-start gap-8">
            {dishes.dishes.map((dish: Dish) => (
              <RenderMenuItem key={dish._id} dish={dish} />
            ))}
          </div>
    );
  }
};

export default Menu;

