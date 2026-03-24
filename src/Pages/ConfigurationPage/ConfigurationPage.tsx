import AppAccordion from '@/Components/AppAccordion/AppAccordion';
import Button from '@/Components/Button/Button';
import SelectInput from '@/Components/Inputs/SelectInput';
import TextInput from '@/Components/Inputs/TextInput';
import PasswordFields from '@/Components/Passwords/PasswordFields';
import AppSidebar from '@/Components/AppSidebar/AppSidebar';
import { MailType } from '@/Interface/CommonInterface/CommonInterface';
import { AlertTriangle, Check, Cog, Globe, Loader2, Lock, Mail, Plus, Search, Server, Shield, Trash, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

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

  const [deleteTarget, setDeleteTarget] = useState<Configuration | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const res = await ConfigurationService.DeleteConfig(deleteTarget.id!);
    if (res.status) {
      toast.success(res.message);
      fetchConfigs();
    } else {
      toast.error(res.message);
    }
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  const filteredConfigs = useMemo(() => {
    return configs.filter(c => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || c.mailId.toLowerCase().includes(q) || c.mailType.toLowerCase().includes(q) || c.mailHost.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? c.status : !c.status);
      return matchesSearch && matchesStatus;
    });
  }, [configs, searchQuery, statusFilter]);

  const activeCount = configs.filter(c => c.status).length;
  const inactiveCount = configs.filter(c => !c.status).length;

  const accordionItems = filteredConfigs.map((config) => ({
    header: (
      <div className="flex items-center gap-1.5 sm:gap-2 font-semibold text-xs sm:text-sm truncate">
        <span className="truncate">{config.mailId}</span> {config.status ? <Check width={14} height={14} className="text-green-500 flex-shrink-0" /> : <X width={14} height={14} className="text-red-500 flex-shrink-0" />}
      </div>
    ),
    content: (
      <div className='flex flex-col gap-4 sm:gap-6 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 mt-2'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8'>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">Mail Type</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">{config.mailType}</span>
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">Account ID</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 truncate">{config.mailId}</span>
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">Password</span>
            <PasswordFields password={config.mailPassword || ''} />
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">Outgoing Hub</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 truncate">{config.mailHost}</span>
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">Port</span>
            <span className="text-xs sm:text-sm font-bold text-slate-700">{config.mailPort}</span>
          </div>
        </div>
        <div className='flex items-end justify-end gap-2 mt-2 sm:mt-0'>
          <button
            onClick={() => setDeleteTarget(config)}
            className='px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all cursor-pointer flex items-center gap-1.5'
          >
            <Trash size={14} /> Delete
          </button>
          <Button onClick={() => handleEditClick(config)} label={"Verify or Edit"} variant='outline' className='shadow-sm w-full sm:w-auto text-xs sm:text-sm' />
        </div>
      </div>
    ),
  }));

  return (
    <>
      <div className='h-full'>
        <AppSidebar
          visible={newOpen || editOpen}
          onClose={() => {
            setNewOpen(false);
            setEditOpen(false);
            setSelectedConfig(null);
          }}
          title={editOpen ? "Edit Configuration" : "New Configuration"}
          position="right"
          className="w-[90%] sm:w-[70%] lg:w-[50%]"
        >
          <div className="px-2 sm:px-6 py-6 pb-32 lg:pb-6 space-y-6">
            {/* Top Description Banner */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0 mt-0.5">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {editOpen ? "Update your SMTP credentials" : "Connect a new SMTP account"}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your credentials are encrypted and verified before saving.
                </p>
              </div>
            </div>

            {/* Section: Account Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                  <Mail size={14} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Account Details</span>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200/70 shadow-sm space-y-5">
                <SelectInput
                  id="mailType"
                  label="Mail Provider"
                  options={MailType}
                  value={formData.mailType}
                  onChange={handleInputChange}
                  required
                />
                <TextInput id='mailId' type='email' label='Email Address' value={formData.mailId} onChange={handleInputChange} required />
              </div>
            </div>

            {/* Section: Security */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                  <Lock size={14} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Authentication</span>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200/70 shadow-sm">
                <TextInput id='mailPassword' type='password' label='App Password / SMTP Key' value={formData.mailPassword} onChange={handleInputChange} required />
              </div>
            </div>

            {/* Section: Server */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
                  <Server size={14} />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Server Configuration</span>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200/70 shadow-sm space-y-5">
                <TextInput id='mailHost' type='text' label='SMTP Host' value={formData.mailHost} onChange={handleInputChange} required />
                <TextInput id='mailPort' type='number' label='SMTP Port' value={formData.mailPort.toString()} onChange={handleInputChange} required />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveConfig}
              disabled={actionLoading}
              className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/20 hover:shadow-xl hover:shadow-blue-900/30 hover:from-blue-700 hover:to-indigo-700 cursor-pointer flex items-center justify-center gap-3"
            >
              {actionLoading ? (
                <>
                  <Loader2 className='animate-spin' size={18} />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <Globe size={18} />
                  {editOpen ? "Verify & Update" : "Verify & Add Account"}
                </>
              )}
            </button>
          </div>
        </AppSidebar>

        <div className='min-h-[56px] flex justify-between items-center mb-4 px-1 md:px-0'>
          <div className='flex items-center gap-2 sm:gap-3'>
            <h1 className='text-lg sm:text-xl md:text-3xl font-black text-slate-800'>Configurations</h1>
            <div className="mt-2 rounded-xl text-slate-600">
              <Cog size={20} className='animate-spin-slow' />
            </div>
          </div>
          <Button onClick={() => setNewOpen(true)} label={<><Plus size={16} /> <span className="hidden sm:inline">Add Account</span><span className="sm:hidden">Add</span></>} variant='primary' className='shadow-blue-900/10 text-xs lg:text-base' />
        </div>

        {/* Filter Bar */}
        {!loading && configs.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-4 px-1 md:px-0">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by email, type or host..."
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 p-1 rounded-xl flex-shrink-0 overflow-x-auto">
              {[
                { key: 'all' as const, label: 'All', count: configs.length },
                { key: 'active' as const, label: 'Active', count: activeCount },
                { key: 'inactive' as const, label: 'Inactive', count: inactiveCount },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setStatusFilter(opt.key)}
                  className={`px-2.5 sm:px-4 cursor-pointer py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest transition-all whitespace-nowrap ${statusFilter === opt.key
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  {opt.label} <span className="ml-0.5 sm:ml-1 opacity-60">{opt.count}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className='h-[80vh] pb-32 lg:pb-20 overflow-auto'>
          {loading ? (
            <div className='flex flex-col justify-center items-center h-64 gap-3'>
              <Loader2 className='animate-spin text-[#04387a]' size={48} />
              <p className="text-slate-500 font-medium">Loading safe connections...</p>
            </div>
          ) : configs.length === 0 ? (
            <div className='flex flex-col justify-center items-center h-80 gap-4 sm:gap-6 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 mx-1 md:mx-0 p-4 mt-2'>
              <div className="p-4 sm:p-5 bg-slate-100 rounded-full text-slate-400">
                <Cog size={36} className="sm:w-12 sm:h-12" />
              </div>
              <div className="text-center flex justify-center items-center flex-col">
                <p className="text-base sm:text-xl font-black text-slate-800">No Secure Accounts Added</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto">Add your SMTP credentials to start sending trustworthy emails at scale.</p>
                <Button onClick={() => setNewOpen(true)} label="Get Started Now" variant='outline' className='mt-4 sm:mt-6 text-xs sm:text-sm' />
              </div>
            </div>
          ) : filteredConfigs.length === 0 ? (
            <div className='flex flex-col justify-center items-center h-80 gap-4 sm:gap-6 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 mx-1 md:mx-0 p-4 mt-2'>
              <div className="p-4 sm:p-5 bg-slate-100 rounded-full text-slate-400">
                <Search size={36} className="sm:w-12 sm:h-12" />
              </div>
              <div className="text-center">
                <p className="text-base sm:text-xl font-black text-slate-800">No Results Found</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto">Try adjusting your search or filter.</p>
              </div>
            </div>
          ) : (
            <div className="px-1 md:px-0">
              <AppAccordion items={accordionItems} />
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !deleteLoading && setDeleteTarget(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-[90%] max-w-md mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-red-50 rounded-2xl text-red-500 mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-1">Delete Configuration</h3>
              <p className="text-sm text-slate-500 mb-2">This action cannot be undone. The following account will be permanently removed:</p>
              <div className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                <p className="text-sm font-bold text-slate-700 truncate">{deleteTarget.mailId}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-0.5">{deleteTarget.mailType}</p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleteLoading}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-red-500 hover:bg-red-600 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleteLoading ? <Loader2 size={16} className="animate-spin" /> : <Trash size={16} />}
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfigurationPage;
