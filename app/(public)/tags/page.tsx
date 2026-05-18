import Link from 'next/link';
import { Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getTags } from '@/lib/supabase/taxonomy';

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_22%),#09090b] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="space-y-4">
          <Badge className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white backdrop-blur" variant="outline">
            标签
          </Badge>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">文章标签</h1>
            <p className="mt-3 text-base leading-7 text-zinc-300">
              通过标签快速找到相关主题的文章
            </p>
          </div>
        </section>

        {tags.length === 0 ? (
          <section className="flex min-h-[400px] items-center justify-center">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5 backdrop-blur">
                <Hash className="h-10 w-10 text-zinc-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">暂无标签</h2>
              <p className="text-zinc-400 max-w-md">创建文章时添加标签后，这里会展示所有标签。</p>
            </div>
          </section>
        ) : (
          <section className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-200 backdrop-blur transition hover:bg-white/10 hover:text-white"
              >
                <Hash className="h-4 w-4 text-rose-400" />
                {tag.name}
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
