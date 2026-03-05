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
};

const MentionEditor: React.FC<Props> = ({ value, onChange, variables }) => {

  const mentionValues = useMemo(() => {
    return variables
      .filter(v => v.trim() !== "")
      .map(v => ({ id: v, value: v }));
  }, [variables]);

  const modules = useMemo(() => ({
    toolbar: [
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
  }), [mentionValues]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder="Type @ to insert column names..."
      className="min-h-[120px]"
    />
  );
};

export default MentionEditor;