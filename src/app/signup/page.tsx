'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log('handel submit clicked');
    console.log(user);
  }
  return (
    <div className='bg-black text-white min-h-screen flex items-center justify-center p-2'>
      <form onSubmit={handleSubmit} className='max-w-md w-full'>
        <h1 className='text-3xl font-bold mb-6'>Signup</h1>
        
        {/* Username input */}
        <div className='mb-4'>
          <label htmlFor="username" className='block mb-1'>Username</label>
          <input type="text" id='username'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder='username'
            className='border border-gray-500 focus:outline-none rounded-md p-1 w-full bg-gray-900 text-white' />
        </div>

        {/* Email input */}
        <div className='mb-4'>
          <label htmlFor="email" className='block mb-1'>Email</label>
          <input type="email" id='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder='email'
            className='border border-gray-500 focus:outline-none rounded-md p-1 w-full bg-gray-900 text-white' />
        </div>

        {/* Password input */}
        <div className='mb-4'>
          <label htmlFor="password" className='block mb-1'>Password</label>
          <input type="password" id='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder='password'
            className='border border-gray-500 focus:outline-none rounded-md p-1 w-full bg-gray-900 text-white' />
        </div>

        {/* Confirm Password input */}
        <div className='mb-6'>
          <label htmlFor="confirmPassword" className='block mb-1'>Confirm Password</label>
          <input type="password" id='confirmPassword'
            value={user.confirmPassword}
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            placeholder='confirmPassword'
            className='border border-gray-500 focus:outline-none rounded-md p-1 w-full bg-gray-900 text-white' />
        </div>

        {/* Submit button */}
        <div className='mb-6'>
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Signup</button>
        </div>

        {/* Link to Login page */}
        <div className='w-fulltext-center'>
          <Link href={'/login'} className= ' text-blue-400'>Already Registered? Login</Link>
        </div>
      </form>
    </div>
  )
}
