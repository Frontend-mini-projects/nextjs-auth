'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import LoadingIcon from '../../../public/loading.svg';
import Image from 'next/image';

export default function SignupPage() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  useEffect(()=>{

    if(!(!user.username || !user.email || !user.password || !user.confirmPassword)){
      setIsDisable(false);
    }
    else{
      setIsDisable(true);
    }

  }, [user]);

  const validation = () =>{
    if(!user.username){
      toast.error("Username should not be empty");
      return false;
    }
    else if(!user.email){
      toast.error("Email should not be empty");
      return false;
    }
    else if(!user.password){
      toast.error("Password should not be empty");
      return false;
    }
    else if( user.password !== user.confirmPassword){
      toast.error("Password mismatch");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log('handel submit clicked');
    console.log(user);
    const isValid = validation();
    if(isValid){
      setIsLoading(true);
      const {data} = await axios.post('/api/users/signup', user);
      console.log('backend data received', data);
      if(data.status){
        toast.success(data.msg);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
      else{
        toast.error(data.msg);
      }
      setIsLoading(false);
    }

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
          <button type='submit' className={`flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'py-0' : 'py-2'}` } disabled={isDisable}>{isDisable? "Fill the form fields first" :
           `SignUp`} {isLoading ? <Image src={LoadingIcon} alt="Loading" className=' w-12 h-10' width={30} height={10} /> : ''}  </button>
        </div>

        {/* Link to Login page */}
        <div className='w-fulltext-center'>
          <Link href={'/login'} className= ' text-blue-400'>Already Registered? Login</Link>
        </div>
      </form>
      <Toaster />

    </div>
  )
}
