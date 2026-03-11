import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

type TextInputProps = {
    id: string;
    label?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
};

const TextInput: React.FC<TextInputProps> = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    name,
    disabled = false,
    required = false,
    error,
    helperText,
    className = "",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
        if (type === "number") {
            (e.target as HTMLInputElement).blur();
        }
    };

    const isPassword = type === "password";

    return (
        <div className="w-full flex flex-col gap-1">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>
            )}

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    onWheel={handleWheel}
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`trust-input 
            ${isPassword ? "pr-12" : ""}
            ${error
                            ? "border-red-500 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-blue-500"}
            ${disabled ? "bg-slate-50 cursor-not-allowed opacity-60" : ""}
            ${className}`}
                />

                {/* Eye icon ONLY for password */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            {helperText && !error && (
                <p className="text-xs text-gray-500">{helperText}</p>
            )}

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export default TextInput;
