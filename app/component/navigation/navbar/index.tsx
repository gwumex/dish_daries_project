import React from "react";
import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated); // Access login error from Redux store

  return (
    <div className="navbar bg-base-200 fixed top-0 z-50 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="/menu">
                <p >Dishes Menu</p>
              </Link>
            </li>
            <li>
              <Link href="/upload">
                <p >Share A Dish</p>
              </Link>
            </li>
            <li>
              <details>
                <summary>Others</summary>
                <ul className="p-2">
                  <li>
                    <Link href="/about">
                      <p >About</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <p >Contact</p>
                    </Link>
                  </li>
                </ul>
              </details>
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
        <Link href="/" className="btn btn-ghost text-xl">Dish Daries</Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/menu">
              <p >Dishes Menu</p>
            </Link>
          </li>
          <li>
            <Link href="/upload">
              <p >Share A Dish</p>
            </Link>
          </li>
          <li>
            <details>
              <summary>Others</summary>
              <ul className="p-2">
                <li>
                  <Link href="/about">
                    <p >About</p>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <p >Contact</p>
                  </Link>
                </li>
              </ul>
            </details>
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
  )
}

export default Navbar
