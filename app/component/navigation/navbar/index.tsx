import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './index.css'
import Button from './Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { usePathname, useSearchParams } from 'next/navigation'


const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const desktopDropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  // Toggle dropdown
  const toggleDesktopDropdown = () => {
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
    setDropdownOpen(false);
    setDesktopDropdownOpen(false);

  };

  return (
    <div className="navbar bg-base-200 fixed top-0 z-50 border-b-2 border-secondary border-opacity-60">
      <div className="navbar-start">

        <Link href="/" className="btn btn-ghost text-xl">Dish Diaries</Link>
      </div>
      <Link href="/upload" className={` ${pathname === "/upload" || !auth ? "hidden": "block"} animate-ping md:hidden text-center text-secondary`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>

      </Link>
      <div className="navbar-center hidden md:flex" ref={desktopDropdownRef}>
        <ul className="menu menu-horizontal p-1">
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

            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar  md:hidden ">
              <div className="w-10 rounded-full">
                <img alt="Profile" src="avatar.png" className='border-2 border-primary rounded-full border-opacity-20 p-0' />
              </div>
            </div>
          </Link>

        )}
        <Button />
        <div className="dropdown border-tl-none" ref={dropdownRef}>
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden" onClick={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-60 gap-y-4 right-0 ${dropdownOpen ? 'block' : 'hidden'}`}>
            <li onClick={closeDropdown} >
              <Link href="/menu">
                <p className='text-lg'>Dishes Menu</p>
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
              <li onClick={closeDropdown} className=''>
                <Link href="/favourites">
                  <p className='text-lg'> 
                    Favourites
                  </p>
                  <span><svg xmlns="http://www.w3.org/2000/svg" fill="#EB3324" viewBox="0 0 24 24" stroke-width="1.5" stroke="#EB3324" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg></span>
                </Link>
              </li>
            )}
            <li onClick={closeDropdown}>
              <Link href="/profile">
                <p className='text-lg'>Profile</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;