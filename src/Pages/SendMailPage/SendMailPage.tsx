import Button from '@/Components/Button/Button';
import MentionEditor from '@/Components/Inputs/MentionEditor';
import SelectInput from '@/Components/Inputs/SelectInput';
import { Activity, AlertCircle, Check, Loader2, Plus, Send, ShieldCheck, Trash } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import "react-quill-new/dist/quill.snow.css";
import { ConfigurationService } from '@/Service/ConfigurationService';
import { MailService } from '@/Service/MailService';
import type { Configuration } from '@/Interface/ConfigurationInterface';
import { toast } from 'react-toastify';

const SendMailPage: React.FC = () => {
    const [configs, setConfigs] = useState<Configuration[]>([]);
    const [selectedConfigId, setSelectedConfigId] = useState<string>('');
    const [columns, setColumns] = useState<string[]>(["Email"]);
    const [rows, setRows] = useState<any[][]>([]);
    const [subjectTemplate, setSubjectTemplate] = useState("");
    const [bodyTemplate, setBodyTemplate] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfigs = async () => {
            const res = await ConfigurationService.GetConfigs();
            if (res.status) {
                setConfigs(res.data.filter((c: any) => c.status));
            }
            setLoading(false);
        };
        fetchConfigs();
    }, []);

    const configOptions = useMemo(() => {
        return configs.map(c => ({
            label: `${c.mailId} (${c.mailType})`,
            value: (c.id || 0).toString()
        }));
    }, [configs]);

    const replaceVariables = (html: string, row: any[]) => {
        let result = html;
        columns.forEach((col, index) => {
            if (!col) return;
            // Quill mention format: <span class="mention" ... data-id="ColumnName">...</span>
            // We'll use a regex to find these and replace them with row data
            const regex = new RegExp(`<span[^>]*class="mention"[^>]*data-id="${col}"[^>]*>.*?<\\/span>`, 'g');
            result = result.replace(regex, row[index] || "");
        });
        return result;
    };

    const handleSendMail = async () => {
        if (!selectedConfigId) {
            toast.error("Please select a sender account");
            return;
        }
        if (rows.length === 0) {
            toast.error("Please add at least one recipient row");
            return;
        }

        const emailColIndex = columns.findIndex(col => col === "Email");
        if (emailColIndex === -1) {
            toast.error("Recipient 'Email' column is missing");
            return;
        }

        setIsSending(true);
        let successCount = 0;
        let failCount = 0;

        for (const row of rows) {
            const recipient = row[emailColIndex];
            if (!recipient) continue;

            const finalSubject = replaceVariables(subjectTemplate, row);
            const finalBody = replaceVariables(bodyTemplate, row);

            const res = await MailService.SendMail({
                configId: parseInt(selectedConfigId),
                recipient: recipient,
                subject: finalSubject,
                content: finalBody
            });

            if (res.status) {
                successCount++;
            } else {
                failCount++;
            }
        }

        toast.info(`Process completed: ${successCount} sent, ${failCount} failed`);
        setIsSending(false);
    };

    if (loading) return <div className='flex justify-center items-center h-full'><Loader2 className='animate-spin' /></div>;

    return (
        <div className='h-full flex flex-col'>
            <div className='h-[10vh] flex justify-between items-center px-2 md:px-0 mb-6'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-2xl md:text-3xl font-black text-slate-800'>Campaign</h1>
                    <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                        <Send size={20} />
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500">
                    <Activity size={14} className="text-blue-500" /> Bulk Sending Mode
                </div>
            </div>

            <div className='flex-1 pb-32 lg:pb-20 overflow-auto space-y-12 px-1 md:px-0'>
                {/* Step 1 */}
                <div className="relative">
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200'>
                            <Check size={24} strokeWidth={3} />
                        </div>
                        <div>
                            <h2 className='text-lg font-black text-slate-800'>Source & Recipients</h2>
                            <p className='text-sm text-slate-500 font-medium'>Select your sender account and manage your audience.</p>
                        </div>
                    </div>

                    <div className='ml-4 sm:ml-6 border-l-2 border-slate-100 pl-4 sm:pl-10 space-y-8'>
                        <div className='premium-card p-6 bg-white/50 border-slate-200/60'>
                            <div className='max-w-md mb-8'>
                                <SelectInput
                                    id="senderAccount"
                                    label="Verified Sender Identity"
                                    options={configOptions}
                                    value={selectedConfigId}
                                    onChange={(e) => setSelectedConfigId(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='space-y-4'>
                                <div className='flex justify-between items-end'>
                                    <div>
                                        <h3 className='text-sm font-black text-slate-800 uppercase tracking-wider'>Data Columns</h3>
                                        <p className='text-xs text-slate-500 font-medium'>Add variables to your template using @Name</p>
                                    </div>
                                    <button
                                        onClick={() => setColumns([...columns, ""])}
                                        className='flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all'
                                    >
                                        <Plus size={14} /> Add Column
                                    </button>
                                </div>
                                <div className='flex flex-wrap gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100'>
                                    {columns.map((col, index) => (
                                        <div key={index} className='px-3 py-2 bg-white rounded-xl flex items-center gap-2 shadow-sm border border-slate-200/60 transition-premium hover:border-blue-400'>
                                            <input
                                                className='bg-transparent border-none outline-none text-xs font-bold text-slate-700 w-20'
                                                value={col}
                                                readOnly={col === "Email"}
                                                onChange={(e) => {
                                                    const newColumns = [...columns];
                                                    newColumns[index] = e.target.value;
                                                    setColumns(newColumns);
                                                }}
                                                placeholder="Name"
                                            />
                                            {col !== "Email" && (
                                                <Trash
                                                    onClick={() => setColumns(columns.filter((_, i) => i !== index))}
                                                    size={14}
                                                    className='cursor-pointer text-slate-300 hover:text-red-500 transition-colors'
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='mt-10 space-y-4'>
                                <h3 className='text-sm font-black text-slate-800 uppercase tracking-wider'>Recipient Matrix</h3>
                                <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                                    <div className="overflow-auto max-h-[400px]">
                                        <table className="w-full text-sm border-collapse">
                                            <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-md">
                                                <tr>
                                                    {columns.map((col, idx) => (
                                                        <th key={idx} className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-slate-200">{col || "---"}</th>
                                                    ))}
                                                    <th className="px-6 py-4 w-20 text-center border-b border-slate-200"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {rows.map((row, rowIndex) => (
                                                    <tr key={rowIndex} className="hover:bg-blue-50/30 transition-colors group">
                                                        {columns.map((_, colIndex) => (
                                                            <td key={colIndex} className="px-4 py-3">
                                                                <input
                                                                    className='w-full px-3 py-2 bg-transparent text-slate-700 font-medium placeholder:text-slate-300 focus:bg-white rounded-lg transition-all border border-transparent focus:border-blue-200 outline-none'
                                                                    value={row[colIndex] || ""}
                                                                    onChange={(e) => {
                                                                        const newRows = [...rows];
                                                                        newRows[rowIndex][colIndex] = e.target.value;
                                                                        setRows(newRows);
                                                                    }}
                                                                    placeholder={`Value`}
                                                                />
                                                            </td>
                                                        ))}
                                                        <td className="px-4 py-3 text-center">
                                                            <button
                                                                onClick={() => setRows(rows.filter((_, i) => i !== rowIndex))}
                                                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                            >
                                                                <Trash size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="p-4 bg-slate-50/50 border-t border-slate-200 flex justify-between items-center">
                                        <span className='text-xs font-bold text-slate-400'>{rows.length} Contacts mapped</span>
                                        <button
                                            onClick={() => setRows([...rows, Array(columns.length).fill("")])}
                                            className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all shadow-sm"
                                        >
                                            <Plus size={14} /> Add Recipient
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-200'>
                            <span className="text-xl font-black">2</span>
                        </div>
                        <div>
                            <h2 className='text-lg font-black text-slate-800'>Template & Content</h2>
                            <p className='text-sm text-slate-500 font-medium'>Design your message with dynamic variables.</p>
                        </div>
                    </div>

                    <div className='ml-6 border-l-2 border-slate-100 pl-10'>
                        <div className='premium-card p-6 bg-white/50 border-slate-200/60 space-y-6'>
                            <div>
                                <label className='text-xs font-black uppercase tracking-widest text-slate-400 block mb-2'>Subject Blueprint</label>
                                <MentionEditor
                                    value={subjectTemplate}
                                    onChange={setSubjectTemplate}
                                    variables={columns}
                                />
                            </div>
                            <div>
                                <label className='text-xs font-black uppercase tracking-widest text-slate-400 block mb-2'>Message Body</label>
                                <MentionEditor
                                    value={bodyTemplate}
                                    onChange={setBodyTemplate}
                                    variables={columns}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-700 text-white flex items-center justify-center shadow-lg shadow-purple-200'>
                            <span className="text-xl font-black">3</span>
                        </div>
                        <div>
                            <h2 className='text-lg font-black text-slate-800'>Final Review</h2>
                            <p className='text-sm text-slate-500 font-medium'>Check the generated output for your first recipient.</p>
                        </div>
                    </div>

                    <div className='ml-6 border-l-2 border-slate-100 pl-10'>
                        <div className='premium-card p-8 bg-slate-900 text-white overflow-hidden relative'>
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ShieldCheck size={120} />
                            </div>
                            {rows.length > 0 ? (
                                <div className="relative z-10 space-y-8">
                                    <div>
                                        <span className='text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 block mb-4'>Outgoing Subject</span>
                                        <div className="text-xl font-bold border-b border-slate-800 pb-4" dangerouslySetInnerHTML={{ __html: replaceVariables(subjectTemplate, rows[0]) }} />
                                    </div>
                                    <div>
                                        <span className='text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 block mb-4'>Body Preview</span>
                                        <div className="ql-editor p-0 opacity-90 leading-relaxed" dangerouslySetInnerHTML={{ __html: replaceVariables(bodyTemplate, rows[0]) }} />
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col items-center justify-center py-12 gap-4 text-slate-500'>
                                    <AlertCircle size={40} />
                                    <p className='font-bold italic'>Map your recipients in Step 1 to generate a live preview</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex-shrink-0 w-12 h-12 rounded-2xl bg-[#04387a] text-white flex items-center justify-center shadow-lg shadow-blue-200'>
                            <span className="text-xl font-black">4</span>
                        </div>
                        <div>
                            <h2 className='text-lg font-black text-slate-800'>Initialize Sequence</h2>
                            <p className='text-sm text-slate-500 font-medium'>Start the automated delivery to all recipients below.</p>
                        </div>
                    </div>

                    <div className='ml-4 sm:ml-6 border-l-2 border-slate-100 pl-4 sm:pl-10 pb-20'>
                        <div className='premium-card p-2 bg-slate-50/50 border-slate-200/50 inline-block'>
                            <Button
                                onClick={handleSendMail}
                                disabled={isSending}
                                label={
                                    <>
                                        {isSending ? <Loader2 className='animate-spin' size={20} /> : <Send size={20} />}
                                        <span className="tracking-tight">
                                            {isSending ? "Dispatching Sequence..." : `Execute Campaign for ${rows.length} Recipients`}
                                        </span>
                                    </>
                                }
                                variant='primary'
                                className='h-14 px-12 text-lg rounded-2xl shadow-2xl shadow-blue-900/30 w-full sm:w-auto'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMailPage;
