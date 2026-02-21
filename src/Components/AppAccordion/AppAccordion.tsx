import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export interface AccordionItem {
    header: React.ReactNode;
    content: React.ReactNode;
}

interface AppAccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean; // allow multiple open
    defaultIndex?: number | number[];
}

const AppAccordion: React.FC<AppAccordionProps> = ({
    items,
    allowMultiple = false,
    defaultIndex = 0,
}) => {
    const [activeIndex, setActiveIndex] = useState<number[]>(
        Array.isArray(defaultIndex) ? defaultIndex : [defaultIndex]
    );

    const toggleItem = (index: number) => {
        if (allowMultiple) {
            setActiveIndex((prev) =>
                prev.includes(index)
                    ? prev.filter((i) => i !== index)
                    : [...prev, index]
            );
        } else {
            setActiveIndex((prev) =>
                prev.includes(index) ? [] : [index]
            );
        }
    };

    return (
        <div className="w-full space-y-2">
            {items.map((item, index) => {
                const isOpen = activeIndex.includes(index);

                return (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                        {/* Header */}
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full flex items-center cursor-pointer justify-between p-4 text-left bg-white hover:bg-gray-50 transition"
                        >
                            <span>
                                {item.header}
                            </span>

                            {/* Arrow */}
                            <span
                                className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                    }`}
                            >
                                <ChevronDown />
                            </span>
                        </button>

                        {/* Content */}
                        <div
                            className={`grid transition-all duration-300 ease-in-out ${isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                                }`}
                        >
                            <div className="overflow-hidden">
                                <div className="p-4 text-gray-600 bg-gray-50">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AppAccordion;
