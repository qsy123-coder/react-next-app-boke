import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarDays, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPublishedBlogsByTag, getTagBySlug } from '@/lib/supabase/taxonomy';

type TagDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TagDetailPage({ params }: TagDetailPageProps) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const blogs = await getPublishedBlogsByTag(tag.id);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_22%),#09090b] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="space-y-4">
          <Badge className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white backdrop-blur" variant="outline">
            标签
          </Badge>
          <div className="max-w-3xl">
            <h1 className="flex items-center gap-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              <Hash className="h-8 w-8 text-rose-400" />
              {tag.name}
            </h1>
            <p className="mt-3 text-base leading-7 text-zinc-300">该标签下的已发布文章</p>
          </div>
        </section>

        {blogs.length === 0 ? (
          <section className="flex min-h-[360px] items-center justify-center">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5 backdrop-blur">
                <Hash className="h-10 w-10 text-zinc-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">暂无文章</h2>
              <p className="text-zinc-400 max-w-md">该标签下暂时没有已发布文章。</p>
            </div>
          </section>
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
                  <p className="line-clamp-3 text-sm leading-7 text-zinc-300">{blog.subtitle || '点击进入查看完整内容。'}</p>
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
      </div>
    </main>
  );
}
