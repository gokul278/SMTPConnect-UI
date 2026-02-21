
import { Send, } from 'lucide-react';
import React from 'react';

interface ConfigurationPageProps {

}

const SendMailPage: React.FC<ConfigurationPageProps> = () => {


    return (
        <div className='h-full'>
            <div className='h-[10vh] flex justify-between items-end lg:items-center'>
                <div className='font-bold text-black text-lg md:text-2xl'>
                    Send Mail <Send width={30} height={30} className='inline-block mb-1 ml-2' />
                </div>
            </div>
            <div className='h-[90vh] pb-20 lg:pb-10  overflow-auto'>
                dfdf
            </div>
        </div>
    );
};

export default SendMailPage;