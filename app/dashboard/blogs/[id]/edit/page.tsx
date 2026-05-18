import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, PencilLine } from 'lucide-react';

import { BlogEditorForm } from '@/components/BlogEditorForm';
import { Button } from '@/components/ui/button';
import { getOwnBlogById } from '@/lib/supabase/blogs';

import { updateBlogAction } from '../../actions';

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const blog = await getOwnBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.16),_transparent_28%),linear-gradient(180deg,_#fffdf9_0%,_#ffffff_45%,_#fff7ed_100%)] p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">Edit Story</p>
            <h1 className="mt-2 text-4xl font-semibold text-zinc-900">编辑文章</h1>
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
              <PencilLine className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-zinc-900">更新内容</h2>
              <p className="text-sm text-zinc-500">修改标题后，slug 会在数据库触发器中自动同步更新。</p>
            </div>
          </div>

          <BlogEditorForm
            action={updateBlogAction.bind(null, blog.id)}
            initialValues={blog}
          />
        </section>
      </div>
    </div>
  );
}
