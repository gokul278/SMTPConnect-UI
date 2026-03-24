import Button from '@/Components/Button/Button';
import TextInput from '@/Components/Inputs/TextInput';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SigninService } from '@/Service/SigninService';
import { useAuth } from '../MainRoutes/AuthContent';
import WhiteLogo from "@/assets/LOGO/WHITE-ICON-LOGO.png";
import BlueLOGO from "@/assets/LOGO/BLUE_ICON-LOGO.png";
import { Loader2, Mail } from 'lucide-react';

interface SigninProps {

}

const Signin: React.FC<SigninProps> = () => {
    const navigate = useNavigate();
    const { refreshToken } = useAuth();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [notify, setNotify] = useState({
        viewStatus: false,
        error: false,
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (notify.viewStatus) {
            setNotify({ viewStatus: false, error: false, message: '' });
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await SigninService.Signin(formData.username, formData.password);

        if (res.status) {
            localStorage.setItem("token", res.token || "");
            await refreshToken();
        } else {
            setNotify({
                viewStatus: true,
                error: true,
                message: res.message || "Invalid credentials"
            });
        }
        setLoading(false);
    };

    return (
        <div className='w-full min-h-screen bg-mesh flex justify-center items-center p-4 md:p-8'>
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 glass-effect rounded-[2.5rem] shadow-premium overflow-hidden border-slate-200/50 animate-in fade-in zoom-in duration-700">

                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-20 opacity-10 text-white rotate-12">
                        <Mail size={300} />
                    </div>

                    <div className="relative z-10">
                        <div className='text-3xl font-black text-white flex items-center justify-center gap-2 mb-1'>
                            <div className="flex items-center justify-center">
                                <img src={WhiteLogo} alt="Logo" className="h-50 object-contain" />
                            </div>
                            {/* Mail <span className="font-light opacity-80">Stitch</span> */}
                        </div>

                        <h2 className="text-4xl font-black text-white leading-tight mb-6">
                            Deliver more than just <span className="text-blue-200 text-shadow-sm">emails.</span>
                        </h2>
                        <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-sm">
                            Join thousands of developers using the world's most flexible delivery engine.
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-600 bg-slate-200 flex items-center justify-center overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <p className="text-xs font-black text-white uppercase tracking-widest">
                            Trusted by 10k+ Devs
                        </p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/40 backdrop-blur-xl">
                    <div className="mb-10 lg:hidden">
                        <div className='flex items-center justify-center font-black text-slate-800 gap-2'>
                            <div className="flex items-center justify-center">
                                <img src={BlueLOGO} alt="Logo" className="h-40 object-contain" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Enter your credentials to access your dashboard.</p>
                    </div>

                    <form onSubmit={handleSignin} className="space-y-6">
                        <div className="space-y-2">
                            <TextInput
                                id='username'
                                name='username'
                                type='email'
                                label='Email Address'
                                placeholder="name@company.com"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                                {/* <button type="button" className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">Forgot?</button> */}
                            </div>
                            <TextInput
                                id='password'
                                name='password'
                                type='password'
                                label=''
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {notify.viewStatus && (
                            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${notify.error ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"}`}>
                                <div className={`p-1 rounded-full ${notify.error ? "bg-red-100" : "bg-green-100"}`}>
                                    <Loader2 className={notify.error ? "text-red-600" : "text-green-600"} size={14} />
                                </div>
                                <span className="text-sm font-bold">{notify.message}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className='w-full py-4 text-base font-black shadow-xl shadow-blue-500/20 mt-4'
                            label={loading ? <div className='flex justify-center items-center gap-2'><Loader2 className='animate-spin' size={20} /> Authenticating...</div> : "Sign In to Dashboard"}
                        />
                    </form>

                    <div className="mt-10 pt-10 border-t border-slate-200/60 text-center">
                        <p className="text-slate-500 font-medium">
                            New to MailStitch?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-blue-600 font-black hover:underline underline-offset-4"
                            >
                                Create an account
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
