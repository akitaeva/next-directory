import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { deleteSnippet } from '@/actions';

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
};

export default async function ShowSnippetPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 2000));

  const { id } = await props.params;
 
  const post = await db.post.findFirst({
    where: { id: id },
  });

  if (!post) {
    return notFound();
  }

  const deleteSnippetAction = deleteSnippet.bind(null, Number(post.id));

  return <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">
         {post.title}
        </h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${post.id}/edit`}
            className="p-2 border rounded"
          >Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-300">
        <code>{post.content}</code>
      </pre>
    </div>
};


export async function generateStaticParams() {
  const posts = await db.post.findMany();

  return posts.map((post) => {
    return {
      id: post.id.toString,
    }
  });
};
