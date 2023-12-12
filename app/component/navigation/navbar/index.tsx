import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from './Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const desktopDropdownRef  = useRef(null);
  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  // Toggle dropdown
  const toggleDesktopDropdown  = () => {
    setDesktopDropdownOpen(!desktopDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }

    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, desktopDropdownRef]);

  // Close dropdown when a link is clicked
  const closeDropdown = () => {
    console.log("ooooo");
    setDropdownOpen(false);
    setDesktopDropdownOpen(false);

  };

  return (
    <div className="navbar bg-base-200 fixed top-0 z-50 border-b-2 border-secondary">
      <div className="navbar-start">
        <div className="dropdown border-tl-none" ref={dropdownRef}>
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden" onClick={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-60 gap-y-4 ${dropdownOpen ? 'block' : 'hidden'}`}>
          <li onClick={closeDropdown} >
              <Link href="/menu">
                <p className='text-lg'>Dishes Menu</p>
              </Link>
            </li>
            <li onClick={closeDropdown}>
              <Link href="/upload">
                <p className='text-lg'>Share A Dish</p>
              </Link>
            </li>
            <li>
              <details>
                <summary className='text-xl text-secondary opacity-80'>Others</summary>
                <ul className="p-2">
                  <li onClick={closeDropdown}>
                    <Link href="/about">
                      <p className='text-lg'>About</p>
                    </Link>
                  </li>
                  <li onClick={closeDropdown}>
                    <Link href="/contact">
                      <p className='text-lg'>Contact</p>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>{auth && (
              <li onClick={closeDropdown}>
                <Link href="/favourites">
                  <p className='text-lg'>Favourites</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">Dish Daries</Link>
      </div>
      <div className="navbar-center hidden md:flex" ref={desktopDropdownRef}>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/menu" >
              <p >Dishes Menu</p>
            </Link>
          </li>
          <li>
            <Link href="/upload" >
              <p >Share A Dish</p>
            </Link>
          </li>
            <li onClick={closeDropdown}>
                  <Link href="/about" >
                    <p >About</p>
                  </Link>
                </li>
                <li onClick={closeDropdown}>
                  <Link href="/contact" >
                    <p >Contact</p>
                  </Link>
            </li>

          {auth && (
            <li>
              <Link href="/favourites">
                Favourites
              </Link>
            </li >
          )}
        </ul>
      </div>
      <div className="navbar-end flex gap-x-3">
        {auth && (
          <Link href="/profile">

            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar  md:hidden">
              <div className="w-10 rounded-full">
                <img alt="Profile" src="avatar.png" />
              </div>
            </div>
          </Link>

        )}
        <Button />
      </div>      
    </div>
  );
};

export default Navbar;