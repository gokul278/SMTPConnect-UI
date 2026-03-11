import AppAccordion from '@/Components/AppAccordion/AppAccordion';
import { History, Loader2, Check, X, Mail, User, Clock, AlertCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MailService } from '@/Service/MailService';
import type { MailHistory } from '@/Interface/MailInterface';
import { toast } from 'react-toastify';

const SendMailHistoryPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<MailHistory[]>([]);

  const fetchHistory = async () => {
    setLoading(true);
    const res = await MailService.GetHistory();
    if (res.status) {
      setHistory(res.data);
    } else {
      toast.error(res.message || "Failed to fetch mail history");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  const accordionItems = history.map((item) => ({
    header: (
      <div className="w-full pr-3 flex items-center justify-between text-sm sm:text-base">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 truncate mr-4">
          <div className="flex items-center gap-2 min-w-0">
            <Mail size={16} className="text-gray-400 flex-shrink-0" />
            <span className="truncate font-semibold">{item.recipient}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-gray-500 truncate">{item.subject}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="hidden md:block text-gray-400 text-xs">
            {formatDateTime(item.sentAt)}
          </span>
          {item.status === 'sent' ? (
            <Check size={18} className="text-green-500" />
          ) : (
            <X size={18} className="text-red-500" />
          )}
        </div>
      </div>
    ),
    content: (
      <div className='flex flex-col gap-6 p-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-blue-600">
              <User size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Authentication Identity</p>
              <p className="text-sm font-bold text-slate-700">{item.senderEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200 text-indigo-600">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Transmission Timestamp</p>
              <p className="text-sm font-bold text-slate-700">{formatDateTime(item.sentAt)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-2">Subject Header</p>
            <p className="text-base font-bold text-slate-800 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">{item.subject}</p>
          </div>

          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-2">Dynamic Content Payload</p>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[120px] overflow-auto">
              <div className="ql-editor p-0 opacity-90 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          </div>

          {item.status === 'failed' && (
            <div className="bg-red-50/50 border border-red-200 p-5 rounded-2xl flex gap-4 animate-in fade-in slide-in-from-top-2">
              <div className="p-2 bg-red-100 rounded-lg text-red-600 h-fit">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-red-800 uppercase tracking-wide">Transmission Failure Detail</p>
                <p className="text-sm text-red-600 font-medium mt-1 leading-relaxed">{item.errorMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <div className='h-full flex flex-col'>
      <div className='h-[10vh] flex justify-between items-center px-2 md:px-0 mb-6'>
        <div className='flex items-center gap-3'>
          <h1 className='text-2xl md:text-3xl font-black text-slate-800'>History</h1>
          <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
            <History size={20} />
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200/50">
          <Mail size={14} className="text-blue-500" /> {history.length} Audit Logs
        </div>
      </div>

      <div className='flex-1 pb-32 lg:pb-20 overflow-auto px-1 md:px-0'>
        {loading ? (
          <div className='flex flex-col justify-center items-center h-64 gap-3'>
            <Loader2 className='animate-spin text-[#04387a]' size={48} />
            <p className="text-slate-500 font-medium">Retrieving audit trails...</p>
          </div>
        ) : history.length === 0 ? (
          <div className='flex flex-col justify-center items-center h-64 gap-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mx-4'>
            <div className="p-5 bg-slate-100 rounded-full text-slate-400">
              <History size={48} />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-slate-800">No History Available</p>
              <p className="text-slate-500 mt-1 max-w-xs mx-auto">Once you start sending campaigns, detailed audit logs will appear here.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AppAccordion items={accordionItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SendMailHistoryPage;