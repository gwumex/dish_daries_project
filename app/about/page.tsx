'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store'; // Import the type for your root state
import './About.css';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from '../component/LoadingComponent';
// Define the types for the leader's properties
interface Leader {
  _id: string;
  name: string;
  image: string;
  designation: string;
  description: string;
}

// Define the props for the RenderLeader component
interface RenderLeaderProps {
  leader: Leader;
}

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

// Define the props for the LeaderList component
interface LeaderListProps {
  leaders: Leader[];
  isLoading: boolean;
  errMess: string | null;
}

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
interface AboutProps {
  leaders: {
    isLoading: boolean;
    errMess: string | null;
    leaders: Leader[];
  };
}

const About = () => {
  const leaders = useSelector((state: RootState) => state.leaders);

  return (
    <div className="about-container">
      {/* Breadcrumb and Page Heading */}
      <div className="row">
        <div className="col-12">
          <h3 className="about-heading">About Us</h3>
          <hr />
        </div>
      </div>

      {/* Our History Section */}
      <div className="row about-row-content">
        {/* ... */}
      </div>

      {/* Leadership Section */}
      <div className="row about-row-content">
        <div className="col-12">
          <h2 className="about-heading">Corporate Leadership</h2>
        </div>
        <LeaderList
          leaders={leaders.leaders}
          isLoading={leaders.isLoading}
          errMess={leaders.errMess}
        />
      </div>
    </div>
  );
};

export default About;
