import React, { useEffect, useState } from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import {
    Mail, CheckCircle, XCircle, Activity, ShieldCheck,
    TrendingUp, ArrowUpRight, ArrowDownRight, Loader2,
    LayoutDashboard
} from 'lucide-react';
import { DashboardService } from '@/Service/DashboardService';
import type { DashboardStats } from '@/Interface/DashboardInterface';
import { toast } from 'react-toastify';

const DashboardPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStats | null>(null);

    const fetchStats = async () => {
        setLoading(true);
        const res = await DashboardService.GetStats();
        if (res.status) {
            setStats(res.data);
        } else {
            toast.error(res.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetchStats();
        }
        return () => { isMounted = false };
    }, []);

    if (loading) {
        return (
            <div className='flex flex-col justify-center items-center h-[80vh] gap-4'>
                <Loader2 className='animate-spin text-[#04387a]' size={48} />
                <p className='text-gray-500 font-medium animate-pulse'>Aggregating your insights...</p>
            </div>
        );
    }

    if (!stats) return null;

    const calculatePercentage = (part: number, total: number) => {
        if (total === 0) return '0%';
        return ((part / total) * 100).toFixed(1) + '%';
    };

    const cards = [
        {
            title: 'Total Emails',
            value: stats.totalEmails.toLocaleString(),
            icon: <Mail className="text-blue-600" />,
            bgColor: 'bg-blue-50',
            trend: 'Volume',
            trendUp: true
        },
        {
            title: 'Sent Successfully',
            value: stats.sentEmails.toLocaleString(),
            icon: <CheckCircle className="text-green-600" />,
            bgColor: 'bg-green-50',
            trend: calculatePercentage(stats.sentEmails, stats.totalEmails),
            trendUp: true
        },
        {
            title: 'Failed Delivery',
            value: stats.failedEmails.toLocaleString(),
            icon: <XCircle className="text-red-600" />,
            bgColor: 'bg-red-50',
            trend: calculatePercentage(stats.failedEmails, stats.totalEmails),
            trendUp: false
        },
        {
            title: 'Active Configs',
            value: stats.activeConfigs.toString(),
            icon: <ShieldCheck className="text-purple-600" />,
            bgColor: 'bg-purple-50',
            trend: 'Active',
            trendUp: true
        }
    ];

    return (
        <div className='p-2 sm:p-5 lg:p-6 animate-in fade-in duration-700 max-w-[1600px] mx-auto'>
            {/* Header */}
            <div className='mb-6 flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-3'>
                        Dashboard <LayoutDashboard className='text-[#04387a]' />
                    </h1>
                    <p className='text-gray-500 mt-1 font-medium'>Welcome back! Here's what's happening today.</p>
                </div>
                <div className='hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100'>
                    <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></div>
                    <span className='text-sm font-bold text-gray-700'>Systems Normal</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6'>
                {cards.map((card, idx) => (
                    <div key={idx} className='premium-card p-5 sm:p-6 border-none shadow-md hover:shadow-xl group'>
                        <div className='flex justify-between items-start mb-3'>
                            <div className={`p-2.5 rounded-2xl ${card.bgColor} group-hover:scale-110 transition-premium`}>
                                {card.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${card.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {card.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {card.trend}
                            </div>
                        </div>
                        <h3 className='text-slate-500 text-[11px] uppercase tracking-wider font-black mb-1'>{card.title}</h3>
                        <p className='text-2xl sm:text-3xl font-black text-slate-900'>{card.value}</p>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Main Activity Chart */}
                <div className='lg:col-span-2 premium-card p-5 sm:p-6'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
                        <h3 className='text-xl font-black text-slate-800 flex items-center gap-3'>
                            <div className="p-2 bg-blue-100 rounded-lg"><Activity className='text-blue-600' size={20} /></div> Activity Insights
                        </h3>
                        <div className='flex gap-4 bg-slate-50 p-2 rounded-xl'>
                            <div className='flex items-center gap-1.5'>
                                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                                <span className='text-[10px] font-black uppercase tracking-wider text-slate-500'>Sent</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <div className='w-2 h-2 bg-red-400 rounded-full'></div>
                                <span className='text-[10px] font-black uppercase tracking-wider text-slate-500'>Failed</span>
                            </div>
                        </div>
                    </div>
                    <div className='h-[260px] w-full'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.recentActivity}>
                                <defs>
                                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sent"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSent)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="fixed"
                                    stroke="#f87171"
                                    strokeWidth={3}
                                    fill="none"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Success Rate Circle */}
                <div className='premium-card p-6 flex flex-col items-center justify-center relative overflow-hidden group'>
                    <div className='absolute -top-6 -right-6 p-8 opacity-5 group-hover:opacity-10 transition-opacity'>
                        <TrendingUp size={160} />
                    </div>
                    <h3 className='text-xl font-black text-slate-800 mb-8 self-start'>Campaign Health</h3>

                    <div className='relative flex items-center justify-center'>
                        <PieChart width={220} height={220}>
                            <Pie
                                data={[
                                    { name: 'Success', value: stats.successRate },
                                    { name: 'Remaining', value: 100 - stats.successRate }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={8}
                                dataKey="value"
                                startAngle={90}
                                endAngle={-270}
                                cornerRadius={10}
                            >
                                <Cell fill="#3b82f6" />
                                <Cell fill="#f1f5f9" />
                            </Pie>
                        </PieChart>
                        <div className='absolute inset-0 flex flex-col items-center justify-center'>
                            <span className='text-4xl font-black text-slate-900'>{Math.round(stats.successRate)}%</span>
                            <span className='text-[10px] uppercase font-black text-blue-600 tracking-[0.2em] mt-1'>Deliverability</span>
                        </div>
                    </div>

                    <div className='mt-10 w-full space-y-6'>
                        <div className='flex justify-between items-center text-sm'>
                            <span className='text-slate-500 font-bold'>Monthly Performance</span>
                            <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider'>Excellent</span>
                        </div>
                        <div className='w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner'>
                            <div
                                className='bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out'
                                style={{ width: `${stats.successRate}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;