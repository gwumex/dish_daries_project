'use client'
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Loading } from './LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../redux/actions/ActionCreators';
import { RootState, AppDispatch } from '../../redux/store'; // Import the type for your root state
import './HeaderComponent.css'


interface AuthProps {
  isAuthenticated: boolean;
  user: { username: string };
  loginUser: (creds: { username: string; password: string }) => void;
  logoutUser: () => void;
  isLoading: boolean;
  auth: boolean
}

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleLogin = (event: React.FormEvent) => {
    toggleModal();
    event.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      dispatch(loginUser({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }));
    }

  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
<div className='flex text-ivory-white p-4 item-center bg-deep-blue justify-center'>
  <nav className="flex">
    <div className="flex items-center">
      <Link href="/" passHref legacyBehavior>
        <a className="flex items-center mr-4">
          <img src="logo.jpeg" alt="Ristorante Con Fusion" className="h-8 w-auto"/>
          <span className="text-xl font-bold hidden md:block">Ristorante Con Fusion</span>
        </a>
      </Link>
      <button className="ml-auto md:ml-6" onClick={toggleNav}>
        <span className="fa fa-bars fa-lg"></span>
      </button>
    </div>
    <div className={`md:flex-grow ${isNavOpen ? 'flex' : 'hidden'} flex-col md:flex-row md:items-center md:block `}>
      <Link href="/" passHref legacyBehavior>
        <a className="py-2 px-4 hover:bg-gray-700 rounded">Home</a>
      </Link>
      <Link href="/about" passHref legacyBehavior>
        <a className="py-2 px-4 hover:bg-gray-700 rounded">About Us</a>
      </Link>
      <Link href="/menu" passHref legacyBehavior>
        <a className="py-2 px-4 hover:bg-gray-700 rounded">Menu</a>
      </Link>
      <Link href="/favourites" passHref legacyBehavior>
        <a className="py-2 px-4 hover:bg-gray-700 rounded">Favourites</a>
      </Link>
      <Link href="/contact" passHref legacyBehavior>
        <a className="py-2 px-4 hover:bg-gray-700 rounded">Contact Us</a>
      </Link>
    </div>
  </nav>
  <div className="">
  <div className="">
    {!auth.isAuthenticated ?
      <button onClick={toggleModal} className='bg-gray-800 hover:bg-red-700 text-white py-2 px-4 rounded'>
        Login user
        {auth.isLoading ? <Loading/> : null}
      </button>
      :
      <div className="flex items-center">
        <div className="mr-3">Username</div>
        <button onClick={handleLogout} className='bg-gray-800 hover:bg-red-700 text-white py-2 px-4 rounded'>
          <span className="fa fa-sign-out fa-lg"></span> Logout
          {auth.isLoading ? <Loading/> : null}
        </button>
      </div>
    }
  </div>
  {isModalOpen && (
    <div className="modal">
      <div className="modal-content">
      <form onSubmit={handleLogin}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" ref={usernameRef} />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" ref={passwordRef} />
              <button type="submit">Login</button>
            </form>
      </div>
    </div>)}
      </div>
</div>
  );
};

export default Header;
