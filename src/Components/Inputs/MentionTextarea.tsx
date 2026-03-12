import React from "react";
import { MentionsInput, Mention } from "react-mentions";

type Props = {
    value: string;
    onChange: (value: string) => void;
    variables: string[];
    label?: string;
    error?: string;
};

const MentionTextarea: React.FC<Props> = ({
    value,
    onChange,
    variables,
    label,
    error,
}) => {
    const mentionData = variables.map((v) => ({
        id: v,
        display: v,
    }));

    return (
        <div className="w-full flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div
                className={`w-full rounded-xl border bg-white transition
        ${error
                        ? "border-red-500 focus-within:ring-2 focus-within:ring-red-300"
                        : "border-slate-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100"
                    }`}
            >
                <div className="relative">
                    <style>{`
                        .mention-input-custom textarea {
                            color: black !important;
                            caret-color: #0f172a !important;
                        }
                        .mention-input-custom textarea::placeholder {
                            color: #94a3b8 !important; 
                        }
                    `}</style>
                    <MentionsInput
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Type @ to insert variables..."
                        className="w-full text-sm outline-none mention-input-custom"
                        style={{
                            control: {
                                backgroundColor: ("transparent"),
                                fontSize: "0.875rem",
                                fontWeight: "normal",
                            },
                            input: {
                                margin: 0,
                                padding: "10px 14px",
                                minHeight: "46px",
                                outline: "none",
                                border: "none",
                                lineHeight: "1.5rem",
                                fontFamily: "inherit",
                                boxSizing: "border-box",
                            },
                            highlighter: {
                                padding: "10px 14px",
                                overflow: "hidden",
                                lineHeight: "1.5rem",
                                fontFamily: "inherit",
                                boxSizing: "border-box",
                                color: "#334155", // Explicitly set text color so we can read what we type
                            },


                            suggestions: {
                                list: {
                                    backgroundColor: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.75rem',
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                    marginTop: '8px',
                                    overflow: 'hidden',
                                    zIndex: 50,
                                },
                                item: {
                                    padding: '8px 12px',
                                    fontSize: '0.875rem',
                                    color: '#475569',
                                    borderBottom: '1px solid #f8fafc',
                                },
                            },
                        }}
                    >
                        <Mention
                            trigger="@"
                            data={mentionData}
                            markup="{{__id__}}"
                            displayTransform={(id) => `@${id}`}
                            style={{
                                backgroundColor: "#d3e1eb", // blue-50
                                color: "transparent", // blue-600
                                borderRadius: "0.375rem",
                                borderColor: "#bfdbfe",
                                fontWeight: 600,
                            }}
                        />
                    </MentionsInput>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between">
                {error && <p className="text-xs text-red-500">{error}</p>}
                <p className="text-xs text-gray-400">{value.length} chars</p>
            </div>
        </div>
    );
};

export default MentionTextarea;