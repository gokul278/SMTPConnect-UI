import React from "react";
import { ChevronDown } from "lucide-react";

type Option = {
    label: string;
    value: string | number;
};

type SelectInputProps = {
    id: string;
    label?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
    options: Option[];
    placeholder?: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
    id,
    label,
    value,
    onChange,
    name,
    disabled = false,
    required = false,
    error,
    helperText,
    className = "",
    options,
    placeholder = "Select an option",
}) => {
    return (
        <div className="w-full flex flex-col gap-1">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>
            )}

            <div className="relative">
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full appearance-none rounded-lg border px-3 pr-10 py-2 text-sm
                    outline-none transition
                    ${error
                            ? "border-red-500 focus:ring-2 focus:ring-red-300"
                            : "border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"}
                    ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    ${className}`}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Custom Arrow */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <ChevronDown size={18} />
                </div>
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

export default SelectInput;