import { notFound } from 'next/navigation';
import { db } from '@/db';
import PostEditForm from '@/components/edit-post-form';


interface PostEditPageProps {
  params: Promise<{
    id: string;
    title: string;
    code: string;
  }>;
}

export default async function EditSnippetPage( props: PostEditPageProps) {
  const { id } = await props.params;
 
  const postId = id;
  const post = await db.post.findFirst({
    where: { id: postId },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <PostEditForm 
        post={post}
      />
    </div>
  );
};

