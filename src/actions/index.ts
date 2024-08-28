'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function createSnippet( 
  formState: {message: string},
  formData: FormData
) {

  try { 
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;
  
    if (typeof title !=='string' || title.length < 3 ) {
      return {
        message: 'Title must be at least 3 characters long',
      };
    };

    if (typeof code !=='string' || code.length < 12 ) {
      return {
        message: 'Code snippet must be longer',
      };
    };
    

  await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown ) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }  
    else {
      return {
        message: 'Something went wrong...',
      }
    }
  }

  revalidatePath('/');
  redirect('/');
}


export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code }
  });

  redirect(`/snippets/${id}`);
};

export async function deleteSnippet( id: number) {
  await db.snippet.delete({
    where: {id}
  });
  
  revalidatePath('/');
  redirect(`/`);
};
