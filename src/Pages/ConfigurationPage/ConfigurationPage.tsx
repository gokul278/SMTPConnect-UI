import AppAccordion from '@/Components/AppAccordion/AppAccordion';
import Button from '@/Components/Button/Button';
import SelectInput from '@/Components/Inputs/SelectInput';
import TextInput from '@/Components/Inputs/TextInput';
import PasswordFields from '@/Components/Passwords/PasswordFields';
import AppSidebar from '@/Components/AppSidebar/AppSidebar';
import { MailType } from '@/Interface/CommonInterface/CommonInterface';
import { Check, Cog, Loader2, Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ConfigurationService } from '@/Service/ConfigurationService';
import type { Configuration } from '@/Interface/ConfigurationInterface';

const ConfigurationPage: React.FC = () => {
  const [newOpen, setNewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [configs, setConfigs] = useState<Configuration[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<Configuration | null>(null);
  const [formData, setFormData] = useState({
    mailType: '',
    mailId: '',
    mailPassword: '',
    mailHost: '',
    mailPort: 587
  });

  const fetchConfigs = async () => {
    setLoading(true);
    const res = await ConfigurationService.GetConfigs();
    if (res.status) {
      setConfigs(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'mailPort' ? parseInt(value) : value
    }));
  };

  const handleEditClick = (config: Configuration) => {
    setSelectedConfig(config);
    setFormData({
      mailType: config.mailType,
      mailId: config.mailId,
      mailPassword: config.mailPassword || '',
      mailHost: config.mailHost,
      mailPort: config.mailPort
    });
    setEditOpen(true);
  };

  const handleSaveConfig = async () => {
    setActionLoading(true);
    let res;
    if (selectedConfig && editOpen) {
      res = await ConfigurationService.UpdateConfig({
        ...formData,
        id: selectedConfig.id,
        refUserId: selectedConfig.refUserId,
        status: selectedConfig.status
      });
    } else {
      res = await ConfigurationService.AddConfig(formData);
    }

    if (res.status) {
      setNewOpen(false);
      setEditOpen(false);
      setSelectedConfig(null);
      setFormData({
        mailType: '',
        mailId: '',
        mailPassword: '',
        mailHost: '',
        mailPort: 587
      });
      fetchConfigs();
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setActionLoading(false);
  };

  const accordionItems = configs.map((config) => ({
    header: (
      <div className="flex items-center gap-2 font-semibold">
        {config.mailId} {config.status ? <Check width={16} height={16} className="text-green-500" /> : <X width={16} height={16} className="text-red-500" />}
      </div>
    ),
    content: (
      <div className='flex flex-col lg:flex-row justify-between gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 mt-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8'>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mail Type</span>
            <span className="text-sm font-bold text-slate-700">{config.mailType}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account ID</span>
            <span className="text-sm font-bold text-slate-700">{config.mailId}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</span>
            <PasswordFields password={config.mailPassword || ''} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Outgoing Hub</span>
            <span className="text-sm font-bold text-slate-700">{config.mailHost}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Port Network</span>
            <span className="text-sm font-bold text-slate-700">{config.mailPort}</span>
          </div>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={() => handleEditClick(config)} label={"Verify or Edit"} variant='outline' className='shadow-sm' />
        </div>
      </div>
    ),
  }));

  return (
    <div className='h-full'>
      <AppSidebar
        visible={newOpen || editOpen}
        onClose={() => {
          setNewOpen(false);
          setEditOpen(false);
          setSelectedConfig(null);
        }}
        title={editOpen ? "Edit Configuration" : "Add New Configuration"}
        position="right"
        className="w-[90%] sm:w-[70%] lg:w-[50%]"
      >
        <div className='px-1 sm:px-4 mt-6'>
          <SelectInput
            id="mailType"
            label="Mail Type"
            options={MailType}
            value={formData.mailType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailId' type='email' label='Mail ID' value={formData.mailId} onChange={handleInputChange} required />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailPassword' type='password' label='Mail Password' value={formData.mailPassword} onChange={handleInputChange} required />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailHost' type='text' label='Mail Connection' value={formData.mailHost} onChange={handleInputChange} required />
        </div>
        <div className='px-1 sm:px-4 mt-6'>
          <TextInput id='mailPort' type='number' label='Mail Port' value={formData.mailPort.toString()} onChange={handleInputChange} required />
        </div>
        <div className='px-1 sm:px-4 mt-6 flex justify-end'>
          <Button
            onClick={handleSaveConfig}
            disabled={actionLoading}
            label={actionLoading ? <div className='flex justify-center items-center gap-2'><Loader2 className='animate-spin' /> Verifying...</div> : (editOpen ? "Check Configuration and Update" : "Check Configuration and Add")}
            variant='primary'
            className='w-10/10 md:w-auto'
          />
        </div>
      </AppSidebar>

      <div className='h-[10vh] flex justify-between items-center mb-4'>
        <div className='flex items-center gap-3'>
          <h1 className='text-xl md:text-3xl font-black text-slate-800'>Configurations</h1>
          <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
            <Cog size={20} className='animate-spin-slow' />
          </div>
        </div>
        <Button onClick={() => setNewOpen(true)} label={<><Plus size={18} /> Add Account</>} variant='primary' className='shadow-blue-900/10' />
      </div>

      <div className='h-[90vh] pb-32 lg:pb-20 overflow-auto'>
        {loading ? (
          <div className='flex flex-col justify-center items-center h-64 gap-3'>
            <Loader2 className='animate-spin text-[#04387a]' size={48} />
            <p className="text-slate-500 font-medium">Loading safe connections...</p>
          </div>
        ) : configs.length === 0 ? (
          <div className='flex flex-col justify-center items-center h-64 gap-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mx-4'>
            <div className="p-5 bg-slate-100 rounded-full text-slate-400">
              <Cog size={48} />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-slate-800">No Secure Accounts Added</p>
              <p className="text-slate-500 mt-1 max-w-xs mx-auto">Add your SMTP credentials to start sending trustworthy emails at scale.</p>
              <Button onClick={() => setNewOpen(true)} label="Get Started Now" variant='outline' className='mt-6' />
            </div>
          </div>
        ) : (
          <div className="px-1 md:px-0">
            <AppAccordion items={accordionItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationPage;
