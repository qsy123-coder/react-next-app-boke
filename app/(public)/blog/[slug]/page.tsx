import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { generateHTML } from '@tiptap/core';
import LinkExtension from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPublicBlogBySlug } from '@/lib/supabase/blogs';

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const tiptapExtensions = [
  StarterKit.configure({ heading: { levels: [2, 3] } }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  LinkExtension.configure({ openOnClick: false }),
];

function renderContent(raw: string): string {
  try {
    const json = JSON.parse(raw) as object;
    return generateHTML(json, tiptapExtensions);
  } catch {
    return raw;
  }
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublicBlogBySlug(slug);

  if (!blog) {
    return { title: '文章不存在' };
  }

  return {
    title: blog.title,
    description: blog.subtitle ?? `${blog.author} 的博客文章`,
    openGraph: {
      title: blog.title,
      description: blog.subtitle ?? `${blog.author} 的博客文章`,
      type: 'article',
      publishedTime: blog.created_at,
      authors: [blog.author],
      ...(blog.image ? { images: [{ url: blog.image }] } : {}),
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getPublicBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const htmlContent = renderContent(blog.content);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_22%),#09090b] px-4 py-28 text-white sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.30)] backdrop-blur sm:p-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Badge variant="outline" className="rounded-full border-white/15 bg-white/10 px-3 py-1 text-white">
            {blog.author}
          </Badge>
          <Button asChild variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回文章列表
            </Link>
          </Button>
        </div>

        <header className="border-b border-white/10 pb-8">
          <p className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-zinc-400">
            <CalendarDays className="h-4 w-4" />
            {new Date(blog.created_at).toLocaleDateString('zh-CN')}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{blog.title}</h1>
          {blog.subtitle ? <p className="mt-5 text-lg leading-8 text-zinc-300">{blog.subtitle}</p> : null}
        </header>

        {blog.image ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[28px] border border-white/10">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}

        <section
          className="prose prose-invert mt-10 max-w-none prose-headings:font-semibold prose-headings:text-white prose-p:leading-8 prose-p:text-zinc-300 prose-a:text-rose-400 prose-strong:text-white prose-code:text-rose-400"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </main>
  );
}
