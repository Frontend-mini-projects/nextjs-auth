'use client';
import Link from 'next/link';
import React from 'react'

export default function page() {
  return (
    <div className='text-white flex justify-center items-center h-screen '>
      <Link href={'/profile'} className='font-bold text-2xl border border-white px-5 py-3 rounded-xl'>Go to profile</Link>
    </div>
  )
}
