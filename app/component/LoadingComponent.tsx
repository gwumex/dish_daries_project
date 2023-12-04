import React from 'react';
import './LoadingStyles.css';

export const Loading = () => {
    return(
        <div className="loading-container">
            <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
            </svg>
        </div>
    );
};
