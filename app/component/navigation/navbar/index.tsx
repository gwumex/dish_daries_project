import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const linkStyle = "hover:text-muted-orange md:text-lg"

const Navbar = ({ toggle }: { toggle: () => void }) => {
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated); // Access login error from Redux store

  return (
    <>
      <div className="w-full h-20 fixed bg-deep-blue top-0 text-ivory-white z-50 p">
        <div className="mx-auto px-6 h-full">
          <div className="flex justify-between items-center h-full">
          <Link href="/" passHref legacyBehavior>
        <a className="flex items-center mr-4 justify-between">
          <Image src="/logo.jpeg" 
          alt="Dish Daries" 
          className="w-auto mr-3 rounded-full"
          width={45}
          height={45}/>
          <span className="text-xl font-bold hidden md:block">DISH DARIES</span>
        </a>
          </Link>
            <button
              type="button"
              className="inline-flex items-center md:hidden"
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
            <ul className="hidden md:flex gap-x-6">
              <li>
                <Link href="/about">
                  <p className={linkStyle}>About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/menu">
                  <p className={linkStyle}>Menu</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className={linkStyle}>Contacts</p>
                </Link>
              </li>
              {auth && (
        <li className={linkStyle}>
        <Link href="/favourites">
            Favourites
        </Link>
        </li >
    )}
            </ul>
            <div className="hidden md:block">
              <Button />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
