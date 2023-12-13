'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setToast } from '@/redux/reducers/other-slice'
import { RootState, AppDispatch } from '@/redux/store'

const Toast = () => {
const dispatch: AppDispatch = useDispatch()
const isToastOpen = useSelector((state: RootState) => state.other.toastIsOpen)
const toastMessage = useSelector((state: RootState) => state.other.toastMessage)

useEffect(() => {

  setTimeout(()=> {
    dispatch(setToast())

  }, 4000)

}, [toastMessage])


    const handleCick = () => {
        dispatch(setToast())
    }

  return (
    <>
    {isToastOpen && toastMessage &&(
    <div className="toast toast-center opacity-90">
  <div className="alert alert-success bg-secondary flex ">
    <span className='text-white'>{toastMessage}</span>
    <button className='btn p-2 text-sm'onClick={handleCick}>Close</button>
  </div>
    </div>
    )}
    </>
  )
}

export default Toast