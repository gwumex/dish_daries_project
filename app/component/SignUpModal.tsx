"use client"
import React, { useRef } from 'react';
import { signUpUser,  } from '@/redux/actions/ActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store'
import { setSignUpModal, setLoginModal } from '@/redux/reducers/other-slice';


const SignUpModal = () => {
    const loginError = useSelector((state: RootState) => state.auth.errMess); // Access login error from Redux store
    const other = useSelector((state: RootState) => state.other);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const dispatch: AppDispatch = useDispatch();
    
  const toggleModal = () => {
    dispatch(setSignUpModal());
  }
  const toggleLogin = () => {
    dispatch(setSignUpModal());
    dispatch(setLoginModal());
  }

    const handleSignUp = (event: React.FormEvent) => {
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
<div className={`fixed inset-0 bg-deep-blue bg-opacity-50 z-50 ${other.isSignUpModalOpen? 'flex' : 'hidden'}`} onClick={toggleModal}>
  <div className='relative p-4 w-full max-w-md m-auto flex-col flex bg-white rounded-lg shadow-lg' onClick={(e) => e.stopPropagation()}>
    <div className='flex justify-between items-center border-b p-6 pb-3'>
      <h2 className="text-xl font-bold text-gray-700">Register</h2>
      <button className='text-gray-600 text-xl font-semibold' onClick={toggleModal}>
        X
      </button>
    </div>
    <div className="p-6 flex flex-col justify-center">
      
      <form onSubmit={handleSignUp} className="space-y-4">
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
      {loginError && (
            <div className="text-red-500 p-2 text-center">
              {loginError} {/* Display login error */}
            </div>
          )}
      <div className='pt-4'>
            <span >
            Have an Account?
            </span>
            <u>
              <b>
                <em className='hover:text-muted-orange'><button onClick={toggleLogin} className='ml-2'>Login</button>
                </em>
              </b>
            </u>

          </div>
    </div>
  </div>
</div>

  )
}

export default SignUpModal