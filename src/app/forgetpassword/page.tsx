'use client';
import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


export default function Page() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [issending, setIsSending] = useState(false);

    const handleForgotPassword = async () => {

        setMessage('');
        setError('');
        if (!email) {
            toast.error('Email should not be empty');
            return;
        }

        try {
            setIsSending(true);
            const { data } = await axios.post('/api/users/forgotpassword', { email });
            console.log('data', data);
            if (data.status) {
                toast.success(data.msg);
                setMessage(data.msg);
                setError('');
            }
            else {
                toast.error(data.msg);
                setMessage('');
                setError(data.msg);
            }
        } catch (error: any) {
            console.log('token sending sending error', error);
            toast.error(error.message);
        }
        finally {
            setIsSending(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 shadow-md rounded-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Forgot Password</h1>
                <div className="mb-4">
                    {/* <label htmlFor="email" className="block text-sm font-medium text-white ">
                        Email
                    </label> */}
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter valid email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-500 focus:outline-none rounded-md p-1 w-full bg-gray-900 text-white' />
                </div>
                <button
                    disabled={issending}
                    onClick={handleForgotPassword}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {issending ? "Processing..." : "Reset Password"}
                </button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
                {message && <p className="mt-4 text-green-500">{message}</p>}
            </div>
            <Toaster />
        </div>
    );
}
