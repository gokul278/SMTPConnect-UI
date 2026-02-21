import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
    password: string;
}

const PasswordFields: React.FC<PasswordFieldProps> = ({ password }) => {
    const [show, setShow] = useState(false);

    return (
        <p className="flex items-center">
            {show ? password : "*".repeat(password.length)}

            <span
                onClick={() => setShow(!show)}
                className="inline-block ml-2 cursor-pointer"
            >
                {show ? (
                    <EyeOff width={16} height={16} />
                ) : (
                    <Eye width={16} height={16} />
                )}
            </span>
        </p>
    );
};

export default PasswordFields;
