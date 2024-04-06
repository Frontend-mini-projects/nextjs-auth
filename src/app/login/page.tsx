'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';





export default function LoginPage() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const verifyData = ()=>{
    if(!user.email){
      toast.error('Email is required');
      return false;
    }
    else if(!user.password){
      toast.error('Password is required');
      return false;
    }
    return true;
  }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handle submit clicked', user);
    const verify = verifyData();
    if(!verify){
      return;
    }
    
    try{
      setIsLoading(true);
      const {data} = await axios.post('/api/users/login', user);
      console.log('response', data);
      if(data.status){
        toast.success(data.msg);
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      }
      else if(data.status == false){
        toast.error(data.msg);
      }

    }
    catch(err){
      console.log('error', err);
      toast.error(err.message);
    }
    finally{
      setIsLoading(false);
    }

  };

  return (
    <div className='bg-black text-white min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='max-w-md w-full'>
        <h1 className='text-3xl font-bold mb-6'>Login</h1>
        
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
          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' disabled={isLoading}>{isLoading? "Processing": "Login"}</button>
        </div>

        {/* Link to Signup page */}
        <div>
          <Link href={'/signup'} className='text-blue-400'>Not Registered? SignUp</Link>
        </div>
      </form>
      <Toaster/>
    </div>
  )
}

