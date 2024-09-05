'use server';

import * as auth from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function signIn() {
  return auth.signIn('github');
};

export async function signOut() {
  return auth.signOut();
};

export async function createPost( 
  // formState: {content: string},
  // formData: FormData
) {

//   try { 
//     const title = formData.get('title') as string;
//     const content = formData.get('content') as string;
  
//     if (typeof title !=='string' || title.length < 3 ) {
//       return {
//         message: 'Title must be at least 3 characters long',
//       };
//     };

//     if (typeof content !=='string' || content.length < 12 ) {
//       return {
//         message: 'Text must be longer',
//       };
//     };
    

//   await db.post.create({
//       data: {
//         title,
//         content,
//       },
//     });
//   } catch (err: unknown ) {
//     if (err instanceof Error) {
//       return {
//         message: err.message,
//       };
//     }  
//     else {
//       return {
//         message: 'Something went wrong...',
//       }
//     }
//   }

  revalidatePath('/');
  redirect('/');
}


export async function editPost(id: string, title: string, content: string) {
  await db.post.update({
    where: { id },
    data: { 
      title,
      content, }
  });

  revalidatePath (`/snippets/${id}`);
  redirect(`/snippets/${id}`);
};

export async function deletePost( id: string) {
  await db.post.delete({
    where: { id }
  });
  
  revalidatePath('/');
  redirect(`/`);
};
