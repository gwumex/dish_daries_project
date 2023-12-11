import React from 'react';
import './LoadingStyles.css';

export const Loading = () => {
    return(
        <div className="loading-container">
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    );
};

export const DishesSkeletonLoading = () => {
    return (
      <div className="flex flex-col gap-4 min-w-200">
      <div className="skeleton h-60 w-full"></div>
      <div className="skeleton h-4 w-44"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
    )
  }
  
    
