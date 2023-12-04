import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Loading } from '../../LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '@/redux/actions/ActionCreators';
import { RootState, AppDispatch } from '@/redux/store'; // Import the type for your root state
import { setIsModal } from '@/redux/reducers/other-slice';
import LoginModal from '../../LoginModal';



const Button = () => {
  const other = useSelector((state: RootState) => state.other);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const toggleModal = () => {
    dispatch(setIsModal());
  }


  const handleLogout = () => {
    dispatch(logoutUser());
  };


  return (
    <>
    <div>
    {!auth.isAuthenticated ?
      <button onClick={toggleModal} className='bg-muted-orange hover:bg-charcoal-gray text-white py-2 px-8 rounded'>
        {auth.isLoading ? <Loading/> : "Login"}
      </button>
      :
      <div className="flex items-center flex-col md:flex-row justify-center">
        <p className="mr-3">Username</p>
        <button onClick={handleLogout} className='bg-muted-orange hover:bg-charcoal-gray text-white py-2 px-8 rounded'>
          <span className="fa fa-sign-out fa-lg"></span> 
          {auth.isLoading ? <Loading/> : "Logout"}
        </button>
      </div>
    }
  </div>

    </>
    );
};

export default Button;