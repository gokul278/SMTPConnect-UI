import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
    label: string; // REQUIRED
    onClick: () => void; // REQUIRED
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
        "px-6 py-2 rounded-lg font-medium transition-all cursor-pointer duration-300 focus:outline-none";

    const variants: Record<ButtonVariant, string> = {
        primary:
            "bg-[#04387a] text-white hover:bg-[#04389a]",
        secondary:
            "bg-gray-600 text-white hover:bg-gray-700",
        outline:
            "border border-[#04387a] text-[#04387a] hover:bg-[#04387a] hover:text-white",
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
