import { notFound } from 'next/navigation';
import { db } from '@/db';
import PostEditForm from '@/components/edit-post-form';


interface SnippetEditPageProps {
  params: Promise<{
    id: string;
    title: string;
    code: string;
  }>;
}

export default async function EditSnippetPage( props: SnippetEditPageProps) {
  const { id } = await props.params;
 
  const snippetId = parseInt(id);
  const snippet = await db.post.findFirst({
    where: { id: snippetId },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <PostEditForm 
        post={snippet}
      />
    </div>
  );
};

