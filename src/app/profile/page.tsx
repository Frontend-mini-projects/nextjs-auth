'use client';


import React from 'react'
import axios from 'axios';

import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {

  const router = useRouter();


  const handleLogout = async () =>{
    const {data} = await axios.get('/api/users/logout');
    if(data.status){
      toast.success(data.msg);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
    else{
      toast.error(data.msg);
    }
  }
  return (
    <div>
      <h1 className='text-3xl'>Profile page</h1>

      <button onClick={handleLogout}>Logout</button>
      <Toaster/>
    </div>
  )
}
