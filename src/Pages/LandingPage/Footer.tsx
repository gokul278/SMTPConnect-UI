import type { JSX } from "react";
import FullLogo from "@/assets/LOGO/WHITE-ICON-LOGO.png";

export default function Footer(): JSX.Element {
    return (
        <footer className="w-full border-t border-slate-200 bg-[#04387a]">
            <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col items-center gap-2 text-center">
                <div className="mb-2">
                    <img src={FullLogo} alt="MailStitch Logo" className="h-50 w-auto object-contain" />
                </div>
                <div className="flex gap-6 mb-4">
                    <a href="/contact" className="text-xs font-bold text-slate-300 hover:text-white transition-colors">Contact Us</a>
                    <a href="/privacy" className="text-xs font-bold text-slate-300 hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" className="text-xs font-bold text-slate-300 hover:text-white transition-colors">Terms & Conditions</a>
                    <a href="/" className="text-xs font-bold text-slate-300 hover:text-white transition-colors">Home</a>
                </div>
                <p className="text-sm text-slate-300">
                    © 2026 <span className="font-semibold text-slate-200">MailStitch</span>
                </p>
                <p className="text-xs text-slate-300">
                    Built for control, privacy, and flexibility.
                </p>
            </div>
        </footer>
    );
}
