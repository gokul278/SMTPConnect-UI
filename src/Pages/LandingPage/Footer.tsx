import type { JSX } from "react";
import FullLogo from "@/assets/LOGO/WHITE-ICON-LOGO.png";

export default function Footer(): JSX.Element {
    return (
        <footer className="w-full border-t border-slate-200 bg-[#032e63]">
            <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col items-center gap-2 text-center">
                <div className="mb-4">
                    <img src={FullLogo} alt="MailStitch Logo" className="h-16 w-auto object-contain" />
                </div>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
                    <a href="/" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Home</a>
                    <a href="/features" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Features</a>
                    <a href="/how-it-works" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">How it Works</a>
                    <a href="/contact" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Contact</a>
                    <a href="/privacy" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Terms of Service</a>
                </div>
                <p className="text-sm text-slate-400">
                    © 2026 <span className="font-semibold text-slate-200">MailStitch</span>. Professional SMTP dispatch interface.
                </p>
                <p className="text-xs text-slate-500 mt-2">
                    Built for control, privacy, and flexibility.
                </p>
            </div>
        </footer>
    );
}
