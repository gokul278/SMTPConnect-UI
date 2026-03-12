import React, { useMemo } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import { Mention, MentionBlot } from "quill-mention";

import "react-quill-new/dist/quill.snow.css";
import "quill-mention/dist/quill.mention.css";

// IMPORTANT
Quill.register({
  "modules/mention": Mention,
  "blots/mention": MentionBlot,
});

type Props = {
  value: string;
  onChange: (val: string) => void;
  variables: string[];
  minimal?: boolean;
};

const MentionEditor: React.FC<Props> = ({ value, onChange, variables, minimal = false }) => {

  const mentionValues = useMemo(() => {
    return variables
      .filter(v => v && v.trim() !== "")
      .map(v => ({ id: v, value: v }));
  }, [variables]);

  const modules = useMemo(() => ({
    toolbar: minimal ? false : [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ],
    mention: {
      allowedChars: /^[A-Za-z\s]*$/,
      mentionDenotationChars: ["@"],
      source: (searchTerm: string, renderList: any) => {
        if (!searchTerm) {
          renderList(mentionValues, searchTerm);
        } else {
          const matches = mentionValues.filter(item =>
            item.value.toLowerCase().includes(searchTerm.toLowerCase())
          );
          renderList(matches, searchTerm);
        }
      },
    },
  }), [mentionValues, minimal]);

  return (
    <div className={`mention-editor-outer ${minimal ? 'editor-minimal' : ''}`}>
        <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={minimal ? "Type @ to insert variables..." : "Type @ to insert column names..."}
        className={minimal ? "ql-minimal-height" : "min-h-[120px]"}
        />
        <style>{`
            .editor-minimal .ql-container.ql-snow {
                border-radius: 0.75rem !important;
                border: 1px solid #e2e8f0 !important;
                background: white !important;
            }
            .editor-minimal .ql-editor {
                min-height: 46px !important;
                padding: 10px 14px !important;
                font-size: 0.875rem !important;
            }
            .editor-minimal .ql-editor p { margin: 0 !important; }
            .ql-minimal-height { max-height: 100px; overflow-y: auto; }
        `}</style>
    </div>
  );
};

export default MentionEditor;