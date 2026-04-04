import Button from '@/Components/Button/Button';
import TextInput from '@/Components/Inputs/TextInput';
import { SignupService } from '@/Service/SignupService';
import WhiteLogo from "@/assets/LOGO/WHITE-ICON-LOGO.png";
import { Loader2, Mail, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';
import BlueLOGO from "@/assets/LOGO/BLUE_ICON-LOGO.png";

interface SigninProps {

}

const Signup: React.FC<SigninProps> = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [notify, setNotify] = React.useState({
        viewStatus: false,
        error: false,
        message: ""
    });
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (notify.viewStatus) {
            setNotify({
                viewStatus: false,
                error: false,
                message: ""
            })
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setNotify({
                viewStatus: true,
                error: true,
                message: "Passwords do not match!"
            });
            setLoading(false);
            return;
        }

        const response = await SignupService.Signup(formData.name, formData.email, formData.password);

        if (response.status === false) {
            setNotify({
                viewStatus: true,
                error: true,
                message: response.message
            });
            setLoading(false);
            return;
        }

        setTimeout(() => {
            navigate("/signin");
            setLoading(false);
            setNotify({
                viewStatus: true,
                error: false,
                message: "Signup successful!"
            });
        }, 2000);
    }

    return (
        <div className='w-full min-h-screen bg-mesh flex justify-center items-center p-4 md:p-8'>
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 glass-effect rounded-[2.5rem] shadow-premium overflow-hidden border-slate-200/50 animate-in fade-in zoom-in duration-700">

                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-around p-12 bg-[#032e63] relative overflow-hidden">
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
                            Start sending <span className="text-blue-200 text-shadow-sm">smarter</span> today.
                        </h2>
                        <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-sm">
                            Create your account and unlock the full potential of your own delivery infrastructure.
                        </p>

                    </div>
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                            <div className="p-2 bg-blue-500 rounded-lg text-white">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-white uppercase tracking-widest">Enterprise Security</p>
                                <p className="text-[10px] text-blue-100 font-medium">Bank-grade encryption for your credentials.</p>
                            </div>
                        </div>
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
                        <h1 className="text-3xl font-black text-slate-900 mb-2">Create Account</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Join the elite community of email power users.</p>
                    </div>

                    <form onSubmit={submitSignup} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5">
                            <TextInput
                                id='name'
                                name='name'
                                type='text'
                                label='Full Name'
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <TextInput
                                id='email'
                                name='email'
                                type='email'
                                label='Email Address'
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <TextInput
                                    id='password'
                                    name='password'
                                    type='password'
                                    label='Password'
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextInput
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type='password'
                                    label='Confirm'
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        {notify.viewStatus && (
                            <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${notify.error ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"}`}>
                                <div className={`p-1 rounded-full ${notify.error ? "bg-red-100" : "bg-green-100"}`}>
                                    {notify.error ? <AlertCircle size={14} className="text-red-600" /> : <CheckCircle size={14} className="text-green-600" />}
                                </div>
                                <span className="text-sm font-bold">{notify.message}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className='w-full py-4 text-base font-black shadow-xl shadow-blue-500/20 mt-2'
                            label={loading ? <div className='flex justify-center items-center gap-2'><Loader2 className='animate-spin' size={20} /> Creating Account...</div> : "Create Free Account"}
                        />
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-200/60 text-center">
                        <p className="text-slate-500 font-medium">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/signin")}
                                className="text-[#032e63] font-black hover:underline underline-offset-4"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
