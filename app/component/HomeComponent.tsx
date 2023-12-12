import React from 'react';
import { Loading, DishesSkeletonLoading} from './LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import './Home.css'; // Make sure this import points to the correct file path
import HeroComponent from './HeroComponent';
import { HomeProps, RenderCardProps } from '../type';

function RenderCard({ item, isLoading, errMess }: RenderCardProps) {
  if (isLoading) {
    return <DishesSkeletonLoading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return (
      <div className="card fade-transform-enter">
        <img src={baseUrl + item.image} alt={item.name} className="card-img" />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          {item.designation ? <p className="card-subtitle">{item.designation}</p> : null}
          <p className="card-text">{item.description}</p>
        </div>
      </div>
    );
  }
}



const HomeComponent: React.FC<HomeProps> = ({ dish, dishesLoading, dishesErrMess, promotion, promosLoading, promosErrMess, leader, leaderLoading, leaderErrMess }) => {
  return (
    <div className="">
      <HeroComponent/>
      <div className="flex flex-col md:flex-row">
        <div className="m-1">
          <RenderCard item={dish} isLoading={dishesLoading} errMess={dishesErrMess} />
        </div>
        <div className="m-1">
          <RenderCard item={promotion} isLoading={promosLoading} errMess={promosErrMess} />
        </div>
        <div className=" m-1">
          <RenderCard item={leader} isLoading={leaderLoading} errMess={leaderErrMess} />
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;


