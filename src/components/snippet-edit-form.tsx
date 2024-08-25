'use client';

import type { Snippet } from '@prisma/client';
import Editor from '@monaco-editor/react';
import { useState } from 'react';

interface SnippetEditFormProps {
  snippet: Snippet;
};

export default function SnippetEditForm ({ snippet } : SnippetEditFormProps ) {
  const [code, setCode] = useState(snippet.code);
  
  const handleEditorChange = (value: string = "") => {
    setCode(value)
  };

  return (
    <div>
      <h1>{snippet.title}</h1>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={code}
        options={{ minimap : {enabled: false} }}
        onChange={handleEditorChange}
      />
    </div>
  )
};
