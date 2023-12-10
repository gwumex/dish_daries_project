'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { User } from '../type'
import { AppDispatch, RootState } from '@/redux/store'
import Link from 'next/link'
import { logoutUser } from '@/redux/actions/ActionCreators'

const page = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const user: User = useSelector((state: RootState) => state.auth.user)
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated)

  useEffect(() => {
    if (!auth) {
      router.push('/');
    }
  }, [auth, router]);

  return (
    <>
    {auth && (
      <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <h1 className="text-xl font-bold mb-2">Profile</h1>
          {user && (
            <>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Username:</strong> {user._id}</p>
            </>
          )}

        </div>
        <div className="flex space-x-4 mb-4">
          <Link href="/favourites" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Favourite Dishes
          </Link>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Recent Comments</h2>
          <ul className="list-disc pl-5">
            {/* {recentComments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))} */}
          </ul>
        </div>
      </div>
    </div>

    )}
    </>
  )
}

export default page