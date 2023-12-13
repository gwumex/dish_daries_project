import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Loading } from '../../LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '@/redux/actions/ActionCreators';
import { RootState, AppDispatch } from '@/redux/store'; // Import the type for your root state
import { setLoginModal } from '@/redux/reducers/other-slice';
import LoginModal from '../../LoginModal';



const Button = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const toggleModal = () => {
    dispatch(setLoginModal());
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div>
        {!auth.isAuthenticated ?
          <button onClick={toggleModal} className='btn py-2 px-8 rounded btn-primary'>
            {auth.isLoading ? <Loading /> : "Login"}
          </button>
          :
          <div className="flex items-center flex-col md:flex-row justify-center ">
            <button className="md:mr-6 hidden md:block ">
              <Link href="/profile">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary rounded-full border-opacity-10 p-0">
                  <div className="w-10 rounded-full">
                    <img alt="Profile" src="avatar.png" />
                  </div>
                </div>
              </Link>
            </button>
            <button onClick={handleLogout} className='btn btn-active btn-primary py-2 px-8 rounded hidden md:block'>
              {auth.isLoading ? <Loading /> : "Logout"}
            </button>
          </div>
        }
      </div>

    </>
  );
};

export default Button;
