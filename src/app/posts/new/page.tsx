'use client';

import { useActionState, startTransition } from "react";
import { createPost } from '@/actions';

export default function PostCreatePage() {
  const [formState, action] = useActionState(createPost, { message: '' });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return <form action={action} onSubmit={handleSubmit}>
    <h3 className="font-bold m-3">Create a Post</h3>
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label htmlFor="title">
         Title
        </label>
        <input
          name="title"
          className="border rounded p-2 w-full"
          id="title"
        />
      </div>

      <div className="flex gap-4">
        <label className="w-12" htmlFor="content">
         Post
        </label>
        <textarea
          name="content"
          className="border rounded p-2 w-full"
          id="content"
        />
      </div>

      {formState.message ? (
        <div className="my-2 p-2 bg-red-200 border rounded border-red-300">
          {formState.message}
        </div>
      ) : null}

      <button type="submit" className="rounded p-2 bg-blue-300">
        Create
      </button>
    </div>
  </form>;
}