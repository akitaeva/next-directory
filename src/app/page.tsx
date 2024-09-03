import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { db } from '@/db';
import * as actions from '@/actions';

export default async function Home() {
  const posts = await db.post.findMany();

  const renderedPosts = posts.map((post) => {
    return (
      <Link 
        key={post.id} 
        href={`/posts/${post.id}`}
        className='flex justify-between items-center p-2 border rounded'
      >
        <div>{post.title}</div>
        <div>View</div>
      </Link>
    )
  })

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Code Snippets</h1>
        <Link 
          href="/posts/new"
          className="border p-2 border rounded"
        >
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {renderedPosts}
      </div>
      <form action={actions.signIn}>
      <Button type="submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
      <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
};
 