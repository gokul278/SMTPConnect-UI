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

            <main className="flex-grow pt-44 pb-20 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eef3f9] border border-[#dbe4ef] text-[#032e63] text-[10px] font-black uppercase tracking-widest mb-6">
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
                                <span className="text-[#032e63]">02.</span> Information We Collect
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <div className="w-12 h-12 bg-[#032e63] text-white rounded-2xl flex items-center justify-center mb-4"><Database size={24}/></div>
                                    <h4 className="font-black text-slate-900 mb-2">Service Data</h4>
                                    <p className="text-sm text-slate-500 font-medium">SMTP credentials, configuration port details, and delivery logs required to route your emails.</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <div className="w-12 h-12 bg-[#032e63] text-white rounded-2xl flex items-center justify-center mb-4"><Eye size={24}/></div>
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
                            <div className="bg-[#eef3f9]/50 p-6 rounded-3xl border border-[#dbe4ef] space-y-4">
                                <p className="text-sm text-[#032e63] font-bold flex items-center gap-2"><Globe size={16}/> Google AdSense Integration</p>
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

                        {/* 5. Data Retention */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-blue-600">05.</span> Data Retention
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies. SMTP configuration data is stored until you choose to delete your account or update your settings.
                            </p>
                        </section>

                        {/* 6. GDPR & CCPA Compliance */}
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-blue-600">06.</span> Global Compliance (GDPR & CCPA)
                            </h2>
                            <div className="space-y-4">
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    Depending on your location, you may have the following data protection rights:
                                </p>
                                <ul className="list-disc list-inside text-slate-600 font-medium space-y-2 ml-4">
                                    <li><strong>The right to access:</strong> You can request copies of your personal data.</li>
                                    <li><strong>The right to rectification:</strong> You can request that we correct any information you believe is inaccurate.</li>
                                    <li><strong>The right to erasure:</strong> You can request that we erase your personal data, under certain conditions.</li>
                                    <li><strong>The right to restrict processing:</strong> You can request that we restrict the processing of your personal data.</li>
                                    <li><strong>The right to object to processing:</strong> You can object to our processing of your personal data.</li>
                                    <li><strong>The right to data portability:</strong> You can request that we transfer the data that we have collected to another organization.</li>
                                </ul>
                            </div>
                        </section>

                        {/* 7. Children's Privacy */}
                        <section className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                <span className="text-blue-600">07.</span> Children's Privacy
                            </h2>
                            <p className="text-slate-600 font-medium leading-relaxed">
                                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.
                            </p>
                        </section>

                        {/* 8. Contact */}
                        <section className="pt-12 border-t border-slate-100">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2"><Bell size={20}/> Privacy Inquiries</h3>
                                    <p className="text-slate-500 font-medium">For any questions regarding this Privacy Policy, please contact our Data Protection Officer.</p>
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

export default PrivacyPolicy;
