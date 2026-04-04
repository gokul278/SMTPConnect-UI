import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Unplug,
    LayoutTemplate, 
    ArrowUpFromLine, 
    Send,
    Play
} from 'lucide-react';
import Button from '../../Components/Button/Button';
import Footer from '../LandingPage/Footer';
import FullLogo from "@/assets/LOGO/FULL-LOGO.png";
import { useNavigate } from 'react-router-dom';

const HowItWorks: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="w-full bg-mesh min-h-screen flex flex-col font-sans selection:bg-[#032e63] selection:text-white">
            <header className={`fixed top-0 left-0 right-0 flex items-center justify-between w-full px-6 md:px-12 transition-all duration-500 z-50 ${scrolled ? "py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm" : "py-6 bg-transparent"}`}>
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
                    <img src={FullLogo} alt="MailStitch Logo" className="h-12 w-auto object-contain" />
                </div>

                <nav className="hidden lg:flex items-center gap-10">
                    <button 
                        onClick={() => navigate("/features")}
                        className="text-sm font-bold text-slate-500 hover:text-[#032e63] transition-colors uppercase tracking-widest cursor-pointer"
                    >
                        Features
                    </button>
                    <button 
                        onClick={() => navigate("/how-it-works")}
                        className="text-sm font-bold text-slate-500 hover:text-[#032e63] transition-colors uppercase tracking-widest cursor-pointer"
                    >
                        How it Works
                    </button>
                    <button 
                        onClick={() => navigate("/contact")}
                        className="text-sm font-bold text-slate-500 hover:text-[#032e63] transition-colors uppercase tracking-widest cursor-pointer"
                    >
                        Contact
                    </button>
                </nav>

                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => navigate("/signin")}
                        className="hidden md:block text-sm font-black text-slate-600 hover:text-[#032e63] transition-colors"
                    >
                        Login
                    </button>
                    <Button 
                        label="Join the Beta" 
                        className="bg-[#032e63] hover:bg-[#04387a] py-3 px-6 text-sm"
                        onClick={() => navigate("/signup")}
                    />
                </div>
            </header>

            <main className="flex-grow pt-44 pb-32 px-6 md:px-12">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-32">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-8"
                        >
                            <Play size={12} fill="currentColor" /> Simple. Powerful. Unified.
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-tight mb-8"
                        >
                            Four Steps to <br />
                            <span className="text-[#032e63] italic">Deployment.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed"
                        >
                            Setting up a bulk mailing operation shouldn't be complex. We've streamlined the workflow so you can focus on your message, not the infrastructure.
                        </motion.p>
                    </div>

                    {/* Timeline Flow */}
                    <div className="relative space-y-24">
                        {/* Connecting Line (Vertical on desktop) */}
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-100 hidden lg:block -z-10"></div>

                        {[
                            {
                                number: "01",
                                title: "Configure Your SMTP",
                                description: "Securely input your SMTP credentials from any provider. We use industry-standard AES-256 encryption to protect your sensitive data.",
                                icon: <Unplug className="text-[#032e63]" />,
                                color: "blue"
                            },
                            {
                                number: "02",
                                title: "Import Your Data",
                                description: "Upload your recipient lists via CSV or Excel. Our system automatically parses the data for use in your campaigns.",
                                icon: <ArrowUpFromLine className="text-emerald-600" />,
                                color: "emerald"
                            },
                            {
                                number: "03",
                                title: "Design Your Template",
                                description: "Use our intuitive @mention editor to build professional templates. Personalize content for every recipient with dynamic variables.",
                                icon: <LayoutTemplate className="text-[#032e63]" />,
                                color: "indigo"
                            },
                            {
                                number: "04",
                                title: "Launch & Monitor",
                                description: "Hit send and watch your campaign go live. Monitor real-time delivery logs and analytics from your dashboard.",
                                icon: <Send className="text-rose-600" />,
                                color: "rose"
                            }
                        ].map((step, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                                    <div className="text-6xl font-black text-slate-100 mb-4">{step.number}</div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-6">{step.title}</h3>
                                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                                <div className="lg:w-1/2 flex justify-center">
                                    <div className={`w-32 h-32 md:w-48 md:h-48 rounded-[3rem] bg-white shadow-premium border border-slate-100 flex items-center justify-center relative group`}>
                                        <div className={`w-12/12 h-12/12 flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                                            {React.cloneElement(step.icon as React.ReactElement<{ size?: number }>, { size: 48 })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-40 text-center glass-effect p-12 md:p-24 rounded-[4rem] border border-white shadow-2xl shadow-blue-900/5"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 italic">Ready to experience the flow?</h2>
                        <p className="text-lg text-slate-500 font-medium mb-12 max-w-xl mx-auto">
                            Join the developers who are taking control of their SMTP infrastructure with MailStitch.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button 
                                label="Create Your Account" 
                                className="px-10 py-5 text-lg font-black bg-[#032e63] hover:bg-[#04387a]"
                                onClick={() => navigate("/signup")}
                            />
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HowItWorks;
