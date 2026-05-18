export type BlogStatus = 'draft' | 'published';

export interface Blog {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  image?: string | null;
  content: string;
  author: string;
  status: BlogStatus;
  created_at: string;
  updated_at: string;
}

export interface BlogInsert {
  user_id: string;
  title: string;
  subtitle?: string | null;
  image?: string | null;
  content: string;
  author: string;
  status?: BlogStatus;
}

export interface BlogUpdate {
  title?: string;
  subtitle?: string | null;
  image?: string | null;
  content?: string;
  author?: string;
  status?: BlogStatus;
}
