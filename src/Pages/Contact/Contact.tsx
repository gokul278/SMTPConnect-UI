import React, { useState } from 'react';
import { Mail, Loader2, CheckCircle, MessageSquare } from 'lucide-react';
import Button from '../../Components/Button/Button';
import TextInput from '../../Components/Inputs/TextInput';
import Footer from '../LandingPage/Footer';
import FullLogo from "@/assets/LOGO/FULL-LOGO.png";
import { useNavigate } from 'react-router-dom';

const Contact: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="w-full bg-mesh min-h-screen flex flex-col">
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
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Info */}
                    <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eef3f9] border border-[#dbe4ef] text-[#032e63] text-xs font-black uppercase tracking-widest mb-8">
                            <MessageSquare size={14} /> Get in Touch
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-8">
                            Let's stitch your <br />
                            <span className="text-[#032e63] underline decoration-[#dbe4ef] underline-offset-8">next campaign.</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg mb-12">
                            Have questions about our flexible SMTP delivery engine or need help setting up your first campaign? We're here to help.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-5 p-4 rounded-[2rem] bg-white shadow-premium border border-slate-100 w-full max-w-full sm:w-fit pr-8 transition-transform hover:scale-[1.02]">
                                <div className="p-4 bg-[#032e63] rounded-2xl text-white shadow-lg shadow-[#032e63]/30 shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Us</p>
                                    <p className="text-base sm:text-xl font-bold text-slate-800 break-all">mailstitchservice@gmail.com</p>
                                </div>
                            </div>

                            {/* <div className="flex items-center gap-5 p-4 rounded-[2rem] bg-white shadow-premium border border-slate-100 w-fit pr-8 transition-transform hover:scale-[1.02]">
                                <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Our Office</p>
                                    <p className="text-xl font-bold text-slate-800">123 Delivery Ln, Tech City</p>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                        <div className="glass-effect p-8 md:p-12 rounded-[3.5rem] border border-white shadow-2xl shadow-blue-900/10">
                            {!submitted ? (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setLoading(true);
                                        const subject = encodeURIComponent(formData.subject);
                                        const body = encodeURIComponent(`${formData.message}`);
                                        const mailtoLink = `mailto:mailstitchservice@gmail.com?subject=${subject}&body=${body}`;

                                        setTimeout(() => {
                                            window.location.href = mailtoLink;
                                            setLoading(false);
                                            setSubmitted(true);
                                        }, 1000);
                                    }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <TextInput
                                            id="name"
                                            label="Full Name"
                                            name="name"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <TextInput
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            placeholder="you@company.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <TextInput
                                        id="subject"
                                        label="Subject"
                                        name="subject"
                                        placeholder="How can we help?"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                                        <textarea
                                            name="message"
                                            rows={5}
                                            className="w-full p-4 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 outline-none transition-all font-medium text-slate-800 resize-none shadow-sm"
                                            placeholder="Tell us what's on your mind..."
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full py-4 text-base font-black shadow-xl shadow-blue-500/20"
                                        label={loading ? <div className='flex justify-center items-center gap-2'><Loader2 className='animate-spin' size={18} /> Opening Mail...</div> : "Send Message"}
                                        disabled={loading}
                                    />
                                </form>
                            ) : (
                                <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 shadow-lg shadow-green-100">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-4">Message Sent!</h2>
                                    <p className="text-slate-500 font-medium mb-8">
                                        Thanks for reaching out. Our team will get back <br /> to you within 24 hours.
                                    </p>
                                    <Button
                                        label="Back to Home"
                                        variant="outline"
                                        onClick={() => navigate("/")}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
