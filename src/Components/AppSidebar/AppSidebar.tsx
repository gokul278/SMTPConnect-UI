import { X } from "lucide-react";
import React, { useEffect } from "react";

export type SidebarPosition = "left" | "right" | "top" | "bottom";

interface AppSidebarProps {
    visible: boolean;
    onClose: () => void;
    position?: SidebarPosition;
    width?: string; // fallback width (if no Tailwind class)
    height?: string; // for top/bottom
    title?: string;
    children: React.ReactNode;
    className?: string; // Tailwind classes (recommended)
    overlayClose?: boolean;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
    visible,
    onClose,
    position = "left",
    width = "320px",
    height = "300px",
    title = "Sidebar",
    children,
    className = "",
    overlayClose = true,
}) => {
    // 🔥 Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (visible) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [visible, onClose]);

    // 🔥 Position classes
    const getPositionClasses = () => {
        switch (position) {
            case "right":
                return "top-0 right-0 h-full";
            case "top":
                return "top-0 left-0 w-full";
            case "bottom":
                return "bottom-0 left-0 w-full";
            default:
                return "top-0 left-0 h-full";
        }
    };

    // 🔥 Animation classes
    const getTransformClasses = () => {
        if (!visible) {
            switch (position) {
                case "right":
                    return "translate-x-full";
                case "top":
                    return "-translate-y-full";
                case "bottom":
                    return "translate-y-full";
                default:
                    return "-translate-x-full";
            }
        }

        return "translate-x-0 translate-y-0";
    };

    // 🔥 Inline size only if no Tailwind width/height provided
    const hasWidthClass = className.includes("w-");
    const hasHeightClass = className.includes("h-");

    const sizeStyle =
        position === "left" || position === "right"
            ? hasWidthClass
                ? undefined
                : { width }
            : hasHeightClass
                ? undefined
                : { height };

    return (
        <>
            {/* 🔥 Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 z-90 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={overlayClose ? onClose : undefined}
            />

            {/* 🔥 Sidebar */}
            <div
                style={sizeStyle}
                className={`fixed z-100 bg-white shadow-xl flex flex-col
                transition-transform duration-300 ease-in-out
                ${getPositionClasses()}
                ${getTransformClasses()}
                ${className}`}
            >
                {/* 🔥 Header */}
                <div className="bg-[#F5F2F2] border border-[#576A8F] m-2 rounded-2xl flex items-center justify-between px-4 py-2">
                    <h2 className="text-lg font-semibold">{title}</h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black text-xl cursor-pointer"
                    >
                        <X />
                    </button>
                </div>

                {/* 🔥 Content */}
                <div className="flex-1 overflow-y-auto px-4 py-1">
                    {children}
                </div>
            </div>
        </>
    );
};

export default AppSidebar;
