import Link from 'next/link';
import { ArrowLeft, PenTool } from 'lucide-react';

import { BlogEditorForm } from '@/components/BlogEditorForm';
import { Button } from '@/components/ui/button';

import { createBlogAction } from '../actions';

export default function NewBlogPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_45%,_#f5f3ff_100%)] p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">New Story</p>
            <h1 className="mt-2 text-4xl font-semibold text-zinc-900">创建文章</h1>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/dashboard/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回
            </Link>
          </Button>
        </div>

        <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
              <PenTool className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">写下你的新故事</h2>
              <p className="text-sm text-zinc-500">标题会自动生成唯一 slug，适合后续详情页路由和 SEO。</p>
            </div>
          </div>

          <BlogEditorForm action={createBlogAction} />
        </section>
      </div>
    </div>
  );
}
