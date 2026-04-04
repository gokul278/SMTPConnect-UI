import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LandingImg from "@/assets/Images/LandingImg.png"
import EmailServiceImg from "@/assets/Images/EmailService.png";
import FullLogo from "@/assets/LOGO/FULL-LOGO.png";
import { 
    ArrowRight, 
    ArrowUpFromLine, 
    Check, 
    ChevronRight, 
    FileSpreadsheet, 
    LayoutTemplate, 
    MailPlus, 
    Send, 
    Settings2, 
    ShieldCheck, 
    SquarePen, 
    Unplug, 
    Activity,
    Zap,
    Globe,
    Cpu,
    Plus,
    Minus
} from 'lucide-react';
import Button from '../../Components/Button/Button';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const FAQItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-premium transition-all overflow-hidden"
        >
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-8 flex items-center justify-between text-left group"
            >
                <h4 className="text-xl font-black text-slate-900 group-hover:text-[#032e63] transition-colors">{q}</h4>
                <div className={`p-2 rounded-full ${isOpen ? "bg-[#032e63] text-white" : "bg-slate-100 text-slate-400"} transition-colors`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </div>
            </button>
            <motion.div 
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed">
                    {a}
                </div>
            </motion.div>
        </motion.div>
    );
};

const LadingPage: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const ChooseSMTP = [
        {
            Icon: <MailPlus size={28} />,
            label: "Bring Your Own SMTP",
            description: "Connect Gmail, Outlook, or custom servers with zero friction.",
            color: "slate"
        },
        {
            Icon: <Settings2 size={28} />,
            label: "Full Header Control",
            description: "Customize From, Reply-To, CC, and BCC for every campaign.",
            color: "indigo"
        },
        {
            Icon: <Send size={28} />,
            label: "No Platform Branding",
            description: "Your emails look 100% yours. No 'Sent via' footprints.",
            color: "violet"
        },
        {
            Icon: <Unplug size={28} />,
            label: "Zero Vendor Lock-in",
            description: "Switch providers instantly. Your templates and data stay with you.",
            color: "cyan"
        }
    ];

    const bentoFeatures = [
        {
            title: "Mention Editor",
            description: "Personalize at scale with live @mentions and dynamic variables.",
            icon: <SquarePen className="text-[#032e63]" />,
            className: "md:col-span-2 md:row-span-2 bg-[#eef3f9]/50",
            image: EmailServiceImg
        },
        {
            title: "Bulk Precision",
            description: "Dispatch thousands of emails through your own pipe.",
            icon: <Zap className="text-amber-600" />,
            className: "md:col-span-1 md:row-span-1 bg-amber-50/50"
        },
        {
            title: "Full Governance",
            description: "Encrypted credentials and local data ownership.",
            icon: <ShieldCheck className="text-emerald-600" />,
            className: "md:col-span-1 md:row-span-1 bg-emerald-50/50"
        },
        {
            title: "Live Analytics",
            description: "Monitor real-time delivery status and logs.",
            icon: <Activity className="text-rose-600" />,
            className: "md:col-span-1 md:row-span-2 bg-rose-50/50"
        },
        {
            title: "Data Freedom",
            description: "Seamless CSV and Excel imports for mass mailing.",
            icon: <FileSpreadsheet className="text-violet-600" />,
            className: "md:col-span-1 md:row-span-1 bg-violet-50/50"
        }
    ];

    return (
        <div className="w-full bg-slate-50 min-h-screen selection:bg-[#eef3f9] selection:text-[#032e63] font-sans">
            {/* Trendy Header */}
            <header className={`fixed top-0 left-0 right-0 flex items-center justify-between w-full px-6 md:px-12 transition-all duration-500 z-50 ${scrolled ? "py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm" : "py-6 bg-transparent"}`}>
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                    <img src={FullLogo} alt="MailStitch Logo" className="h-12 md:h-14 w-auto object-contain transition-transform hover:scale-105" />
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

                <div className='flex gap-4 items-center'>
                    <button
                        onClick={() => navigate("/signin")}
                        className="text-sm font-black text-slate-900 hover:text-[#032e63] transition-colors hidden sm:block px-4 py-2"
                    >
                        Login
                    </button>
                    <Button
                        className='px-6 py-3 font-black text-sm shadow-xl shadow-blue-500/20 rounded-2xl bg-[#032e63] hover:bg-[#04387a]'
                        label="Get Started"
                        onClick={() => navigate("/signup")}
                        variant="primary"
                    />
                </div>
            </header>

            {/* Hero Section - The "Trendy" Re-imagining */}
            <section className="relative pt-48 pb-32 px-6 md:px-12 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-[#032e63] animate-pulse"></span>
                        V1.2 Now Live: The Custom SMTP Engine
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tight leading-[0.9] mb-10">
                        Mail <span className="text-[#032e63] italic">Stitched </span> <br />
                        <span className="relative">
                            By You.
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#dbe4ef] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
                            </svg>
                        </span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-14">
                        Tired of vendor lock-in and high premiums? Connect your own SMTP and send bulk campaigns with elite-level personalization.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center mb-24">
                        <Button
                            className="px-10 py-5 text-lg font-black shadow-2xl shadow-[#032e63]/40 rounded-[2rem] bg-[#032e63] hover:bg-[#04387a]"
                            label="Deploy Your First Campaign"
                            onClick={() => navigate("/signup")}
                        />
                        <button
                            className="group px-10 py-5 text-lg font-black text-slate-900 hover:bg-white hover:shadow-xl rounded-[2rem] transition-all flex items-center justify-center gap-2"
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            See why devs love us <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Feature Visualization */}
                    <div className="relative max-w-6xl mx-auto">
                        <div className="absolute -inset-10 bg-gradient-to-r from-[#032e63]/20 to-indigo-500/20 blur-[100px] -z-10 rounded-full"></div>
                        <div className="bg-white p-2 rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden transform hover:-rotate-1 transition-transform duration-700">
                            <img src={LandingImg} alt="Dashboard Preview" className="w-full h-auto rounded-[2.5rem]" />
                        </div>
                        
                        {/* Floating Badges */}
                        <div className="absolute -top-10 -right-10 hidden lg:block p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-premium border border-slate-100 animate-bounce duration-[3000ms]">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-green-100 text-green-600 rounded-2xl"><Check size={24} strokeWidth={3} /></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Status</p>
                                    <p className="text-xl font-black text-slate-900">Campaign Sent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10"></div>
            </section>

            {/* Social Proof Bar */}
            <div className="py-12 bg-white border-y border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-2 font-black text-2xl tracking-tighter"><Globe /> GLOBAL</div>
                    <div className="flex items-center gap-2 font-black text-2xl tracking-tighter"><Cpu /> ENGINE.X</div>
                    <div className="flex items-center gap-2 font-black text-2xl tracking-tighter"><Zap /> RAPID</div>
                    <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-[#032e63]"><ShieldCheck /> SECURE</div>
                </div>
            </div>

            {/* The Bento Section */}
            <section id="features" className="py-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6 italic">Built for users who refuse lock-in.</h2>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed">
                                MailStitch isn't another subscription trap. It's an open-ended delivery platform that puts you back in the driver's seat.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-12 bg-[#032e63] rounded-[3rem] text-white flex flex-col justify-end min-h-[240px] shadow-xl shadow-[#032e63]/20">
                                <p className="text-6xl font-black mb-2">100%</p>
                                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Data Ownership</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 auto-rows-[240px]">
                        {bentoFeatures.map((feature, idx) => (
                            <div key={idx} className={`${feature.className} p-10 rounded-[3rem] border border-slate-200/50 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 overflow-hidden relative`}>
                                <div className="relative z-10 font-bold">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">{feature.title}</h3>
                                    <p className="text-slate-500 max-w-[200px] leading-snug">{feature.description}</p>
                                </div>
                                {feature.image && (
                                    <img 
                                        src={feature.image} 
                                        alt={feature.title} 
                                        className="absolute bottom-0 right-0 w-3/4 translate-y-12 translate-x-12 group-hover:translate-y-6 group-hover:translate-x-6 transition-transform rounded-2xl shadow-2xl skew-y-3" 
                                    />
                                )}
                            </div>
                        ))}
                        
                        {/* Call to Action Card */}
                        <div className="md:col-span-2 md:row-span-1 bg-slate-900 p-10 rounded-[3rem] flex items-center justify-between group cursor-pointer" onClick={() => navigate("/signup")}>
                            <div>
                                <h3 className="text-3xl font-black text-white mb-2">Ready to switch?</h3>
                                <p className="text-slate-400 font-medium">Join 500+ developers today.</p>
                            </div>
                            <div className="w-16 h-16 bg-[#032e63] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <ChevronRight size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Props Section */}
            <section className="py-32 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2">
                        <img src={EmailServiceImg} alt="Service" className="w-full rounded-[4rem] shadow-premium" />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-12">Fine-tuned for <span className="text-indigo-600">Precision.</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {ChooseSMTP.map((item, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center`}>
                                        {item.Icon}
                                    </div>
                                    <h4 className="text-lg font-black text-slate-800 leading-tight">{item.label}</h4>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works Module */}
            <section id="how-it-works" className="py-32 px-6 md:px-12 bg-slate-900 rounded-t-[5rem]">
                <div className="max-w-7xl mx-auto text-center mb-24">
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-8">Four steps to <span className="text-[#eef3f9] italic text-opacity-80">launch.</span></h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">From custom server configuration to your first successful dispatch in under 5 minutes.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { title: "Connect", desc: "Link your SMTP server credentials.", icon: <Unplug /> },
                        { title: "Design", desc: "Build templates in our smart editor.", icon: <LayoutTemplate /> },
                        { title: "Import", desc: "Upload your recipient list seamlessly.", icon: <ArrowUpFromLine /> },
                        { title: "Dispatch", desc: "personalized mail to thousands.", icon: <Send /> }
                    ].map((step, idx) => (
                        <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-[3rem] text-center hover:bg-white/10 transition-all group">
                            <div className="w-16 h-16 bg-[#032e63]/20 text-[#eef3f9] rounded-3xl flex items-center justify-center mx-auto mb-8 scale-110 group-hover:scale-125 transition-transform duration-500">
                                {React.cloneElement(step.icon as React.ReactElement<any>, { size: 32 })}
                            </div>
                            <h4 className="text-white text-2xl font-black mb-3">{step.title}</h4>
                            <p className="text-slate-400 text-sm font-medium">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-32 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 italic">Got Questions?</h2>
                        <p className="text-xl text-slate-500 font-medium">Everything you need to know about MailStitch.</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "What exactly is MailStitch?",
                                a: "MailStitch is a self-hosted email dispatch interface that allows you to connect your own SMTP servers and send personalized bulk campaigns with total control and privacy."
                            },
                            {
                                q: "Can I use my own SMTP/Gmail?",
                                a: "Yes! That's the core of MailStitch. You can bring any SMTP provider including Gmail, Outlook, Amazon SES, or your own private server."
                            },
                            {
                                q: "How is my data secured?",
                                a: "We use high-grade AES-256 encryption to protect your SMTP credentials. Your recipient lists and campaign data never leave the platform without your consent."
                            },
                            {
                                q: "Is there a limit on how many emails I can send?",
                                a: "MailStitch doesn't impose sending limits. Your limits are determined solely by your SMTP provider's policies and capacity."
                            },
                            {
                                q: "Do I need technical skills to use it?",
                                a: "While having some SMTP knowledge helps, we've designed our interface to be intuitive for everyone. If you can fill out a form, you can send a campaign."
                            }
                        ].map((faq, idx) => (
                            <FAQItem key={idx} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LadingPage;
