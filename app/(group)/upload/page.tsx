"use client";
import React, { useRef } from 'react';
import { signUpUser } from '@/redux/actions/ActionCreators';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';

const page = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const dispatch: AppDispatch = useDispatch();


    const UploadDish = (event: React.FormEvent) => {
    event.preventDefault();
    if (usernameRef.current && passwordRef.current) {
        dispatch(signUpUser({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value
        }));
        // dispatch(setIsModal());
    }

    };

  return (
        <div className="p-6 flex flex-col justify-center">
          <form onSubmit={UploadDish} className="space-y-4">
        <div className='flex flex-col'>
          <label htmlFor="username" className="text-md font-semibold text-gray-600">Username</label>
          <input type="text" id="username" name="username" ref={usernameRef} 
                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-muted-orange"/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="firstName" className="text-md font-semibold text-gray-600">FirstName</label>
          <input type="text" id="firstName" name="firstName" ref={firstNameRef} 
                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-muted-orange"/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="lastName" className="text-md font-semibold text-gray-600">LastName</label>
          <input type="text" id="lastName" name="lastName" ref={lastNameRef} 
                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-muted-orange"/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password" className="text-md font-semibold text-gray-600">Password</label>
          <input type="password" id="password" name="password" ref={passwordRef}
                 className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-muted-orange"/>
        </div>
        <button type="submit" className="w-full mt-4 bg-muted-orange text-white py-2 rounded-md hover:bg-deep-blue transition-colors duration-200">Register</button>
      </form>
    </div>
  )
}

export default page