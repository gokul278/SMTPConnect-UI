import React, { useEffect, useState } from 'react';
import LandingImg from "@/assets/Images/LandingImg.png"
import EmailServiceImg from "@/assets/Images/EmailService.png";
import HowItWorks from "@/assets/Images/HowItWorks.svg";
import { ArrowUpFromLine, FileSpreadsheet, FingerprintPattern, LayoutPanelTop, LayoutTemplate, LockKeyhole, Logs, Mail, MailPlus, Mails, Send, Settings2, ShieldCheck, SquarePen, Unplug } from 'lucide-react';
import Button from '../../Components/Button/Button';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

interface LadingPageProps {

}

const LadingPage: React.FC<LadingPageProps> = () => {

    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); // change after 50px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const ChooseSMTP = [
        {
            Icon: <MailPlus size={50} color='#f8bc27' />,
            label: "Bring your own SMTP (Gmail / Outlook / Custom)",
        },
        {
            Icon: <Settings2 size={50} color='#f8bc27' />,
            label: "Full control over From, To, CC, Subject",
        },
        {
            Icon: <Send size={50} color='#f8bc27' />,
            label: "No platform branding",
        },
        {
            Icon: <Unplug size={50} color='#f8bc27' />,
            label: "No vendor lock-in",
        },
        {
            Icon: <FingerprintPattern size={50} color='#f8bc27' />,
            label: "Simple, fast & secure",
        },
    ]


    const keyfeatures = [
        {
            title: "Custom SMTP Integration",
            description: "Connect using email, app password, host & port",
            logo: <LockKeyhole size={20} color="#f8bc27" />,
        },
        {
            title: "Rich Email Template Editor",
            description: "Create templates using a modern text editor",
            logo: <LayoutPanelTop size={20} color="#f8bc27" />,
        },
        {
            title: "Dynamic Variables",
            description: "Personalize emails with {{name}}, {{address}}, and more",
            logo: <SquarePen size={20} color="#f8bc27" />,
        },
        {
            title: "Bulk Email Sending",
            description: "Send emails to multiple recipients in one click",
            logo: <Mails size={20} color="#f8bc27" />,
        },
        {
            title: "CSV / Excel Upload",
            description: "Import recipient data easily",
            logo: <FileSpreadsheet size={20} color="#f8bc27" />,
        },
        {
            title: "Email Logs & Status",
            description: "Track sent, failed, and pending emails",
            logo: <Logs size={20} color="#f8bc27" />,
        },
    ]

    const howWorks = [
        {
            title: "Connect Your SMTP",
            description: "Add your email credentials and test connection",
            logo: <Unplug size={20} />,
            backgroundColor: "#00bc7d",
        },
        {
            title: "Create Template",
            description: "Design email content using the editor",
            logo: <LayoutTemplate size={20} />,
            backgroundColor: "#fe9a00",
        },
        {
            title: "Upload Recipients",
            description: "Add recipient data via CSV or form",
            logo: <ArrowUpFromLine size={20} />,
            backgroundColor: "#f6339a",
        },
        {
            title: "Send Emails",
            description: "Send personalized emails instantly or schedule them",
            logo: <Mail size={20} />,
            backgroundColor: "#00bc7d",
        },
    ]



    return (
        <div className="w-full bg-mesh min-h-screen selection:bg-blue-100 selection:text-blue-900">
            {/* Optimized Glass Header */}
            <header className={`fixed top-0 left-0 right-0 flex items-center justify-between w-full py-4 px-6 md:px-12 transition-all duration-300 z-50 ${scrolled ? "glass-effect shadow-lg py-3" : "bg-transparent"}`}>
                <div className='flex items-center gap-2'>
                    <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
                        <Mail size={22} />
                    </div>
                    <div className='text-xl md:text-2xl tracking-tighter'>
                        <span className='font-black text-slate-900'>SMTP</span>
                        <span className="font-medium text-slate-500">Connect</span>
                    </div>
                </div>
                <div className='flex gap-3 md:gap-6 items-center'>
                    <button
                        onClick={() => navigate("/signin")}
                        className="text-sm cursor-pointer font-bold text-slate-600 hover:text-blue-600 transition-colors hidden sm:block"
                    >
                        Sign In
                    </button>
                    <Button
                        className='px-6 py-2.5 cursor-pointer font-bold text-sm shadow-xl shadow-blue-500/20'
                        label="Get Started"
                        onClick={() => navigate("/signup")}
                        variant="primary"
                    />
                </div>
            </header>

            {/* Premium Hero Section */}
            <section className="pt-32 pb-20 px-6 md:px-12 overflow-hidden relative">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <ShieldCheck size={14} /> Powering 10k+ Reliable Deliveries
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-gradient mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Own Your <span className="text-blue-600">Emails.</span> <br />
                        Skip The Limits.
                    </h1>
                    <p className="max-w-2xl text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        The world's most flexible bulk email engine. Bring your own SMTP (Gmail, Outlook, or Custom) and send unlimited campaigns with zero vendor lock-in.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <Button
                            className="px-10 py-4 text-base font-black shadow-2xl shadow-blue-500/30"
                            label="Start Sending Free"
                            onClick={() => navigate("/signup")}
                        />
                        <button
                            className="px-10 py-4 text-base font-black text-slate-700 hover:bg-slate-100 rounded-2xl transition-all"
                            onClick={() => {
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Explore Features
                        </button>
                    </div>

                    {/* Hero Image / Card */}
                    <div className="relative w-full max-w-5xl mx-auto group animate-in zoom-in fade-in duration-1000 delay-300">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-[2.5rem] blur-2xl group-hover:opacity-75 transition-opacity"></div>
                        <div className="relative glass-effect p-2 rounded-[2rem] border-slate-200/50 shadow-premium overflow-hidden">
                            <img
                                src={LandingImg}
                                alt="SMTPConnect Interface"
                                className="w-full h-auto rounded-[1.8rem] shadow-sm transform group-hover:scale-[1.01] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl"></div>
            </section>

            {/* Why Choose Section */}
            <section id="features" className="py-32 px-6 md:px-12 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Freedom From Platforms</h2>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                            Most email tools force you into their expensive ecosystems. SMTP Connect is designed for power users who want control.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ChooseSMTP.map((item, idx) => (
                            <div key={idx} className="premium-card p-8 group hover:border-blue-200">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-premium">
                                    {item.Icon}
                                </div>
                                <h3 className="text-xl font-black text-slate-800 mb-3">{item.label}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed italic text-sm">
                                    "Industry standard protocols meet elite engineering."
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Bento / Highlight Section */}
            <section className="py-32 px-6 md:px-12 bg-slate-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                            Engineered for <br /><span className="text-blue-600">Unlimited</span> Potential.
                        </h2>
                        <div className="space-y-6">
                            {keyfeatures.map((feature, idx) => (
                                <div key={idx} className="flex gap-4 items-start p-4 hover:bg-white hover:shadow-md rounded-2xl transition-all border border-transparent hover:border-slate-100">
                                    <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600 mt-1">
                                        {feature.logo}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 mb-1">{feature.title}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative lg:mt-0">
                        <div className="absolute -inset-10 bg-blue-500/5 rounded-full blur-3xl"></div>
                        <img src={EmailServiceImg} alt="Key Features" className="relative w-full rounded-3xl shadow-premium border border-white" />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-32 px-6 md:px-12 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12">The 4-Step <br />Blueprint</h2>
                        <div className="space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 before:border-none">
                            {howWorks.map((item, idx) => (
                                <div key={idx} className="relative pl-16 group">
                                    <div
                                        className="absolute left-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-premium group-hover:scale-110 z-10"
                                        style={{ backgroundColor: item.backgroundColor, boxShadow: `0 10px 15px -3px ${item.backgroundColor}44` }}
                                    >
                                        {item.logo}
                                    </div>
                                    <h4 className="text-xl font-black text-slate-800 mb-2">{item.title}</h4>
                                    <p className="text-slate-500 font-medium max-w-md">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2 p-8 bg-slate-50 rounded-[3rem] border border-slate-100 relative group">
                        <div className="absolute -inset-4 bg-white/50 backdrop-blur-3xl rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img src={HowItWorks} alt="How It Works" className="relative w-full transform group-hover:rotate-1 transition-transform" />
                    </div>
                </div>
            </section>

            {/* Final CTA Module */}
            <section className="py-32 px-6 md:px-12 relative overflow-hidden">
                <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 border border-blue-500/30">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/20 rounded-full blur-3xl mix-blend-overlay"></div>
                    </div>
                    
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-12 opacity-10 text-white pointer-events-none">
                        <Mails size={300} strokeWidth={1} />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                            Ready to break <br className="hidden md:block"/> the limits?
                        </h2>
                        <p className="text-blue-100 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join developers and marketers who have already taken control of their email delivery infrastructure. No hidden fees, no lock-in.
                        </p>
                        
                        <button
                            onClick={() => navigate("/signup")}
                            className="group relative px-8 py-4 bg-white text-blue-700 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/30 overflow-hidden flex items-center gap-3 cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Launch Your First Campaign <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LadingPage;
