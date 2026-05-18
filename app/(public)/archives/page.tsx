import Link from 'next/link';
import { Archive, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getBlogArchiveStats } from '@/lib/supabase/taxonomy';

export default async function ArchivesPage() {
  const blogs = await getBlogArchiveStats();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_22%),#09090b] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <section className="space-y-4">
          <Badge className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white backdrop-blur" variant="outline">
            归档
          </Badge>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">文章归档</h1>
            <p className="mt-3 text-base leading-7 text-zinc-300">
              按时间顺序浏览所有已发布文章
            </p>
          </div>
        </section>

        {blogs.length === 0 ? (
          <section className="flex min-h-[400px] items-center justify-center">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5 backdrop-blur">
                <Archive className="h-10 w-10 text-zinc-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">暂无归档</h2>
              <p className="text-zinc-400 max-w-md">发布文章后，这里会自动按时间展示归档。</p>
            </div>
          </section>
        ) : (
          <section className="space-y-3 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition hover:bg-white/10"
              >
                <span className="font-medium text-white">{blog.title}</span>
                <span className="flex items-center gap-2 text-sm text-zinc-400">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(blog.created_at).toLocaleDateString('zh-CN')}
                </span>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
