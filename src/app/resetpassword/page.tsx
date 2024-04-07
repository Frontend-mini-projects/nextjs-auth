'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page() {

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const tokenUrl = window.location.search.split('=')[1];
        console.log('token url', tokenUrl);
        setToken(tokenUrl);

    }, []);

    const handleResetPassword = async () => {

        if (password !== confirmPassword) {
            toast.error("Password mismatch");
            return;
        }

        try {
            setIsUpdating(true);
            const {data} = await axios.post('/api/users/resetpassword', { token, password });
            console.log('data', data);
            if(data.status){
                toast.success(data.msg);
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            }
            else{
                toast.error(data.msg);
                setMessage(data.msg);
            }
        } catch (error: any) {
            console.log(error.response.data.error);
        }
        finally{
            setIsUpdating(false);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 shadow-md rounded-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-500 focus:outline-none rounded-md p-1 w-full bg-gray-900 text-white' />

                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='border border-gray-500 focus:outline-none rounded-md p-1 w-full bg-gray-900 text-white' />

                </div>
                <button
                    disabled={isUpdating}
                    onClick={handleResetPassword}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    { isUpdating ? "Updating..." : "Reset Password"}
                </button>
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </div>
            <Toaster />
        </div>
    );
}
