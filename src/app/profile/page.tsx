'use client';


import React, { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {

  const router = useRouter();
  const [user, setUser] = useState("Nothing");

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
  const getData = async () =>{
    const {data} = await axios.get('/api/users/me');
    console.log(data);
    setUser(data.user)
  }
  return (
    <div>
      <h1 className='text-3xl'>Profile page</h1>


      <Link href={`/profile/${user?._id}`} className='bg-blue-500 p-2 text-black rounded-md m-3'>{user === "Nothing" ? "No data" : user?.username}</Link>


      <button className='bg-white p-2 text-black rounded-md m-3' onClick={handleLogout}>Logout</button>
      <button className='bg-white p-2 text-black rounded-md m-3' onClick={getData}>Get Data</button>


      <Toaster/>
    </div>
  )
}
