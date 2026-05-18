export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
  blog_count?: number;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  blog_count?: number;
};
