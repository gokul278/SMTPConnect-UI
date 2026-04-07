import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
    BookOpen, 
    ChevronRight, 
    CheckCircle2, 
    AlertCircle, 
    ShieldCheck, 
    Zap, 
    Mail, 
    Lock,
} from 'lucide-react';
import Footer from '../LandingPage/Footer';
import FullLogo from "@/assets/LOGO/FULL-LOGO.png";
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const ArticleCard: React.FC<{ title: string, excerpt: string, icon: React.ReactNode, id: string }> = ({ title, excerpt, icon, id }) => (
    <div 
        onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
        className="group p-8 bg-white border border-slate-100 rounded-[3rem] shadow-premium hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
    >
        <div>
            <div className="w-14 h-14 bg-slate-50 text-[#032e63] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-6">{excerpt}</p>
        </div>
        <div className="flex items-center gap-2 text-[#032e63] font-bold text-sm uppercase tracking-widest">
            Read Guide <ChevronRight size={16} />
        </div>
    </div>
);

const Guides: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-mesh min-h-screen flex flex-col font-sans selection:bg-[#032e63] selection:text-white">
            <Helmet>
                <title>SMTP & Email Deliverability Guides – MailStitch Expert Articles</title>
                <meta name="description" content="Master bulk email sending with our expert guides on Gmail SMTP setup, SPF/DKIM/DMARC protocols, and transactional email security best practices." />
                <link rel="canonical" href="https://www.mailstitch.online/guides" />
            </Helmet>
            <header className="fixed top-0 left-0 right-0 flex items-center justify-between w-full px-6 md:px-12 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-50">
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
                    <img src={FullLogo} alt="MailStitch Logo" className="h-12 w-auto object-contain" />
                </div>
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate("/about")} className="hidden md:block text-sm font-bold text-slate-500 hover:text-[#032e63] transition-colors uppercase tracking-widest">About</button>
                    <Button 
                        label="Get Started" 
                        className="bg-[#032e63] text-white py-2 px-6 text-sm rounded-xl"
                        onClick={() => navigate("/signup")}
                    />
                </div>
            </header>

            <main className="flex-grow pt-40 pb-32 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-24">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6"
                        >
                            <BookOpen size={14} /> MailStitch Resource Center
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8"
                        >
                            Expert <span className="text-[#032e63] italic">SMTP Guides.</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-3xl mx-auto text-xl text-slate-500 font-medium leading-relaxed"
                        >
                            Everything you need to master bulk email delivery, from technical SMTP configurations to optimizing deliverability and protecting your sender reputation.
                        </motion.p>
                    </div>

                    {/* Article Index */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
                        <ArticleCard 
                            id="gmail-smtp"
                            title="Setting up Gmail SMTP"
                            excerpt="A step-by-step guide to using Google's infrastructure for your bulk mailing needs via App Passwords."
                            icon={<Mail size={28} />}
                        />
                        <ArticleCard 
                            id="deliverability"
                            title="Mastering Deliverability"
                            excerpt="Protect your sender reputation and ensure your campaigns landing in the inbox, not the spam folder."
                            icon={<Zap size={28} />}
                        />
                        <ArticleCard 
                            id="security"
                            title="SMTP Security Protocol"
                            excerpt="How to handle credentials, encryption, and local data protection for enterprise-grade security."
                            icon={<ShieldCheck size={28} />}
                        />
                    </div>

                    {/* Detailed Articles - CRITICAL FOR ADSENSE CONTENT VOLUME */}
                    <div className="max-w-4xl mx-auto space-y-40">
                        
                        {/* Article 1: Gmail SMTP */}
                        <article id="gmail-smtp" className="space-y-10 scroll-mt-32">
                            <div className="space-y-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit"><Mail size={32} /></div>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900">How to Configure Gmail SMTP for Bulk Emailing</h2>
                                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Published April 7, 2026 • 12 Min Read</p>
                            </div>
                            
                            <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-8">
                                <p>
                                    Gmail is one of the most reliable SMTP providers in the world, offering high deliverability and robust security. However, direct integration with legacy SMTP clients requires specific configuration steps, particularly regarding App Passwords and 2-Factor Authentication (2FA).
                                </p>
                                
                                <h3 className="text-2xl font-black text-slate-900 mt-12">Step 1: Enable 2-Factor Authentication</h3>
                                <p>
                                    Google no longer allows "Less Secure Apps" to access your account via standard passwords. To use Gmail with MailStitch, you must first enable 2FA in your Google Security settings. This adds an essential layer of protection for your workspace.
                                </p>

                                <h3 className="text-2xl font-black text-slate-900 mt-12">Step 2: Generate an App Password</h3>
                                <p>
                                    Navigate to the "App Passwords" section of your Google Account. Select "Other" as the app type and name it "MailStitch". Google will provide a unique 16-character code. <strong>Warning:</strong> Treat this code like your primary password; do not share it.
                                </p>

                                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 italic">
                                    "App Passwords allow third-party tools to interact with your mail server without ever seeing your primary Google Account password."
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mt-12">Step 3: MailStitch Configuration</h3>
                                <ul className="list-none space-y-4">
                                    <li className="flex gap-3 items-center">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0" size={20} />
                                        <span><strong>SMTP Server:</strong> smtp.gmail.com</span>
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0" size={20} />
                                        <span><strong>Port:</strong> 587 (TLS) or 465 (SSL)</span>
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0" size={20} />
                                        <span><strong>Username:</strong> Your full @gmail.com address</span>
                                    </li>
                                </ul>
                            </div>
                        </article>

                        {/* Article 2: Deliverability */}
                        <article id="deliverability" className="space-y-10 scroll-mt-32">
                            <div className="space-y-4">
                                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit"><Zap size={32} /></div>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900">The Ultimate Guide to Email Deliverability</h2>
                                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Published April 7, 2026 • 15 Min Read</p>
                            </div>
                            
                            <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-8">
                                <p>
                                    Sending an email is easy; landing it in the inbox is where the real work begins. Deliverability is the science of ensuring your campaigns bypass spam filters and maintain high engagement rates.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                                        <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2"><CheckCircle2 className="text-emerald-500" /> SPF & DKIM</h4>
                                        <p className="text-sm leading-relaxed">Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) are digital signatures that prove to the world that you are who you say you are. Without these, most major providers (Gmail, Outlook) will flag your mail as suspicious.</p>
                                    </div>
                                    <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                                        <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2"><AlertCircle className="text-rose-500" /> DMARC Compliance</h4>
                                        <p className="text-sm leading-relaxed">DMARC gives you the power to tell receiving servers how to handle mail that fails SPF or DKIM checks. It's the final layer of your domain's defense against spoofing.</p>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mt-12">Content Optimization</h3>
                                <p>
                                    Avoid "Spammy" trigger words in your subject lines (e.g., "FREE", "URGENT", "WINNER"). Focus on personalized, value-driven content. Use the MailStitch <strong>Mention Editor</strong> to inject genuine personalization into every message, which naturally improves your sender reputation over time.
                                </p>
                            </div>
                        </article>

                        {/* Article 3: Security */}
                        <article id="security" className="space-y-10 scroll-mt-32">
                            <div className="space-y-4">
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit"><ShieldCheck size={32} /></div>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900">Understanding SMTP Credentials Security</h2>
                                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Published April 7, 2026 • 10 Min Read</p>
                            </div>
                            
                            <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-8">
                                <p>
                                    Security is at the heart of everything we build at MailStitch. Connecting your own SMTP requires a high degree of trust, and we maintain that trust through multi-layered encryption protocols.
                                </p>

                                <h3 className="text-2xl font-black text-slate-900 mt-12">How We Protect Your Data</h3>
                                <p>
                                    When you enter your SMTP credentials into MailStitch, they are instantly encrypted using the <strong>AES-256 standard</strong>. This is the same level of encryption used by financial institutions and government agencies. We do not store plain-text passwords on any server.
                                </p>

                                <div className="bg-slate-900 text-white p-10 rounded-[3rem] space-y-6">
                                    <h4 className="text-xl font-black flex items-center gap-2"><Lock className="text-blue-400" /> Best Practices for Users:</h4>
                                    <ul className="space-y-3 opacity-90 text-sm">
                                        <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" /> Never reuse your primary account password for SMTP.</li>
                                        <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" /> Rotate your SMTP App Passwords every 90 days.</li>
                                        <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" /> Use SSL/TLS encryption (Port 465 or 587) whenever possible.</li>
                                    </ul>
                                </div>

                                <p>
                                    By following these protocols, MailStitch ensures that your email infrastructure remains powerful, private, and exclusively under your control.
                                </p>
                            </div>
                        </article>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-40 text-center bg-[#032e63] p-20 rounded-[4rem] text-white">
                        <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Start Stitching?</h2>
                        <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto">Join hundreds of developers using MailStitch to power their custom email campaigns.</p>
                        <Button 
                            label="Create Your Account" 
                            className="bg-white text-[#032e63] py-5 px-12 text-lg font-black rounded-3xl"
                            onClick={() => navigate("/signup")}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Guides;
