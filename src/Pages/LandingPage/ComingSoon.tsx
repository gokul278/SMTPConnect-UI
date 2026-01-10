import type { JSX } from "react";
import Button from "../Components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function ComingSoon(): JSX.Element {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 shadow-lg p-8 text-center">

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                    <span className="text-2xl">🚧</span>
                </div>

                {/* Title */}
                <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    We’re Working on This Page
                </h1>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    This feature is currently under development.
                    Please wait and stay tuned — something awesome is coming soon!
                </p>

                <Button
                    className='font-black text-sm mt-10'
                    label="Back to Home"
                    onClick={() => navigate("/")}
                    variant="primary"
                />

                {/* Divider */}
                <div className="my-6 h-px w-full bg-slate-200 dark:bg-slate-700" />

                {/* Footer text */}
                <p className="text-xs text-slate-500 dark:text-slate-500">
                    © 2026 <span className="font-medium">SMTP Connect</span>
                    <br />
                    Built for control, privacy, and flexibility.
                </p>
            </div>
        </div>
    );
}
