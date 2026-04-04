import React from 'react';
import Footer from '../LandingPage/Footer';
import FullLogo from "@/assets/LOGO/FULL-LOGO.png";
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { FileText, UserCheck, Ban, AlertOctagon, History, Mail } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-mesh min-h-screen flex flex-col font-sans">
            <header className="fixed top-0 left-0 right-0 flex items-center justify-between w-full px-6 md:px-12 py-4 glass-effect z-50">
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
                    <img src={FullLogo} alt="MailStitch Logo" className="h-12 w-auto object-contain" />
                </div>
                <Button 
                    label="Back to Home" 
                    variant="outline" 
                    className="text-sm border-slate-200"
                    onClick={() => navigate("/")}
                />
            </header>

            <main className="flex-grow pt-44 pb-20 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eef3f9] border border-[#dbe4ef] text-[#032e63] text-[10px] font-black uppercase tracking-widest mb-6">
                            <FileText size={14} /> Service Agreement
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-4">
                            Terms & Conditions
                        </h1>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em]">
                            Updated: April 04, 2026
                        </p>
                    </div>

                    <div className="glass-effect p-8 md:p-16 rounded-[4rem] border border-white shadow-2xl shadow-[#032e63]/5 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        
                        {/* 1. Introduction */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-indigo-600">01.</span> Acceptance of Terms
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed text-lg">
                                By accessing or using MailStitch ("Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the Service. These terms apply to all visitors, users, and others who access or use the Service.
                            </p>
                        </section>

                        {/* 2. User Accounts */}
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-indigo-600">02.</span> User Accounts
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <div className="w-12 h-12 bg-[#eef3f9] text-[#032e63] rounded-2xl flex items-center justify-center mb-4"><UserCheck size={24}/></div>
                                    <h4 className="font-black text-slate-900 mb-2">Responsibility</h4>
                                    <p className="text-sm text-slate-500 font-medium">You are responsible for safeguarding your password and for all activities that occur under your account.</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <div className="w-12 h-12 bg-[#eef3f9] text-[#032e63] rounded-2xl flex items-center justify-center mb-4"><History size={24}/></div>
                                    <h4 className="font-black text-slate-900 mb-2">Accuracy</h4>
                                    <p className="text-sm text-slate-500 font-medium">You must provide us with information that is accurate, complete, and current at all times.</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Prohibited Uses & Anti-Spam */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-indigo-600">03.</span> Prohibited Uses & Anti-Spam
                            </h2>
                            <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 space-y-4">
                                <p className="text-sm text-red-800 font-bold flex items-center gap-2"><Ban size={16}/> Zero Tolerance Spam Policy</p>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    MailStitch strictly prohibits the use of our service for sending unsolicited emails (Spam). You agree not to use the Service for any unlawful purpose or for the promotion of illegal activities. This includes, but is not limited to:
                                </p>
                                <ul className="list-disc list-inside text-sm text-slate-600 font-medium space-y-2 ml-4">
                                    <li>Sending marketing messages to recipients who have not opted-in.</li>
                                    <li>Using purchased or scraped email lists.</li>
                                    <li>Impersonating any person or entity.</li>
                                    <li>Distributing malware, viruses, or any other harmful code.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 4. Intellectual Property */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-indigo-600">04.</span> Intellectual Property
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                The Service and its original content, features, and functionality are and will remain the exclusive property of MailStitch and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of MailStitch.
                            </p>
                        </section>

                        {/* 5. Limitation of Liability */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-indigo-600">05.</span> Limitation of Liability
                            </h2>
                            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                                <p className="text-slate-700 font-medium leading-relaxed flex items-start gap-3">
                                    <AlertOctagon size={24} className="text-amber-600 shrink-0 mt-1" />
                                    In no event shall MailStitch, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                                </p>
                            </div>
                        </section>

                        {/* 6. Governing Law */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-indigo-600">06.</span> Governing Law
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                            </p>
                        </section>

                        {/* 7. Contact */}
                        <section className="pt-12 border-t border-slate-100">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2"><Mail size={20}/> Legal Inquiries</h3>
                                    <p className="text-slate-500 font-medium">For any legal questions regarding these Terms, please contact us.</p>
                                </div>
                                <a href="mailto:mailstitchservice@gmail.com" className="px-4 sm:px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-transform break-all text-center">
                                    mailstitchservice@gmail.com
                                </a>
                            </div>
                        </section>
                    </div>

                    <div className="mt-12 text-center text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">
                        &copy; 2026 MailStitch. All Rights Reserved.
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
