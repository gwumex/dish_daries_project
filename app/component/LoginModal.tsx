"use client"
import React, { useState, useRef } from 'react';
import { loginUser, logoutUser } from '@/redux/actions/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store'
import { setIsModal } from '@/redux/reducers/other-slice';


const LoginModal = () => {
    const other = useSelector((state: RootState) => state.other);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch: AppDispatch = useDispatch();
    
  const toggleModal = () => {
    dispatch(setIsModal());
  }

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        if (usernameRef.current && passwordRef.current) {
            dispatch(loginUser({
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            }));
            dispatch(setIsModal());
        }
    
      };
  return (
<div className={`fixed inset-0 bg-deep-blue bg-opacity-50 z-50 ${other.isModalOpen ? 'flex' : 'hidden'}`} onClick={toggleModal}>
  <div className='relative p-4 w-full max-w-md m-auto flex-col flex bg-white rounded-lg shadow-lg' onClick={(e) => e.stopPropagation()}>
    <div className='flex justify-between items-center border-b pb-3'>
      <h2 className="text-xl font-bold text-gray-700">Login</h2>
      <button className='text-gray-600 text-xl font-semibold' onClick={toggleModal}>
        X
      </button>
    </div>
    <div className="p-6 flex flex-col justify-center">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className='flex flex-col'>
          <label htmlFor="username" className="text-md font-semibold text-gray-600">Username</label>
          <input type="text" id="username" name="username" ref={usernameRef} 
                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-muted-orange"/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password" className="text-md font-semibold text-gray-600">Password</label>
          <input type="password" id="password" name="password" ref={passwordRef}
                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-muted-orange"/>
        </div>
        <button type="submit" className="w-full mt-4 bg-muted-orange text-white py-2 rounded-md hover:bg-deep-blue transition-colors duration-200">Login</button>
      </form>
    </div>
  </div>
</div>

  )
}

export default LoginModal