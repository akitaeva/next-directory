import { notFound } from 'next/navigation';
import { db } from '@/db';
import SnippetEditForm from '@/components/snippetEditForm';


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
  const snippet = await db.snippet.findFirst({
    where: { id: snippetId },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm 
        snippet={snippet}
      />
    </div>
  );
};

