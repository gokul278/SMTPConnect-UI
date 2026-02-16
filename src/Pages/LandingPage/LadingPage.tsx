import React, { useEffect, useState } from 'react';
import LandingImg from "@/assets/Images/LandingImg.png"
import EmailServiceImg from "@/assets/Images/EmailService.png";
import HowItWorks from "@/assets/Images/HowItWorks.svg";
import { ArrowUpFromLine, FileSpreadsheet, FingerprintPattern, LayoutPanelTop, LayoutTemplate, LockKeyhole, Logs, Mail, MailPlus, Mails, Send, Settings2, SquarePen, Unplug } from 'lucide-react';
import HoverCard from './HoverCard';
import Button from '../../Components/Button/Button';
import HighlightBento from './HighlightBento';
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

    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const handleToggle = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

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

    const CommingSoon = () => {
        navigate("/commingsoon");
    }

    return (
        <div className="w-full pt-16">
            <header className={`fixed top-0 left-0 right-0 flex items-center justify-between w-full py-2 px-2 sm:px-0 transition-colors duration-300 z-50 ${scrolled ? "bg-white/40 backdrop-blur-lg shadow-md" : "bg-transparent"}`}>
                <div className='text-lg sm:text-2xl px-1 sm:px-4'>
                    <span className='font-black text-[#a2a2a2]'>SMTP</span> Connect
                </div>
                <div className='px-1 sm:px-4 flex gap-4'>
                    <Button
                        className='sm:w-30 font-black text-sm'
                        label="Sign In"
                        onClick={() => { navigate("/signin") }}
                        variant="outline"
                    />
                    <Button
                        className='sm:w-30 font-black text-sm'
                        label="Sign Up"
                        onClick={() => CommingSoon()}
                        variant="primary"
                    />
                </div>
            </header>
            <div className='flex justify-center items-center'>
                <img src={LandingImg} alt='logo' className='rounded-3xl pt-3 sm:pt-10 w-full xl:w-[80%]' />
            </div>
            <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-10 text-lg sm:text-3xl py-5 px-4 sm:px-0">
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-wrap justify-center gap-5 font-bold items-center'>
                        <div className='flex justify-center items-center gap-2'>
                            <Unplug />Connect.
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <Settings2 />Customize.
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <Send /> Send.
                        </div>
                    </div>
                    <div className='text-sm mt-3 sm:mt-0 sm:text-lg py-2 text-center'>
                        👉 Use Gmail, Outlook, or any custom SMTP server
                    </div>
                </div>

                <div
                    className="
                        w-75 h-auto
                        -translate-x-1.5 -translate-y-1.5
                        bg-[#04387a]
                        border-[3px] border-black
                        shadow-[12px_12px_0_#000]
                        overflow-hidden
                        transition-all duration-300
                        hover:-translate-x-1.5
                    "
                >
                    {/* Header */}
                    <div
                        className="
                            w-full h-8
                            bg-white
                            px-3 py-1.25
                            text-black
                            text-sm font-black
                            border-b-[3px] border-black
                        "
                    >
                        Window
                    </div>

                    {/* Content */}
                    <div className="p-3 text-lg text-[#ffffff] font-semibold">
                        Send personalized bulk emails using your own SMTP credentials.
                        No third-party lock-ins. No forced branding. Just complete control over your emails.
                        <br />

                        {/* Button */}
                        {/* <button
                            className="
                                mt-3 px-3 py-1
                                border-[3px] border-black
                                shadow-[3px_3px_0_#000]
                                font-extrabold
                                bg-[#8a8a87]
                                cursor-pointer
                                transition-all duration-300
                                hover:translate-x-[1.5px] hover:translate-y-[1.5px]
                                hover:shadow-[1.5px_1.5px_0_#000]
                                hover:bg-sky-400
                                active:translate-x-[3px] active:translate-y-[3px]
                                active:shadow-none
                            "
                        >
                            Button
                        </button> */}
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center py-10 mt-0 sm:mt-5'>
                <HoverCard />
            </div>

            <div className='flex flex-col gap-10 justify-center items-center py-10 px-4 sm:px-0'>
                <div className='text-4xl font-black text-center'>
                    Why Choose SMTP Connect?
                </div>
                <div className='text-lg underline text-center'>
                    Most email tools force you into their ecosystem. SMTP Connect does not.
                </div>
                <div className='flex flex-wrap justify-center items-center gap-10 w-[80%]'>
                    {
                        ChooseSMTP.map((item) => (
                            <div className='w-75 flex flex-col text-center justify-center items-center gap-5 text-sm sm:text-lg font-semibold'>
                                <div className='p-5 bg-[#f1f1f1] hover:shadow-lg cursor-pointer rounded-full flex justify-center items-center w-20 h-20'>
                                    {item.Icon}
                                </div>
                                {item.label}
                            </div>
                        )
                        )
                    }
                </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-10 justify-center items-center py-10 px-4 sm:px-0'>
                <div className='w-full sm:w-[40%]'>
                    <img src={EmailServiceImg} alt='logo' className='rounded-3xl' />
                </div>
                <div className='w-full sm:w-[40%] flex flex-col gap-5'>
                    <div className='text-4xl font-black'>
                        Key Features
                    </div>
                    <section className="w-full bg-white divide-y rounded shadow-md divide-slate-200 shadow-slate-200">

                        {
                            keyfeatures.map((feature, index) => (
                                <details
                                    className="p-4 group"
                                    open={activeIndex === index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleToggle(index);
                                    }}
                                >
                                    <summary className="relative flex items-center cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 [&::-webkit-details-marker]:hidden">
                                        {feature.logo}
                                        {feature.title}
                                        <span className="absolute right-0 transition-transform group-open:rotate-45">+</span>
                                    </summary>
                                    <p className="mt-4 text-slate-500">
                                        {feature.description}
                                    </p>
                                </details>
                            ))
                        }
                    </section>
                </div>
            </div>

            <div className='flex flex-col-reverse sm:flex-row gap-10 sm:gap-30 justify-center items-center py-10 px-4 sm:px-0'>
                <ul
                    aria-label="Colored activity feed"
                    role="feed"
                    className="relative w-[90%] sm:w-[30%] flex flex-col gap-12 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 "
                >
                    {
                        howWorks.map((item) => (
                            <li role="article" className="relative pl-8 ">
                                <span className={`absolute left-0 z-10 flex items-center justify-center w-10 h-10 text-white -translate-x-1/2 rounded-full bg-[#f8bc27] ring-2 ring-white `}>
                                    {item.logo}
                                </span>
                                <div className="flex flex-col flex-1 gap-0">
                                    <h4 className="text-base font-medium text-slate-700">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-slate-500">{item.description}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className='w-full sm:w-[25%] flex gap-10 flex-col justify-center items-center p-5 rounded-3xl'>
                    <div className='text-4xl font-black'>
                        How It Works
                    </div>
                    <img src={HowItWorks} alt='logo' className='w-full' />
                </div>
            </div>

            <div className='py-10 flex flex-col gap-5 justify-center items-center'>
                <div className='text-4xl font-black'>
                    Who Is It For?
                </div>
                <HighlightBento />
            </div>

            <Footer />
        </div>
    );
};

export default LadingPage;