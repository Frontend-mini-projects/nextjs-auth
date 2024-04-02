
import React from 'react'

export default function userProfile({params}: any) {
  return (
    <div>
        <h1 className='text-2xl'>user id <span className='bg-blue-500 text-white-500 p-2 m-2'>{params.userid}</span></h1>
    </div>
  )
}
