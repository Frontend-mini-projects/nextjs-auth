'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import axios from 'axios';



export default function LoginPage() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log('handle submit clicked');
    console.log(user);
  }

  // JSX structure for the LoginPage component
  return (
    <div className='bg-black text-white min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='max-w-md w-full'>
        <h1 className='text-3xl font-bold mb-6'>Login</h1>
        
        {/* Username input */}
        <div className='mb-4'>
          <label htmlFor="username" className='block mb-1'>Username</label>
          <input type="text" id='username'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder='username'
            className='border border-gray-500 focus:outline-none rounded-md p-1 w-full bg-gray-900 text-white' />
        </div>

        {/* Password input */}
        <div className='mb-6'>
          <label htmlFor="password" className='block mb-1'>Password</label>
          <input type="password" id='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder='password'
            className='border border-gray-500 focus:outline-none rounded-md p-1 w-full bg-gray-900 text-white' />
        </div>

        {/* Submit button */}
        <div className='mb-6'>
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Login</button>
        </div>

        {/* Link to Signup page */}
        <div>
          <Link href={'/signup'} className='text-blue-400'>Not Registered? SignUp</Link>
        </div>
      </form>
    </div>
  )
}
