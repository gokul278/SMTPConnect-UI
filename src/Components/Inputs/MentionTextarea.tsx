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
                className={`w-full rounded-lg border bg-white transition
        ${error
                        ? "border-red-500 focus-within:ring-2 focus-within:ring-red-300"
                        : "border-gray-300 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-200"
                    }`}
            >
                {/* Top Hint */}
                <div className="px-3 py-2 border-b text-xs text-gray-500">
                    Type <b>@</b> to insert variables
                </div>

                {/* Textarea */}
                <div className="px-3 py-2">
                    <MentionsInput
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Write your email template..."
                        className="w-full text-sm outline-none"
                        style={{
                            control: {
                                backgroundColor: "transparent",
                                fontSize: 14,
                                minHeight: "120px",
                            },
                            input: {
                                margin: 0,
                                minHeight: "120px",
                                outline: "none",
                            },
                            highlighter: {
                                overflow: "hidden",
                            },
                        }}
                    >
                        <Mention
                            trigger="@"
                            data={mentionData}
                            markup="{{__id__}}"
                            displayTransform={(id) => `@${id}`}
                            style={{
                                backgroundColor: "#afd2ff",
                                color: "#000",
                                // padding: "2px 6px",
                                borderRadius: "6px",
                                // fontWeight: ,
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