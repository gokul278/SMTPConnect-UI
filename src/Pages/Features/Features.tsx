import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    MailPlus,
    Settings2,
    SquarePen,
    Zap,
    ShieldCheck,
    Activity,
    CheckCircle2
} from 'lucide-react';
import Button from '../../Components/Button/Button';
import Footer from '../LandingPage/Footer';
import FullLogo from "@/assets/LOGO/FULL-LOGO.png";
import { useNavigate } from 'react-router-dom';

const Features: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const mainFeatures = [
        {
            title: "Bring Your Own SMTP",
            description: "Total freedom to connect any SMTP provider—Gmail, Outlook, Amazon SES, or your own private server. No more vendor lock-in.",
            icon: <MailPlus className="text-blue-600" />,
            color: "bg-blue-50"
        },
        {
            title: "Mention Editor",
            description: "Personalize every single email with our advanced @mention system. Inject recipient names, custom data, or dynamic variables effortlessly.",
            icon: <SquarePen className="text-indigo-600" />,
            color: "bg-indigo-50"
        },
        {
            title: "Full Header Control",
            description: "Professional-grade control over your email headers. Customize From, Reply-To, CC, and BCC fields for every campaign.",
            icon: <Settings2 className="text-emerald-600" />,
            color: "bg-emerald-50"
        },
        {
            title: "Real-time Analytics",
            description: "Detailed delivery logs and status tracking. Know exactly when your emails are delivered, opened, or if they bounce.",
            icon: <Activity className="text-rose-600" />,
            color: "bg-rose-50"
        },
        {
            title: "Data Sovereignty",
            description: "Your data stays with you. We use AES-256 encryption for all stored credentials, and you own 100% of your recipient lists.",
            icon: <ShieldCheck className="text-amber-600" />,
            color: "bg-amber-50"
        },
        {
            title: "Bulk Precision",
            description: "Engineered for high-volume dispatch. Send thousands of emails with consistent performance and zero platform branding.",
            icon: <Zap className="text-violet-600" />,
            color: "bg-violet-50"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

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
                        label="Get Started"
                        className="bg-[#032e63] hover:bg-[#04387a] py-3 px-6 text-sm"
                        onClick={() => navigate("/signup")}
                    />
                </div>
            </header>

            <main className="flex-grow pt-44 pb-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-8"
                        >
                            <Zap size={14} /> The SMTP Engine Re-imagined
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-tight mb-8"
                        >
                            Powering Your <br />
                            <span className="text-[#032e63] italic">Communications.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed"
                        >
                            MailStitch provides the infrastructure and the interface. You provide the power. Explore the features that make us the choice for modern developers.
                        </motion.p>
                    </div>

                    {/* Features Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {mainFeatures.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="group p-10 rounded-[3rem] bg-white border border-slate-100 shadow-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    {React.cloneElement(feature.icon as React.ReactElement<{ size?: number }>, { size: 32 })}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Specialized Section */}
                    <div className="mt-32 bg-[#032e63] rounded-[4rem] p-8 md:p-20 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 translate-x-20"></div>
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black mb-8">Ready for Enterprise Scale?</h2>
                                <p className="text-blue-100 text-lg font-medium leading-relaxed mb-10">
                                    Whether you're sending 100 or 100,000 emails, our architecture is designed to handle the load with precision and security.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "Encrypted Credential Storage",
                                        "Dynamic Template Personalization",
                                        "CSV/Excel Bulk Recipient Management",
                                        "Zero-Vendor Lock-in SMTP Architecture"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 font-bold">
                                            <CheckCircle2 className="text-blue-400" size={20} /> {item}
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    label="Start Sending Now"
                                    className="mt-12 bg-[#275391] text-[#032e63]  hover:text-[#275391] hover:bg-[#dbe4ef] py-4 px-10 text-base border-none"
                                    onClick={() => navigate("/signup")}
                                />
                            </div>
                            <div className="hidden lg:block">
                                <div className="relative">
                                    <div className="absolute -inset-10 bg-blue-500/20 blur-3xl rounded-full"></div>
                                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[3rem] shadow-2xl">
                                        <div className="space-y-4">
                                            <div className="h-4 bg-white/20 rounded-full w-3/4"></div>
                                            <div className="h-4 bg-white/20 rounded-full w-1/2"></div>
                                            <div className="h-32 bg-white/10 rounded-3xl mt-8"></div>
                                            <div className="flex gap-4 mt-8">
                                                <div className="h-10 bg-blue-500 rounded-xl w-1/3"></div>
                                                <div className="h-10 bg-white/10 rounded-xl w-1/4"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Features;
