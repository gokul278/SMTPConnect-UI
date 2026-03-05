
import Button from '@/Components/Button/Button';
import MentionEditor from '@/Components/Inputs/MentionEditor';
import TextInput from '@/Components/Inputs/TextInput';
import { Check, Lock, Plus, Send, Trash, } from 'lucide-react';
import React, { useState } from 'react';
import "react-quill-new/dist/quill.snow.css";


interface ConfigurationPageProps {

}

const SendMailPage: React.FC<ConfigurationPageProps> = () => {

    const [columns, setColumns] = React.useState<string[]>(["Email"]);

    const [rows, setRows] = React.useState<string[][]>([]);

    const [subjectTemplate, setSubjectTemplate] = useState("");
    const [bodyTemplate, setBodyTemplate] = useState("");

    return (
        <div className='h-full'>
            <div className='h-[10vh] flex justify-between items-end lg:items-center'>
                <div className='font-bold text-black text-lg md:text-2xl'>
                    Send Mail <Send width={30} height={30} className='inline-block mb-1 ml-2' />
                </div>
            </div>
            <div className='h-[90vh] pb-20 lg:pb-10  overflow-auto'>
                <div className='w-auto flex items-center gap-2'>
                    <div className='text-lg text-white bg-[#21c26f] border-[#53ef9f] flex justify-center items-center w-10 h-10 font-bold border-3 rounded-full'>
                        <Check width={18} height={18} />
                    </div>
                    <div className='text-base font-normal text-[#37353E]'>
                        Add the Mail Data
                    </div>
                </div>

                <div className='border-l-2 ml-5 my-3 pl-7'>
                    <div className='text-base font-normal bg-[#f9fafb] border border-gray-200 rounded-xl p-3 text-[#37353E]'>
                        <div>
                            Columns
                        </div>
                        <div className='flex flex-wrap py-2 gap-3'>
                            {
                                columns.map((col, index) => (
                                    <div key={index} className='px-4 py-2 bg-[#e6e6e6] rounded-lg flex justify-center items-center gap-1'>
                                        <div>
                                            <TextInput value={col}
                                                onChange={(e) => {
                                                    if (col !== "Email") {
                                                        const newColumns = [...columns];
                                                        newColumns[index] = e.target.value;
                                                        setColumns(newColumns);
                                                    }
                                                }}
                                                id={col} type='text' label='' required />
                                        </div>
                                        <div>
                                            {
                                                col !== "Email" && (
                                                    <Trash onClick={
                                                        () => {
                                                            const newColumns = columns.filter((_, i) => i !== index);
                                                            setColumns(newColumns);
                                                        }
                                                    } width={20} height={20} className='inline-block mb-1 ml-2 cursor-pointer' />
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            <div onClick={() => {
                                setColumns([...columns, ""]);
                            }} className='p-2 bg-[#e6e6e6] rounded-lg flex justify-center items-center gap-1 cursor-pointer'>
                                <Plus width={25} height={25} />
                            </div>
                        </div>

                        <div className='mt-3'>
                            Row Data
                        </div>
                        <div className="my-4 bg-[#f9fafb] border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                            <div className="overflow-auto max-h-100">
                                <table className="w-full text-sm">

                                    {/* HEADER */}
                                    <thead className="bg-gray-50 sticky top-0 z-10">
                                        <tr className="text-gray-600 text-sm uppercase tracking-wider">
                                            {columns.map((col, index) => (
                                                <th
                                                    key={index}
                                                    className="px-4 py-3 text-left font-semibold"
                                                >
                                                    {col}
                                                </th>
                                            ))}

                                            <th className="px-4 py-3 w-16 text-center font-semibold">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* BODY */}
                                    <tbody className="divide-y">
                                        {rows.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className="hover:bg-[#f4f4f4] border-[#e6e6e6] transition"
                                            >
                                                {columns.map((col, colIndex) => (
                                                    <td key={colIndex} className="px-3 py-2">
                                                        <TextInput
                                                            id={`${rowIndex}-${col}`}
                                                            value={row[colIndex] || ""}
                                                            onChange={(e) => {
                                                                const newRows = [...rows];
                                                                newRows[rowIndex][colIndex] = e.target.value;
                                                                setRows(newRows);
                                                            }}
                                                            placeholder={`Enter ${col}`}
                                                        />
                                                    </td>
                                                ))}

                                                {
                                                    rows.length > 1 && (
                                                        <td className="px-3 py-2">
                                                            <div className="flex justify-center">
                                                                <button
                                                                    onClick={() => {
                                                                        const newRows = rows.filter((_, i) => i !== rowIndex);
                                                                        setRows(newRows);
                                                                    }}
                                                                    className="p-2 rounded-lg cursor-pointer hover:bg-red-50 transition group"
                                                                >
                                                                    <Trash
                                                                        size={16}
                                                                        className="text-gray-400 group-hover:text-red-500"
                                                                    />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        ))}

                                        {/* EMPTY STATE */}
                                        {rows.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={columns.length + 1}
                                                    className="text-center py-6 text-gray-400"
                                                >
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* FOOTER */}
                            <div className="flex justify-between items-center p-3 border-t border-[#e6e6e6] bg-gray-50">
                                <div className="text-xs text-gray-500">
                                    {rows.length} rows
                                </div>

                                <button
                                    onClick={() => {
                                        const newRow: any = {};
                                        columns.forEach((_, i) => {
                                            newRow[i] = "";
                                        });
                                        setRows([...rows, newRow]);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm bg-[#e6e6e6] cursor-pointer rounded-lg hover:bg-[#c7c7c7] transition"
                                >
                                    <Plus size={16} />
                                    Add Row
                                </button>
                            </div>
                        </div>

                        <div className='mt-3 flex justify-end'>
                            <Button label={<div className='flex justify-center items-center gap-2'>Save and Next</div>} variant='primary' className='w-10/10 md:w-auto' />
                        </div>
                    </div>

                </div>

                <div className='w-auto flex items-center gap-2'>
                    <div className='text-lg text-white bg-[#04387a] border-[#629ce8] flex justify-center items-center w-10 h-10 font-bold border-3 rounded-full'>
                        2
                    </div>
                    <div className='text-base font-normal text-[#37353E]'>
                        Configure Mail Data
                    </div>
                </div>

                <div className='border-l-2 ml-5 my-3 pl-7'>
                    <div className=' flex gap-2 flex-col text-base font-normal bg-[#f9fafb] border border-gray-200 rounded-xl p-3 text-[#37353E]'>
                        <div className='font-bold'>
                            Mail Subject
                        </div>
                        <div>
                            <MentionEditor
                                value={subjectTemplate}
                                onChange={setSubjectTemplate}
                                variables={columns}
                            // label="Mail Subject"
                            />
                        </div>
                        <div className='font-bold'>
                            Mail Body
                        </div>
                        <div>
                            <MentionEditor
                                value={bodyTemplate}
                                onChange={setBodyTemplate}
                                variables={columns}
                            // label="Mail Body"
                            />
                        </div>

                    </div>
                </div>

                <div className='w-auto flex items-center gap-2'>
                    <div className='text-lg text-white bg-[#04387a] border-[#629ce8] flex justify-center items-center w-10 h-10 font-bold border-3 rounded-full'>
                        <Lock width={18} height={18} />
                    </div>
                    <div className='text-base font-normal text-[#37353E]'>
                        Preview Mail Template
                    </div>
                </div>

                <div className='border-l-2 ml-5 my-3 pl-7'>
                    <div className='text-sm font-normal bg-[#f9fafb] border border-gray-200 rounded-xl p-3 text-[#37353E]'>
                        <div className='font-bold'>
                            Mail Subject
                        </div>
                        <div className="mt-1 ql-editor">
                            <div dangerouslySetInnerHTML={{ __html: subjectTemplate }} />
                        </div>
                        <div className='mt-3 font-bold'>
                            Mail Body
                        </div>
                        <div className="mt-1 ql-editor">
                            <div dangerouslySetInnerHTML={{ __html: bodyTemplate }} />
                        </div>
                    </div>

                </div>

                <div className='w-auto flex items-center gap-2'>
                    <div className='text-lg text-white bg-[#04387a] border-[#629ce8] flex justify-center items-center w-10 h-10 font-bold border-3 rounded-full'>
                        <Lock width={18} height={18} />
                    </div>
                    <div className='text-base font-normal text-[#37353E]'>
                        Send Mail
                    </div>
                </div>

                <div className='border-l-2 ml-5 my-3 pl-7'>
                    <Button label={<div className='flex w-10/10 justify-center items-center gap-2'>Send Mail</div>} variant='primary' className='w-10/10 md:w-auto' />

                </div>

            </div>
        </div>
    );
};

export default SendMailPage;