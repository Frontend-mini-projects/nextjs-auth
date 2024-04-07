'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

export default function VerifyEmail() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');

    const verifyUserEmail = async () => {
        try {
            const {data} = await axios.post('/api/users/verifyemail', { token });
            if(data.status)
                setVerified(true);
            else    
                setError(data.msg);
        } catch (error: any) {
            setError('Something went wrong');
            console.log(error.reponse.data);
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    },[token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black rounded-md my-3">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-xl font-bold rounded-md bg-green-500 text-black p-2">Email Verified</h2>
                    <Link href="/login" className='block my-2 text-center text-blue-500 font-bold text-lg'>
                        Go to Login
                    </Link>
                </div>
            )}
            {error && (
                <div>   
                    <h2 className="text-xl  rounded-md bg-red-500 text-white p-2">{error}</h2>
                    <Link href="/" className='block my-2 text-center text-blue-500 font-bold text-lg'>
                        Go to Home
                    </Link>
                </div>
            )}
        </div>
    )

}
