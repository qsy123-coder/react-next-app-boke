import { createClient } from '@/lib/server';
import type { Blog, Category, Tag } from '@/types';

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Category[];
}

export async function getTags() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Tag[];
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Category | null;
}

export async function getTagBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Tag | null;
}

export async function getPublishedBlogsByCategory(categoryId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_categories')
    .select('blogs(*)')
    .eq('category_id', categoryId)
    .eq('blogs.status', 'published');

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? [])
    .map((item) => item.blogs)
    .filter(Boolean) as Blog[];
}

export async function getPublishedBlogsByTag(tagId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_tags')
    .select('blogs(*)')
    .eq('tag_id', tagId)
    .eq('blogs.status', 'published');

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? [])
    .map((item) => item.blogs)
    .filter(Boolean) as Blog[];
}

export async function getBlogArchiveStats() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
