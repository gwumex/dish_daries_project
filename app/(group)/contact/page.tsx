'use client';
import React from 'react';
import Link from 'next/link';
import { Loading } from '../../component/LoadingComponent';
import './Contact.css'; // Make sure this import points to the correct file path
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store'; // Import your RootState
import { postFeedback } from '../../../redux/actions/ActionCreators';

// Validator functions
const required = (val: string) => val && val.length;
const maxLength = (len: number) => (val: string) => !(val) || (val.length <= len);
const minLength = (len: number) => (val: string) => val && (val.length >= len);
const isNumber = (val: string) => !isNaN(Number(val));
const validEmail = (val: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const Contact = () => {
  const dispatch: AppDispatch = useDispatch();
  const leaders = useSelector((state: RootState) => state.leaders);

  const handleSubmit = (values: any) => {
    console.log("Current State is: " + JSON.stringify(values));
    dispatch(postFeedback(values));
  };

  return (
      <div>
        <h3>Send us Your Feedback</h3>
        {/* Feedback form will go here */}
        {/* Don't forget to call handleSubmit when the form is submitted */}
      </div>
  );
};

export default Contact;

