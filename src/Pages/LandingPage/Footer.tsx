import type { JSX } from "react";

export default function Footer(): JSX.Element {
    return (
        <footer className="w-full border-t border-slate-200 bg-[#04387a]">
            <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col items-center gap-2 text-center">
                <p className="text-sm text-slate-300">
                    © 2026 <span className="font-semibold text-slate-200">SMTP Connect</span>
                </p>
                <p className="text-xs text-slate-300">
                    Built for control, privacy, and flexibility.
                </p>
            </div>
        </footer>
    );
}
