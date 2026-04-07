import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Target, Rocket, Mail, Lock, Globe } from 'lucide-react';
import Footer from '../LandingPage/Footer';
import FullLogo from "@/assets/LOGO/FULL-LOGO.png";
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-mesh min-h-screen flex flex-col font-sans selection:bg-[#032e63] selection:text-white">
            <Helmet>
                <title>About MailStitch – Our Mission for Email Data Sovereignty</title>
                <meta name="description" content="Learn more about MailStitch's mission to democratize bulk email delivery by putting the power of SMTP back into the hands of developers and businesses." />
                <link rel="canonical" href="https://www.mailstitch.online/about" />
            </Helmet>
            <header className="fixed top-0 left-0 right-0 flex items-center justify-between w-full px-6 md:px-12 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-50">
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
                    <img src={FullLogo} alt="MailStitch Logo" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate("/features")} className="hidden md:block text-sm font-bold text-slate-500 hover:text-[#032e63] transition-colors uppercase tracking-widest">Features</button>
                    <Button 
                        label="Get Started" 
                        className="bg-[#032e63] text-white py-2 px-6 text-sm rounded-xl"
                        onClick={() => navigate("/signup")}
                    />
                </div>
            </header>

            <main className="flex-grow pt-40 pb-20 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#032e63] text-[10px] font-black uppercase tracking-widest mb-6"
                        >
                            <Users size={14} /> Our Mission & Vision
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8"
                        >
                            About <span className="text-[#032e63] italic">MailStitch.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-500 font-medium leading-relaxed"
                        >
                            We're on a mission to democratize bulk email delivery by putting the power of SMTP back into the hands of developers and businesses.
                        </motion.p>
                    </div>

                    {/* Detailed Content Sections - Critical for AdSense */}
                    <div className="space-y-24">
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                    <Target className="text-[#032e63]" /> Why We Exist
                                </h2>
                                <p className="text-slate-600 font-medium leading-relaxed text-lg">
                                    In an era of increasing vendor lock-in and skyrocketing premiums for simple email delivery, MailStitch was born from a simple realization: <strong>The infrastructure already exists.</strong> Most businesses already have access to high-quality SMTP servers through their workspace providers, yet they pay thousands for "managed" interfaces.
                                </p>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    MailStitch provides the bridge. We offer a professional, high-performance interface that connects directly to <em>your</em> chosen delivery pipe. Whether it's Gmail, Outlook, or a private enterprise server, we give you the tools to "stitch" together your perfect campaign without the platform tax.
                                </p>
                            </div>
                            <div className="bg-slate-100 rounded-[3rem] p-12 aspect-square flex items-center justify-center">
                                <Rocket size={120} className="text-[#032e63] opacity-20" />
                            </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 bg-[#032e63] rounded-[3rem] p-12 aspect-square flex flex-col justify-center text-white">
                                <Lock size={64} className="mb-6 opacity-50" />
                                <h3 className="text-2xl font-black mb-4">Security First</h3>
                                <p className="font-medium opacity-80 leading-relaxed">
                                    Your SMTP credentials are the keys to your communication. We treat them with the highest level of respect, utilizing AES-256 encryption and local processing where possible.
                                </p>
                            </div>
                            <div className="order-1 md:order-2 space-y-6">
                                <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                                    <ShieldCheck className="text-emerald-600" /> Our Core Values
                                </h2>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex-shrink-0 flex items-center justify-center mt-1 font-bold text-xs">1</div>
                                        <p className="text-slate-600 font-medium leading-snug"><strong>Transparency:</strong> No hidden "sent via" signatures or data harvesting. Your emails remain 100% yours.</p>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex-shrink-0 flex items-center justify-center mt-1 font-bold text-xs">2</div>
                                        <p className="text-slate-600 font-medium leading-snug"><strong>Ownership:</strong> You own your recipient lists, your server connections, and your templates. Zero vendor lock-in.</p>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex-shrink-0 flex items-center justify-center mt-1 font-bold text-xs">3</div>
                                        <p className="text-slate-600 font-medium leading-snug"><strong>Performance:</strong> Engineered for precision. From @mention personalization to real-time delivery tracking.</p>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="text-center space-y-8 bg-slate-50 p-12 md:p-20 rounded-[4rem] border border-slate-100">
                            <Globe size={48} className="mx-auto text-[#032e63] mb-4" />
                            <h2 className="text-4xl font-black text-slate-900 leading-tight">Serving Developers <br /> Worldwide.</h2>
                            <p className="max-w-2xl mx-auto text-slate-500 font-medium leading-relaxed">
                                MailStitch is used by individuals, startups, and established enterprises who value control over their digital outreach. We are a small, dedicated team passionate about building clean, efficient, and ethical software for the modern web.
                            </p>
                            <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
                                <a href="mailto:mailstitchservice@gmail.com" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                    <Mail size={18} /> Contact the Team
                                </a>
                                <Button 
                                    label="Read Our Guides" 
                                    variant="outline" 
                                    className="px-8 py-4 border-slate-200"
                                    onClick={() => navigate("/guides")}
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
