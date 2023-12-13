"use client";
import React, { useRef } from 'react';
import { signUpUser, postDish } from '@/redux/actions/ActionCreators';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '@/app/component/LoadingComponent';

const page = () => {
  const isLoading = useSelector((state: RootState)=> state.dishes.isLoading)
  const dishNameRef = useRef<HTMLInputElement>(null);
  const dishLabelRef = useRef<HTMLInputElement>(null);
  const dishImageRef = useRef<HTMLInputElement>(null);
  const dishCategoryRef = useRef<HTMLSelectElement>(null);
  const dishPriceRef = useRef<HTMLInputElement>(null);
  const dishDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const fileSizeErrorRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  const MAX_SIZE = 600 * 1024; // 600 KB in bytes

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.size > MAX_SIZE) {
      fileSizeErrorRef.current.innerText = "Image size should not exceed 600KB"
      dishImageRef.current.value = '';
    } else {
      if (fileSizeErrorRef.current) {
        fileSizeErrorRef.current.innerText = "";
      }
    }
  };

  const UploadDish = async (event) => {
    event.preventDefault();
    if (dishNameRef.current && dishLabelRef.current && dishImageRef.current && dishCategoryRef.current && dishPriceRef.current && dishDescriptionRef.current) {
      let base64Image = null;

      if (dishImageRef.current.files[0]) {
        base64Image = await toBase64(dishImageRef.current.files[0]);
      }

      dispatch(postDish({
        dishName: dishNameRef.current.value,
        dishLabel: dishLabelRef.current.value,
        dishImage: base64Image,
        dishCategory: dishCategoryRef.current.value,
        dishPrice: dishPriceRef.current.value,
        dishDescription: dishDescriptionRef.current.value
      }));
    }
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


  return (
    <div className="px-6 flex flex-col justify-center items-center ">
      <p className='mb-4 text-lg'>Tell Us Your Favourite Dish Story</p>
      <form onSubmit={UploadDish} className="space-y-4 flex flex-col items-center">
        <label className="form-control w-full max-w-xs">
          {/* name */}
          <div className="label">
            <span className="label-text">Dish Name</span>
          </div>
          <input required type="text" id="dishName" name="dishName" ref={dishNameRef} placeholder="Dish Name" className="input input-bordered w-full max-w-xs" />

        </label>
        {/* image */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Dish Image</span>
          </div>
          <input required type="file" onChange={handleFileChange} id="dishImage" name="dishImage" ref={dishImageRef} placeholder="Dish Image" className="file-input file-input-bordered w-full max-w-xs" />
          <div className="label">
            <span ref={fileSizeErrorRef} className="label-text-alt text-red-500"></span>
          </div>
        </label>
        {/* category */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick the category of dish</span>
          </div>
          <select required className="select select-bordered" id="dishCategory" name="dishLabel" ref={dishCategoryRef}>
            <option disabled selected>Pick one</option>
            <option>Appetizers or Starters</option>
            <option>Main Course</option>
            <option>Side Dishes</option>
            <option>Desserts</option>
            <option>Seasonal or Specials</option>
          </select>
        </label>
        {/* dish label */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Dish Label</span>
          </div>
          <input required type="text" id="dishLabel" name="dishLabel" ref={dishLabelRef} placeholder="Dish Label" className="input input-bordered w-full max-w-xs" />
        </label>
        {/* dish price */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Dish Price</span>
          </div>
          <input type="text" id="dishPrice" name="dishPrice" ref={dishPriceRef} placeholder="Dish Price" className="input input-bordered w-full max-w-xs" />
        </label>
        {/* dish description*/}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Dish Description</span>
          </div>
          <textarea required id="dishDescription" name="dishDescription" ref={dishDescriptionRef} placeholder="Dish Description" className="textarea textarea-bordered h-24 caret-primary"></textarea>
        </label>
        {/* button */}
        <button type="submit" className="btn btn-wide">{isLoading? <Loading/> : "Submit"}</button>
      </form>
    </div>
  )
}

export default page