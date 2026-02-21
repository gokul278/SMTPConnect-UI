import Button from '@/Components/Button/Button';
import TextInput from '@/Components/Inputs/TextInput';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SigninProps {

}

const Signin: React.FC<SigninProps> = () => {

    const navigate = useNavigate();

    return (
        <div className='w-full h-screen  bg-[linear-gradient(-180deg,#BCC5CE_0%,#929EAD_98%),radial-gradient(at_top_left,rgba(255,255,255,0.30)_0%,rgba(0,0,0,0.30)_100%)] bg-blend-screen flex justify-center items-center'>
            <div className='w-18/20 sm:w-14/20 md:w-10/20 lg:w-7/20 py-10 bg-white shadow-2xl rounded-2xl p-5'>
                <div className='px-5 sm:px-8'>
                    <div className='text-lg sm:text-2xl px-1 sm:px-4'>
                        <span className='font-black text-[#a2a2a2]'>SMTP</span> Connect
                    </div>
                    <div className='px-1 sm:px-4 mt-6'>
                        <TextInput id='username' type='email' label='Username' required />
                    </div>
                    <div className='px-1 sm:px-4 mt-4'>
                        <TextInput id='password' type='password' label='Password' required />
                    </div>
                    <div className='px-1 text-end cursor-pointer text-sm font-semibold sm:px-4 mt-4'>
                        Forgot Password ?
                    </div>
                    <div className='px-1 sm:px-4 mt-6'>
                        <Button onClick={() => {
                            navigate("/user/dashboard")
                        }} className='w-10/10' label="Sign In" />
                    </div>
                    <div className='px-1 text-sm font-semibold sm:px-4 mt-6'>
                        Don't have an account? <span className='text-[#04387a] cursor-pointer' onClick={() => {
                            navigate("/signup");
                        }} >Sign Up</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;