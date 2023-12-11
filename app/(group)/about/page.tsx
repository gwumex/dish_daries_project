'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'; // Import the type for your root state
import './About.css';
import { baseUrl } from '../../../shared/baseUrl';
import { Loading } from '../../component/LoadingComponent';
// Define the types for the leader's properties
import {RenderLeaderProps, LeaderListProps } from '../../type';
import Link from 'next/link';

const RenderLeader: React.FC<RenderLeaderProps> = ({leader}) => {
  return (
    <div className="media mb-5">
      <img className="mr-3" src={baseUrl + leader.image} alt={leader.name} />
      <div className="media-body">
        <h5 className="mt-0">{leader.name}</h5>
        <p>{leader.designation}</p>
        <p>{leader.description}</p>
      </div>
    </div>
  );
};

const LeaderList: React.FC<LeaderListProps> = ({ leaders, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  }
  if (errMess) {
    return <h4>{errMess}</h4>;
  }
  return (
    <div className="list-unstyled">
      {leaders.map((leader) => (
        <RenderLeader leader={leader} key={leader._id} />
      ))}
    </div>
  );
};

// Define the props for the About component


const About = () => {
  const leaders = useSelector((state: RootState) => state.leaders);

  return (
        <div>    
        <LeaderList
          leaders={leaders.leaders}
          isLoading={leaders.isLoading}
          errMess={leaders.errMess}
        />
      </div>
  );
};

export default About;
