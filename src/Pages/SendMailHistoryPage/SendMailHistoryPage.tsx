import AppAccordion from '@/Components/AppAccordion/AppAccordion';
import { History, Loader2, Check, X, Mail, User, Clock, AlertCircle, Send, Search, Filter, Calendar } from 'lucide-react';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MailService } from '@/Service/MailService';
import type { MailHistory } from '@/Interface/MailInterface';
import { toast } from 'react-toastify';
import { useMailQueue } from '@/Context/MailQueueContext';

const SendMailHistoryPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<MailHistory[]>([]);
  const { queue } = useMailQueue();
  const prevActiveRef = useRef(queue.isActive);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'sent' | 'failed'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    const res = await MailService.GetHistory();
    if (res.status) {
      setHistory(res.data || []);
    } else {
      toast.error(res.message || "Failed to fetch mail history");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Auto-refresh history when queue finishes
  useEffect(() => {
    if (prevActiveRef.current && !queue.isActive) {
      // Queue just finished
      toast.success(`Dispatch complete: ${queue.sent} sent, ${queue.failed} failed`);
      fetchHistory();
    }
    prevActiveRef.current = queue.isActive;
  }, [queue.isActive, queue.sent, queue.failed]);

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; // fallback: show raw string
    return d.toLocaleString();
  };

  const progressPercent = queue.total > 0 ? Math.round(((queue.sent + queue.failed) / queue.total) * 100) : 0;

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || item.recipient.toLowerCase().includes(q) || item.subject.replace(/<[^>]*>/g, '').toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      let matchesDate = true;
      if (dateFrom || dateTo) {
        const itemDate = item.sentAt ? new Date(item.sentAt) : null;
        if (itemDate && !isNaN(itemDate.getTime())) {
          if (dateFrom) matchesDate = itemDate >= new Date(dateFrom);
          if (dateTo && matchesDate) {
            const to = new Date(dateTo);
            to.setHours(23, 59, 59, 999);
            matchesDate = itemDate <= to;
          }
        } else {
          matchesDate = false;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [history, searchQuery, statusFilter, dateFrom, dateTo]);

  const sentCount = history.filter(h => h.status === 'sent').length;
  const failedCount = history.filter(h => h.status === 'failed').length;

  const accordionItems = filteredHistory.map((item) => ({
    header: (
      <div className="w-full pr-3 flex items-center justify-between text-xs sm:text-sm md:text-base">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 truncate mr-2 sm:mr-4 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-[200px] md:w-[220px] flex-shrink-0 min-w-0">
            <Mail size={14} className="text-gray-400 flex-shrink-0 hidden sm:block" />
            <span className="truncate font-semibold text-slate-800" title={item.recipient}>{item.recipient}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-gray-500 truncate text-[11px] sm:text-sm" title={item.subject.replace(/<[^>]*>/g, '')}>
              {(() => {
                const plain = item.subject.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
                const limit = window.innerWidth < 640 ? 30 : 50;
                return plain.length > limit ? plain.slice(0, limit) + '...' : plain;
              })()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <span className="hidden lg:block text-gray-400 text-xs">
            {formatDateTime(item.sentAt)}
          </span>
          {item.status === 'sent' ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <X size={16} className="text-red-500" />
          )}
        </div>
      </div>
    ),
    content: (
      <div className='flex flex-col gap-4 sm:gap-6 p-2 sm:p-4'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100">
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
            <p className="text-base font-bold text-slate-800 bg-white p-4 rounded-xl border border-slate-200 shadow-sm" dangerouslySetInnerHTML={{ __html: item.subject }}></p>
          </div>

          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-2">Email Body Rendered Preview</p>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[120px] overflow-auto">
              <div
                className="ql-editor p-0 opacity-100 text-slate-900"
                style={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
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
      <div className='min-h-[56px] flex justify-between items-center px-2 md:px-0 mb-4 sm:mb-6'>
        <div className='flex items-center gap-2 sm:gap-3'>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-black text-slate-800'>History</h1>
          <div className="mt-2 rounded-xl text-slate-600">
            <History size={20} className='animate-bounce' />
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200/50">
          <Mail size={12} className="text-blue-500" /> {history.length} Logs
        </div>
      </div>

      {/* Filter Bar */}
      {!loading && history.length > 0 && (
        <div className="space-y-3 mb-6 px-1 md:px-0">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search with clear button */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by email or subject..."
                className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {/* Status Pills */}
            <div className="flex items-center gap-1 sm:gap-2 bg-slate-100 p-1 rounded-xl flex-shrink-0 overflow-x-auto">
              {[
                { key: 'all' as const, label: 'All', count: history.length },
                { key: 'sent' as const, label: 'Sent', count: sentCount },
                { key: 'failed' as const, label: 'Failed', count: failedCount },
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
          {/* Date Filter Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
              <Calendar size={14} className="text-slate-400" />
              Date Range
            </div>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="flex-1 min-w-[130px] px-2.5 sm:px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
              />
              <span className="text-slate-400 text-xs sm:text-sm font-medium">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="flex-1 min-w-[130px] px-2.5 sm:px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
              />
              {(dateFrom || dateTo) && (
                <button
                  onClick={() => { setDateFrom(''); setDateTo(''); }}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
                  title="Clear dates"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className='flex-1 pb-32 lg:pb-20 overflow-auto px-1 md:px-0'>
        {/* Queue Progress Banner */}
        {queue.isActive && (
          <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-900/20 animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Send size={18} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-lg font-black tracking-tight">Dispatch in Progress</h3>
                  <p className="text-blue-200 text-xs sm:text-sm font-medium truncate max-w-[200px] sm:max-w-none">
                    Sending to <span className="text-white font-bold">{queue.currentRecipient}</span>
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl sm:text-3xl font-black tabular-nums">
                  {queue.sent + queue.failed}<span className="text-blue-300">/{queue.total}</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Stats row */}
            <div className="flex gap-6 mt-3 text-sm font-bold">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-green-300" />
                <span className="text-green-200">{queue.sent} sent</span>
              </span>
              {queue.failed > 0 && (
                <span className="flex items-center gap-1.5">
                  <X size={14} className="text-red-300" />
                  <span className="text-red-200">{queue.failed} failed</span>
                </span>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className='flex flex-col justify-center items-center h-64 gap-3'>
            <Loader2 className='animate-spin text-[#04387a]' size={48} />
            <p className="text-slate-500 font-medium">Retrieving audit trails...</p>
          </div>
        ) : history.length === 0 && !queue.isActive ? (
          <div className='flex flex-col justify-center items-center h-64 gap-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mx-4'>
            <div className="p-5 bg-slate-100 rounded-full text-slate-400">
              <History size={48} />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-slate-800">No History Available</p>
              <p className="text-slate-500 mt-1 max-w-xs mx-auto">Once you start sending campaigns, detailed audit logs will appear here.</p>
            </div>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className='flex flex-col justify-center items-center h-64 gap-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 mx-4'>
            <div className="p-5 bg-slate-100 rounded-full text-slate-400">
              <Filter size={48} />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-slate-800">No Results Found</p>
              <p className="text-slate-500 mt-1 max-w-xs mx-auto">Try adjusting your search or filter to find what you're looking for.</p>
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
