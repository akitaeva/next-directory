'use client';

import type { Post } from '@prisma/client';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { editPost  } from '@/actions';

interface PostEditFormProps {
  post: Post;
};

export default function PostEditForm ({ post } : PostEditFormProps ) {
  const [content, setContent] = useState(post.content);
  
  const handleEditorChange = (value: string = "") => {
    setContent(value)
  };

  const editPostAction = editPost.bind(null, post.id, content)

  return (
    <div>
      <h1>{post.title}</h1>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={content}
        options={{ minimap : {enabled: false} }}
        onChange={handleEditorChange}
      />
      <form action={editPostAction}>
       <button type="submit" className="p-2 border rounded">
        Save
       </button>
      </form>
    </div>
  )
};
