'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store'; // Import the type for your root state
import { baseUrl } from '../../../shared/baseUrl';
import { Loading } from '../../component/LoadingComponent';
// Define the types for the leader's properties
import { RenderLeaderProps, LeaderListProps } from '../../type';
import Link from 'next/link';

const RenderLeader: React.FC<RenderLeaderProps> = ({ leader }) => {
  return (
    <div className="flex md:flex-row ">
      <div className='mask mask-hexagon-2' >
        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={leader.name} className='object-contain'/></figure>
      </div>
      <div className="px-4 ">
        <h2 className="card-title">{leader.name}</h2>
        <p>{leader.designation}</p>
        <p className='text-sm'>{leader.description}</p>
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
    <div className="list-unstyled flex gap-10 flex-col items-center">
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
    <div className=''>
      <LeaderList
        leaders={leaders.leaders}
        isLoading={leaders.isLoading}
        errMess={leaders.errMess}
      />
    </div>
  );
};

export default About;
