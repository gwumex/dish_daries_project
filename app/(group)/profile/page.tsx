'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { User } from '../../type'
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
        <div className="flex flex-col items-center">
          <div className="mb-10 ">
            {user && (
            <div className='flex flex-col gap-y-5 items-center text-left'>
              <Image src="/avatar.png" width={150} height={150} alt='profile avatar' className='rounded-full' />
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Username:</strong> {user.username}</p>

            </div>
            )} 
          </div>
          <div className="flex space-x-4 mb-4">
            <Link href="/favourites" className="btn font-bold py-2 px-4 rounded">
              Favourite Dishes
            </Link>
            <button onClick={handleLogout} className="btn btn-error font-bold py-2 px-4 rounded">
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
      )}
    </>
  )
}

export default page