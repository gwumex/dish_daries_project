import React from 'react';
import { DishesSkeletonLoading } from './LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import HeroComponent from './HeroComponent';
import { HomeProps, RenderCardProps } from '../type';
import Link from 'next/link';
import Image from 'next/image';
import "./home.css"

function RenderCard({ item, isLoading, errMess }: RenderCardProps) {
  console.log(item._id);

  const scrollItem = (direction) => {
    const currentElement = document.getElementById(item._id);
    if (currentElement) {
      const sibling = direction === 'next' 
        ? currentElement.nextElementSibling 
        : currentElement.previousElementSibling;

      sibling?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  if (isLoading) {
    return <DishesSkeletonLoading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return (
      <div className='snap-center rounded-md bg-secondary bg-opacity-10 rounded-lg' id={item._id}>
        <div className="card min-h-[35rem] min-w-[20rem] md:min-w-[42rem] md:min-h-[20rem] shadow-md  md:flex-row shadow-blue-100 hover:opacity-80">
          <figure className=' max-h-[20rem] md:min-w-[17rem] rounded-none' >
            <Image src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" alt="Burger" width={400} height={400}/>
             </figure>
          <div className="flex flex-col justify-center p-5 ">
            <div className='flex items-center justify-start gap-x-2'>
              <h2 className="card-title text-sm md:text-lg">
                {item.name}
              </h2>
              <div className="badge badge-secondary flex text-xs md:text-sm"><p>Featured</p></div>
            </div>
              <p className="mt-2 text-sm md:text-lg text-left">{item.description}</p>
          </div>
        </div>
    </div>
    );
  }
}

const HomeComponent: React.FC<HomeProps> = ({ dish, dishesLoading, dishesErrMess, promotion, promosLoading, promosErrMess, leader, leaderLoading, leaderErrMess }) => {
  return (
    <div >
      <HeroComponent />
      <div className="text-center relative bg-base-100" style={{backgroundImage: 'url(/hero-desktop.jpg )'}}
      >
      <div className="py-6">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-primary mb-4">Featured</h2>
        <div className=" overflow-x-auto scroll-smooth snap-x scrollbar-hide flex px-12 gap-6">
          <RenderCard item={dish} isLoading={dishesLoading} errMess={dishesErrMess} />
          <RenderCard item={promotion} isLoading={promosLoading} errMess={promosErrMess} />
          <RenderCard item={leader} isLoading={leaderLoading} errMess={leaderErrMess} />
          <RenderCard item={promotion} isLoading={promosLoading} errMess={promosErrMess} />
          <RenderCard item={leader} isLoading={leaderLoading} errMess={leaderErrMess} />
      </div>
          </div>
      </div>
    </div>
  );
}

export default HomeComponent;


