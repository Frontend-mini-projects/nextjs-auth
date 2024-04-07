'use client';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {

  const router = useRouter();
  const [user, setUser] = useState({ username: "Nothing", email: "" , isVerified: false});
  const [isSending, setIsSending] = useState(false);

  const handleLogout = async () => {
    const { data } = await axios.get('/api/users/logout');
    if (data.status) {
      toast.success(data.msg);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
    else {
      toast.error(data.msg);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get('/api/users/me');
    console.log(data);
    setUser(data.user)
  }
  const verifyUser = async () =>{
    console.log('cliked verify user')
    try {
      setIsSending(true);
      const {data} = await axios.post('/api/users/verify', {email: user?.email});
      console.log(data)
      if(data.status){
        toast.success(data.msg);
      }
      else{
        toast.error(data.msg);
      }
    } catch (error:any) {
      toast.error(error.message);
      console.log(error);
    }
    finally{
      setIsSending(false);
    }
  }


  return (
    <div className='w-1/2 md:w-1/4 relative top-52 mx-auto border border-white rounded-md text-white p-5'>
      <h1 className='text-3xl text-center'>Profile page</h1>


      <div className=' p-2 rounded-md m-3'>Username : {user?.username === "Nothing" ? "No data" : user?.username} 
        {user?.isVerified ? <span className='text-blue-500 ml-5'> (verified)</span> : <span className='text-red-500 ml-5'>(not verified)</span>}
      </div>
      <div className=' p-2 rounded-md m-3'>Email : {user?.email} </div>


      <div className='flex justify-between'>
        <button className='bg-red-500 p-2  rounded-md m-3' onClick={handleLogout}>Logout</button>
        {!user?.isVerified && <button className='bg-blue-500 p-2  rounded-md m-3' onClick={verifyUser} 
        disabled={isSending} >{isSending ? "Processing":  "Verify email"}</button>}
      </div>


      <Toaster />
    </div>
  )
}
