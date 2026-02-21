import AppAccordion from '@/Components/AppAccordion/AppAccordion';
import AppSidebar from '@/Components/AppSidebar/AppSidebar';
import Button from '@/Components/Button/Button';
import SelectInput from '@/Components/Inputs/SelectInput';
import TextInput from '@/Components/Inputs/TextInput';
import PasswordFields from '@/Components/Passwords/PasswordFields';
import { MailType } from '@/Interface/CommonInterface/CommonInterface';
import { Check, Cog, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

interface ConfigurationPageProps {

}

const ConfigurationPage: React.FC<ConfigurationPageProps> = () => {
  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const items = [
    {
      header: <div className="flex items-center gap-2 font-semibold">Header I <Check width={16} height={16} className="text-green-500" /></div>,
      content: <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-4 flex-wrap'>
          <p><b>Mail Type: </b>Gmail</p>
          <p><b>Mail ID: </b>gokulhk278@gmail.com</p>
          <p className='flex gap-2'><b>Password: </b><PasswordFields password="vmjn gxya uxph eplp" /></p>
          <p><b>Mail Connection: </b>smtp.gmail.com</p>
          <p><b>Mail Port: </b>587</p>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => {
            setEditOpen(true)
          }} label={"Verify or Edit"} variant='outline' className='mt-5' />
        </div>
      </div>,
    },
    {
      header: <div className="flex items-center gap-2 font-semibold">Header II <X width={16} height={16} className="text-red-500" /></div>,
      content: <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-4 flex-wrap'>
          <p><b>Mail Type: </b>Gmail</p>
          <p><b>Mail ID: </b>gokulhk278@gmail.com</p>
          <p className='flex gap-2'><b>Password: </b><PasswordFields password="vmjn gxya uxph eplp" /></p>
          <p><b>Mail Connection: </b>smtp.gmail.com</p>
          <p><b>Mail Port: </b>587</p>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => {
            setEditOpen(true)
          }} label={"Verify or Edit"} variant='outline' className='mt-5' />
        </div>
      </div>,
    },
    {
      header: <div className="flex items-center gap-2 font-semibold">Header III <X width={16} height={16} className="text-red-500" /></div>,
      content: <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-4 flex-wrap'>
          <p><b>Mail Type: </b>Gmail</p>
          <p><b>Mail ID: </b>gokulhk278@gmail.com</p>
          <p className='flex gap-2'><b>Password: </b><PasswordFields password="vmjn gxya uxph eplp" /></p>
          <p><b>Mail Connection: </b>smtp.gmail.com</p>
          <p><b>Mail Port: </b>587</p>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => {
            setEditOpen(true)
          }} label={"Verify or Edit"} variant='outline' className='mt-5' />
        </div>
      </div>,
    },
    {
      header: <div className="flex items-center gap-2 font-semibold">Header I <Check width={16} height={16} className="text-green-500" /></div>,
      content: <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-4 flex-wrap'>
          <p><b>Mail Type: </b>Gmail</p>
          <p><b>Mail ID: </b>gokulhk278@gmail.com</p>
          <p className='flex gap-2'><b>Password: </b><PasswordFields password="vmjn gxya uxph eplp" /></p>
          <p><b>Mail Connection: </b>smtp.gmail.com</p>
          <p><b>Mail Port: </b>587</p>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => {
            setEditOpen(true)
          }} label={"Verify or Edit"} variant='outline' className='mt-5' />
        </div>
      </div>,
    },
    {
      header: <div className="flex items-center gap-2 font-semibold">Header II <X width={16} height={16} className="text-red-500" /></div>,
      content: <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-4 flex-wrap'>
          <p><b>Mail Type: </b>Gmail</p>
          <p><b>Mail ID: </b>gokulhk278@gmail.com</p>
          <p className='flex gap-2'><b>Password: </b><PasswordFields password="vmjn gxya uxph eplp" /></p>
          <p><b>Mail Connection: </b>smtp.gmail.com</p>
          <p><b>Mail Port: </b>587</p>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => {
            setEditOpen(true)
          }} label={"Verify or Edit"} variant='outline' className='mt-5' />
        </div>
      </div>,
    },
    {
      header: <div className="flex items-center gap-2 font-semibold">Header III <X width={16} height={16} className="text-red-500" /></div>,
      content: <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-4 flex-wrap'>
          <p><b>Mail Type: </b>Gmail</p>
          <p><b>Mail ID: </b>gokulhk278@gmail.com</p>
          <p className='flex gap-2'><b>Password: </b><PasswordFields password="vmjn gxya uxph eplp" /></p>
          <p><b>Mail Connection: </b>smtp.gmail.com</p>
          <p><b>Mail Port: </b>587</p>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => {
            setEditOpen(true)
          }} label={"Verify or Edit"} variant='outline' className='mt-5' />
        </div>
      </div>,
    },
    {
      header: <div className="flex items-center gap-2 font-semibold">Header I <Check width={16} height={16} className="text-green-500" /></div>,
      content: <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-4 flex-wrap'>
          <p><b>Mail Type: </b>Gmail</p>
          <p><b>Mail ID: </b>gokulhk278@gmail.com</p>
          <p className='flex gap-2'><b>Password: </b><PasswordFields password="vmjn gxya uxph eplp" /></p>
          <p><b>Mail Connection: </b>smtp.gmail.com</p>
          <p><b>Mail Port: </b>587</p>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => {
            setEditOpen(true)
          }} label={"Verify or Edit"} variant='outline' className='mt-5' />
        </div>
      </div>,
    },
    {
      header: <div className="flex items-center gap-2 font-semibold">Header II <X width={16} height={16} className="text-red-500" /></div>,
      content: <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-4 flex-wrap'>
          <p><b>Mail Type: </b>Gmail</p>
          <p><b>Mail ID: </b>gokulhk278@gmail.com</p>
          <p className='flex gap-2'><b>Password: </b><PasswordFields password="vmjn gxya uxph eplp" /></p>
          <p><b>Mail Connection: </b>smtp.gmail.com</p>
          <p><b>Mail Port: </b>587</p>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => {
            setEditOpen(true)
          }} label={"Verify or Edit"} variant='outline' className='mt-5' />
        </div>
      </div>,
    },
    {
      header: <div className="flex items-center gap-2 font-semibold">Header III <X width={16} height={16} className="text-red-500" /></div>,
      content: <div className='flex flex-col lg:flex-row justify-between'>
        <div className='flex flex-col gap-4 flex-wrap'>
          <p><b>Mail Type: </b>Gmail</p>
          <p><b>Mail ID: </b>gokulhk278@gmail.com</p>
          <p className='flex gap-2'><b>Password: </b><PasswordFields password="vmjn gxya uxph eplp" /></p>
          <p><b>Mail Connection: </b>smtp.gmail.com</p>
          <p><b>Mail Port: </b>587</p>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => {
            setEditOpen(true)
          }} label={"Verify or Edit"} variant='outline' className='mt-5' />
        </div>
      </div>,
    },
  ];


  return (
    <div className='h-full'>

      {/* Add New Email Configuration Sidebar - start */}
      <AppSidebar
        visible={newOpen}
        onClose={() => setNewOpen(false)}
        title="Add New Configuration"
        position="right"
        className="w-[90%] sm:w-[70%] lg:w-[50%]" // ✅ responsive width
      >
        <div className='px-1 sm:px-4 mt-6'>
          <SelectInput
            id="mailtype"
            label="Mail Type"
            options={MailType}
            required
          />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailid' type='email' label='Mail ID' required />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailpassword' type='password' label='Mail Password' required />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailconnection' type='text' label='Mail Connection' required />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailport' type='number' label='Mail Port' required />
        </div>
        <div className='px-1 sm:px-4 mt-6 flex justify-end'>
          <Button label={<div className='flex justify-center items-center gap-2'>Check Configuration and Add</div>} variant='primary' className='w-10/10 md:w-auto' />
        </div>
      </AppSidebar>
      {/* Add New Email Configuration Sidebar - end */}

      {/* Edit Email Configuration Sidebar - start */}
      <AppSidebar
        visible={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Configuration"
        position="right"
        className="w-[90%] sm:w-[70%] lg:w-[50%]" // ✅ responsive width
      >
        <div className='px-1 sm:px-4 mt-6'>
          <SelectInput
            id="mailtype"
            label="Mail Type"
            options={MailType}
            required
          />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailid' type='email' label='Mail ID' required />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailpassword' type='password' label='Mail Password' required />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailconnection' type='text' label='Mail Connection' required />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailport' type='number' label='Mail Port' required />
        </div>
        <div className='px-1 sm:px-4 mt-6 flex justify-end'>
          <Button label={<div className='flex justify-center items-center gap-2'>Check Configuration and Update</div>} variant='primary' className='w-10/10 md:w-auto' />
        </div>
      </AppSidebar>
      {/* Edit New Email Configuration Sidebar - end */}

      <div className='h-[10vh] flex justify-between items-end lg:items-center'>
        <div className='font-bold text-black text-lg md:text-2xl'>
          Configuration <Cog width={30} height={30} className='inline-block mb-1 ml-2' />
        </div>
        <div className='font-bold text-black text-base'>
          <Button onClick={() => setNewOpen(true)} label={<div className='flex justify-center items-center gap-2'><Plus width={20} height={20} />Add</div>} variant='primary' className='ml-4' />
        </div>
      </div>
      <div className='h-[90vh] pb-20 lg:pb-10  overflow-auto'>
        <div className='py-10 text-center text-gray-500 text-lg'>
          No Configurations Found
        </div>
        <AppAccordion items={items} />
      </div>
    </div>
  );
};

export default ConfigurationPage;