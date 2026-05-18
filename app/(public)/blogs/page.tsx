import Link from 'next/link';
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, PencilLine } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPublicBlogs } from '@/lib/supabase/blogs';

type BlogsIndexPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogsIndexPage({ searchParams }: BlogsIndexPageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  const { blogs, total, pageSize } = await getPublicBlogs(page);
  const totalPages = Math.ceil(total / pageSize);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_22%),#09090b] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="space-y-4">
          <Badge className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white backdrop-blur" variant="outline">
            Public Feed
          </Badge>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">最新文章</h1>
              <p className="mt-3 text-base leading-7 text-zinc-300">
                所有文章都通过 slug 路由公开访问，适合 SEO 与分享传播。
              </p>
            </div>
            <Button asChild className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200">
              <Link href="/dashboard/blogs/new">
                写一篇新的
                <PencilLine className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg font-medium text-zinc-400">暂无已发布的文章</p>
            <p className="mt-2 text-sm text-zinc-600">成为第一个发布文章的人吧。</p>
          </div>
        ) : (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <Card key={blog.id} className="rounded-[28px] border border-white/10 bg-white/5 py-0 text-white ring-0 backdrop-blur">
                <CardHeader className="space-y-4 px-6 pt-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-zinc-400">
                    <span>{blog.author}</span>
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(blog.created_at).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-semibold text-white">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 px-6 pb-6">
                  <p className="line-clamp-3 text-sm leading-7 text-zinc-300">{blog.subtitle || '这篇文章暂无副标题，点击进入查看完整内容。'}</p>
                  <Button asChild variant="outline" className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    <Link href={`/blog/${blog.slug}`}>
                      阅读全文
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {totalPages > 1 && (
          <nav aria-label="分页导航" className="flex items-center justify-center gap-3 pt-4">
            <Button
              asChild={hasPrev}
              variant="outline"
              className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
              disabled={!hasPrev}
            >
              {hasPrev ? (
                <Link href={`/blogs?page=${page - 1}`}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  上一页
                </Link>
              ) : (
                <span>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  上一页
                </span>
              )}
            </Button>

            <span className="text-sm text-zinc-400">
              第 {page} / {totalPages} 页 · 共 {total} 篇
            </span>

            <Button
              asChild={hasNext}
              variant="outline"
              className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
              disabled={!hasNext}
            >
              {hasNext ? (
                <Link href={`/blogs?page=${page + 1}`}>
                  下一页
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              ) : (
                <span>
                  下一页
                  <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              )}
            </Button>
          </nav>
        )}
      </div>
    </main>
  );
}
