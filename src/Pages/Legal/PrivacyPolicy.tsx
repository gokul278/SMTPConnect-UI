import React from 'react';
import Footer from '../LandingPage/Footer';
import FullLogo from "@/assets/LOGO/FULL-LOGO.png";
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { ShieldCheck, Lock, Eye, Database, Globe, Bell } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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

            <main className="flex-grow pt-32 pb-20 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-6">
                            <ShieldCheck size={14} /> Global Privacy Standard
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em]">
                            Updated: March 24, 2026
                        </p>
                    </div>

                    <div className="glass-effect p-8 md:p-16 rounded-[4rem] border border-white shadow-2xl shadow-blue-900/5 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        
                        {/* 1. Introduction */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-blue-600">01.</span> Introduction
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed text-lg">
                                MailStitch ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by MailStitch. By using our service, you signify that you have read, understood, and agree to our collection, storage, and use of your personal information as described here.
                            </p>
                        </section>

                        {/* 2. Data Collection */}
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-blue-600">02.</span> Information We Collect
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4"><Database size={24}/></div>
                                    <h4 className="font-black text-slate-900 mb-2">Service Data</h4>
                                    <p className="text-sm text-slate-500 font-medium">SMTP credentials, configuration port details, and delivery logs required to route your emails.</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4"><Eye size={24}/></div>
                                    <h4 className="font-black text-slate-900 mb-2">Account Data</h4>
                                    <p className="text-sm text-slate-500 font-medium">Your name, email address, and profile preferences used for authentication and service updates.</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Cookies & AdSense */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-blue-600">03.</span> Cookies & Advertising
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                We use cookies and similar tracking technologies to track the activity on our Service and store certain information.
                            </p>
                            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 space-y-4">
                                <p className="text-sm text-blue-800 font-bold flex items-center gap-2"><Globe size={16}/> Google AdSense Integration</p>
                                <p className="text-sm text-slate-600 font-medium">
                                    Google, as a third-party vendor, uses cookies to serve ads on our Service. Google's use of the advertising cookie enables it and its partners to serve ads to our users based on their visit to our Service or other websites on the Internet. You may opt out of personalized advertising by visiting the Google Ads Settings page.
                                </p>
                            </div>
                        </section>

                        {/* 4. Security */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-blue-600">04.</span> Data Security
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                We implement a variety of security measures to maintain the safety of your personal information. Your SMTP credentials are never stored in plain text; they are encrypted using high-grade AES-256 encryption. Access to your personal data is restricted to authorized personnel only.
                            </p>
                            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 font-black text-sm border border-emerald-100">
                                <Lock size={18} /> End-to-End Encrypted Configuration Storage
                            </div>
                        </section>

                        {/* 5. Disclosure */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-blue-600">05.</span> Third-Party Disclosure
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, so long as those parties agree to keep this information confidential.
                            </p>
                        </section>

                        {/* 6. Contact */}
                        <section className="pt-12 border-t border-slate-100">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2"><Bell size={20}/> Privacy Inquiries</h3>
                                    <p className="text-slate-500 font-medium">Submit your data request or privacy concerns.</p>
                                </div>
                                <div className="px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-bold text-sm shadow-xl cursor-pointer hover:scale-105 transition-transform">
                                    mailstitchservice@gmail.com
                                </div>
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

export default PrivacyPolicy;
