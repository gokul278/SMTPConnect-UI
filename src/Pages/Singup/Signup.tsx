import Button from '@/Components/Button/Button';
import TextInput from '@/Components/Inputs/TextInput';
import React from 'react';
import { useNavigate } from 'react-router';

interface SigninProps {

}

const Signup: React.FC<SigninProps> = () => {

    const navigate = useNavigate();

    return (
        <div className='w-full h-screen  bg-[linear-gradient(-180deg,#BCC5CE_0%,#929EAD_98%),radial-gradient(at_top_left,rgba(255,255,255,0.30)_0%,rgba(0,0,0,0.30)_100%)]
  bg-blend-screen flex justify-center items-center'>
            <div className='w-18/20 sm:w-14/20 md:w-10/20 lg:w-7/20 py-10 bg-white shadow-2xl rounded-2xl p-5'>
                <div className='px-5 sm:px-8'>
                    <div className='text-lg sm:text-2xl px-1 sm:px-4'>
                        <span className='font-black text-[#a2a2a2]'>SMTP</span> Connect
                    </div>
                    <div className='px-1 sm:px-4 mt-6'>
                        <TextInput id='name' type='text' label='Name' />
                    </div>
                    <div className='px-1 sm:px-4 mt-6'>
                        <TextInput id='email' type='email' label='Email' />
                    </div>
                    <div className='px-1 sm:px-4 mt-4'>
                        <TextInput id='password' type='password' label='Password' />
                    </div>
                    <div className='px-1 sm:px-4 mt-4'>
                        <TextInput id='confirmPassword' type='password' label='Confirm Password' />
                    </div>
                    <div className='px-1 sm:px-4 mt-6'>
                        <Button className='w-10/10' label="Sign Up" />
                    </div>
                    <div className='px-1 text-sm font-semibold sm:px-4 mt-6'>
                        Already have an account? <span onClick={() => {
                            navigate("/signin")
                        }} className='text-[#04387a] cursor-pointer'>Sign In</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;