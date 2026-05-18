'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  createBlogRecord,
  deleteBlogRecord,
  getCurrentUser,
  getOwnBlogById,
  updateBlogRecord,
} from '@/lib/supabase/blogs';
import type { BlogStatus } from '@/types';

function getStringValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function getBlogPayload(formData: FormData) {
  const statusRaw = getStringValue(formData, 'status');
  const status: BlogStatus = statusRaw === 'published' ? 'published' : 'draft';

  return {
    title: getStringValue(formData, 'title'),
    subtitle: getStringValue(formData, 'subtitle') || null,
    image: getStringValue(formData, 'image') || null,
    content: getStringValue(formData, 'content'),
    author: getStringValue(formData, 'author'),
    status,
  };
}

export async function createBlogAction(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  const payload = getBlogPayload(formData);

  const blog = await createBlogRecord({
    user_id: user.id,
    ...payload,
  });

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/blogs');
  revalidatePath('/blogs');
  revalidatePath(`/blog/${blog.slug}`);

  redirect('/dashboard/blogs');
}

export async function updateBlogAction(id: string, formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  const existing = await getOwnBlogById(id);

  if (!existing) {
    throw new Error('文章不存在');
  }

  const payload = getBlogPayload(formData);
  const updated = await updateBlogRecord(id, payload);

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/blogs');
  revalidatePath('/blogs');
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${updated.slug}`);

  redirect('/dashboard/blogs');
}

export async function deleteBlogAction(formData: FormData) {
  const id = getStringValue(formData, 'id');
  const existing = await getOwnBlogById(id);

  if (!existing) {
    throw new Error('文章不存在');
  }

  await deleteBlogRecord(id);

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/blogs');
  revalidatePath('/blogs');
  revalidatePath(`/blog/${existing.slug}`);
}
