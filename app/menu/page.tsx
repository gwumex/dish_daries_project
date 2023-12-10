'use client'
import React from 'react';
import Link from 'next/link';
import { Loading } from '../component/LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Import the type for your root state
import { Dish, MenuProps } from '../type';




function RenderMenuItem({ dish }: { dish: Dish }) {
  return (
    <div className="w-80 h-80 rounded-lg shadow-2xl hover:shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out m-4 bg-black">
<Link href={`/menu/${dish._id}`}>
  <div className="cursor-pointer group">
    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg">
      {/* Image */}
      <img
        src={baseUrl + dish.image}
        alt={dish.name}
        className="w-full object-cover transform transition duration-300 group-hover:scale-110"
      />
      {/* Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-4 group-hover:opacity-100 transition-opacity duration-300">
        <h5 className="text-2xl font-semibold text-white transition-colors duration-300">
          {dish.name}
        </h5>
        <button className="mt-4 py-2 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-300">
          View Details
        </button>
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
    return <Loading />;
  } else if (dishes.errMess) {
    return <h4 className="text-center text-red-500">{dishes.errMess}</h4>;
  } else {
    return (
      <div className="p-6 ">
        <div className="mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-deep-blue">Our Menu</h2>
            <p className="mt-3 text-xl text-gray-500">Explore our wide variety of dishes and flavors</p>
            <hr className="my-6 border-gray-300" />
          </div>
          <div className="flex flex-wrap justify-center">
            {dishes.dishes.map((dish: Dish) => (
              <RenderMenuItem key={dish._id} dish={dish} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Menu;

