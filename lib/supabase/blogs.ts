import { createClient } from '@/lib/server';
import type { Blog, BlogInsert, BlogUpdate } from '@/types';

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getOwnBlogs() {
  const user = await getCurrentUser();

  if (!user) {
    return [] as Blog[];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Blog[];
}

export async function getOwnBlogById(id: string) {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Blog | null;
}

const PAGE_SIZE = 9;

export async function getPublicBlogs(page = 1) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from('blogs')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    blogs: (data ?? []) as Blog[],
    total: count ?? 0,
    pageSize: PAGE_SIZE,
    page,
  };
}

export async function getPublicBlogBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Blog | null;
}

export async function createBlogRecord(input: BlogInsert) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .insert(input)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Blog;
}

export async function updateBlogRecord(id: string, input: BlogUpdate) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .update(input)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Blog;
}

export async function deleteBlogRecord(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('blogs').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}
