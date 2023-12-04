// Favorites.tsx
import React from 'react';
import Link from 'next/link';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from './LoadingComponent';

interface Dish {
  _id: string;
  name: string;
  image: string;
  category: string;
  label: string;
  price: string;
  featured: boolean;
  description: string;
}

interface RenderMenuItemProps {
  dish: Dish;
  deleteFavourite: (id: string) => void;
}

const RenderMenuItem: React.FC<RenderMenuItemProps> = ({ dish, deleteFavourite }) => {
  return (
    <li className="media mb-4">
      <img className="mr-3" src={baseUrl + dish.image} alt={dish.name} />
      <div className="media-body">
        <h5 className="mt-0 mb-2">{dish.name}</h5>
        <p>{dish.description}</p>
        <button
          className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => deleteFavourite(dish._id)}
        >
          <span className="fa fa-times"></span>
        </button>
      </div>
    </li>
  );
};

interface FavouritesProps {
  favourites: {
    isLoading: boolean;
    errMess: string | null;
    favourites: { dishes: Dish[] };
  };
  deleteFavourite: (id: string) => void;
}

const Favourites: React.FC<FavouritesProps> = ({ favourites, deleteFavourite }) => {
  if (favourites.isLoading) {
    return <Loading />;
  } else if (favourites.errMess) {
    return (
      <div className="container mx-auto mt-3">
        <h4>{favourites.errMess}</h4>
      </div>
    );
  } else if (favourites.favourites.dishes.length > 0) {
    const favouriteDishes = favourites.favourites.dishes.map((dish) => {
      return (
        <div key={dish._id} className="col-12 mt-5">
          <RenderMenuItem dish={dish} deleteFavourite={deleteFavourite} />
        </div>
      );
    });

    return (
      <div className="container mx-auto mt-3">
        <nav className="flex" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/home">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Favorites
            </li>
          </ol>
        </nav>
        <h3 className="text-3xl font-semibold mb-3">My Favorites</h3>
        <ul className="list-none">
          {favouriteDishes}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto mt-3">
        <h4>You have no favorites</h4>
      </div>
    );
  }
};

export default Favourites;
