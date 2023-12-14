'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Loading, DishesSkeletonLoading } from '../../component/LoadingComponent';
import { baseUrl } from '../../../shared/baseUrl';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store'; // Import the type for your root state
import { Dish, MenuProps } from '../../type'
import Image from 'next/image';
import { fetchDishes, fetchMoreDishes } from '@/redux/actions/ActionCreators';
import { useDispatch } from 'react-redux';
import { setCurrentPage, setLastPageFetch, setPageFetched, setshouldScroll } from '@/redux/reducers/other-slice';

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

const Menu = () => {
  const dispatch: AppDispatch = useDispatch()
  const dishes = useSelector((state: RootState) => state.dishes);
  const totalPages = useSelector((state: RootState) => state.dishes.dishesDetails.pages);
  const total = useSelector((state: RootState) => state.dishes.dishesDetails.total);
  const pageFetched = useSelector((state: RootState) => state.other.fetchedPages)
  const currentPage = useSelector((state: RootState) => state.other.currentPage)
  const [allowDataFetch, setAllowDataFetch] = useState(true);
  const mainDishRef = useRef(null);

  const limit = 6;

  const minIndex = (currentPage - 1) * limit
  const maxIndex = currentPage * limit


  const handleScrollToMainDish = () => {
    dispatch(setshouldScroll(true));
  };

  const createNumberArray = (length: number) => {
    // Create an array from 1 to length
    return Array.from({ length }, (_, index) => index + 1);
  };

  const fetchData = () => {
    if (!pageFetched.includes(currentPage)) {
      dispatch(setPageFetched(currentPage))
      if (currentPage === 1) {
        dispatch(fetchDishes(currentPage, limit));
      } else {
        dispatch(fetchMoreDishes(currentPage, limit));
      }
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      handleScrollToMainDish()
      setAllowDataFetch(true)
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handleScrollToMainDish()
      setAllowDataFetch(true)
      dispatch(setCurrentPage(currentPage - 1));
    }
  };
  const handleFirst = () => {
    handleScrollToMainDish()
    setAllowDataFetch(true)
    dispatch(setCurrentPage(1));

  };
  const handleLast = () => {
    handleScrollToMainDish()
    setAllowDataFetch(false)
    dispatch(setCurrentPage(totalPages));
  };

  useEffect(() => {
    if (allowDataFetch) {
      return fetchData()
    } else {
      if (!pageFetched.includes(currentPage)) {
        dispatch(setLastPageFetch([...createNumberArray(totalPages)]));
        dispatch(fetchDishes(0, total));
      }
    }
  }, [currentPage])

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
      <div ref={mainDishRef}>
        <div className="main flex flex-wrap  justify-center gap-8">
          {dishes.dishesDetails.dishes.slice(minIndex, maxIndex).map((dish: Dish) => (
            <RenderMenuItem key={dish._id} dish={dish} />
          ))}

        </div>
          <div className="join w-full flex justify-between mt-10">
            <div>
            <button className="join-item btn-xs md:btn-lg btn  active:bg-secondary" onClick={handleFirst} disabled={currentPage === 1}>First</button>
            <button className="join-item btn-xs md:btn-lg btn  active:bg-secondary"  onClick={handlePrevious} disabled={currentPage === 1}>Prev</button>
            </div>
            <div>
            <button className=" btn btn-disbled btn-xs md:btn-lg hover:animate-pulse">{currentPage} of {totalPages}</button>

            </div>
          <div>
            <button className="join-item btn-xs md:btn-lg btn  active:bg-secondary" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            <button className="join-item btn-xs md:btn-lg btn  active:bg-secondary" onClick={handleLast} disabled={currentPage === totalPages}>Last</button>
          </div>
          </div>
        </div>
    );
  }
};

export default Menu;

