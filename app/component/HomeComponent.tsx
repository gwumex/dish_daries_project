import React from 'react';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../../shared/baseUrl';
import './Home.css'; // Make sure this import points to the correct file path
import HeroComponent from './HeroComponent';
interface Item {
  image: string;
  name: string;
  designation?: string;
  description: string;
}

interface RenderCardProps {
  item: Item;
  isLoading: boolean;
  errMess: string | null;
}

function RenderCard({ item, isLoading, errMess }: RenderCardProps) {
  if (isLoading) {
    return <Loading />;
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

interface HomeProps {
  dish: Item;
  dishesLoading: boolean;
  dishesErrMess: string | null;
  promotion: Item;
  promosLoading: boolean;
  promosErrMess: string | null;
  leader: Item;
  leaderLoading: boolean;
  leaderErrMess: string | null;
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


