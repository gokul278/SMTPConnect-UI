import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
    label: any; // REQUIRED
    onClick?: () => void; // REQUIRED
    variant?: ButtonVariant;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    variant = "primary",
    disabled = false,
    type = "button",
    className = "",
}) => {
    const baseStyles =
        "px-6 py-2.5 rounded-xl font-bold transition-all cursor-pointer duration-300 focus:outline-none active:scale-95 flex items-center justify-center gap-2";

    const variants: Record<ButtonVariant, string> = {
        primary:
            "bg-[#04387a] text-white shadow-lg shadow-blue-900/10 hover:bg-[#032d61] hover:shadow-blue-900/20",
        secondary:
            "bg-slate-100 text-slate-700 hover:bg-slate-200",
        outline:
            "border-2 border-slate-200 text-slate-600 hover:border-[#04387a] hover:text-[#04387a] bg-transparent",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;
