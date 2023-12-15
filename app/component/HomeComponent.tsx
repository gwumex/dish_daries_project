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

// function RenderCard({ item }) {
//   const scrollItem = (direction) => {
//     const currentElement = document.getElementById(item._id);
//     console.log("Current Element:", currentElement);
//     console.log("Direction:", direction);
  
//     if (currentElement) {
//       const sibling = direction === 'next' 
//         ? currentElement.nextElementSibling 
//         : currentElement.previousElementSibling;
  
//       console.log("Sibling:", sibling);
//       sibling?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
//     }
//   };
  

//   return (
//     <div className='snap-start md:snap-center rounded-md' id={item._id}>
//       {/* Card content */}
//       <Link href={`/menu/${item._id}`}>
//         <div className="card glass shadow-md md:min-w-[42rem] md:min-h-[20rem] md:flex-row shadow-blue-100 hover:opacity-80">
//           <figure className=' min-w-[17rem] rounded-none' >
//             <Image src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" alt="Burger" width={400} height={400}/>
//              </figure>
//           <div className="card-body">
//             <div className='flex items-center justify-start gap-x-2'>
//               <h2 className="card-title text-lg">
//                 {item.name}
//               </h2>
//               <div className="badge badge-secondary flex text-xs md:text-sm"><p>Featured</p></div>
//             </div>
//               <p className=" text-xs md:text-sm">{item.description}</p>
//           </div>
//         </div>
//       </Link>      
//       {/* <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//         <button className="btn btn-circle" onClick={() => scrollItem('prev')}>❮</button> 
//         <button className="btn btn-circle" onClick={() => scrollItem('next')}>❯</button>
//       </div> */}
//     </div>
//   );
// }

const HomeComponent: React.FC<HomeProps> = ({ dish, dishesLoading, dishesErrMess, promotion, promosLoading, promosErrMess, leader, leaderLoading, leaderErrMess }) => {
  return (
    <div >
      <HeroComponent />
      <div className="text-center relative bg-base-100">
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


