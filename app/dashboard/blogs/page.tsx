import Link from 'next/link';
import { CalendarDays, PenSquare, Plus } from 'lucide-react';

import { deleteBlogAction } from '@/app/dashboard/blogs/actions';
import { SubmitButton } from '@/components/SubmitButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOwnBlogs } from '@/lib/supabase/blogs';

export default async function BlogsPage() {
  const blogs = await getOwnBlogs();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_24%),radial-gradient(circle_at_top_left,_rgba(244,114,182,0.18),_transparent_24%),#fafaf9] p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">Studio</p>
            <h1 className="mt-2 text-4xl font-semibold text-zinc-950">你的文章库</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">这里展示当前登录用户可管理的文章，增删改通过 Server Actions 执行，符合 RSC / Client Component 分离要求。</p>
          </div>
          <Button asChild className="rounded-full px-5">
            <Link href="/dashboard/blogs/new">
              <Plus className="mr-2 h-4 w-4" />
              新建文章
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {blogs.map((blog) => (
            <Card key={blog.id} className="rounded-[28px] border border-zinc-200/70 bg-white/85 py-0 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ring-0 backdrop-blur">
              <CardHeader className="space-y-4 px-6 pt-6">
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.28em] text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full px-3 py-1">{blog.slug}</Badge>
                    <Badge
                      className={[
                        'rounded-full px-3 py-1 text-xs font-medium',
                        blog.status === 'published'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-zinc-200 bg-zinc-100 text-zinc-500',
                      ].join(' ')}
                      variant="outline"
                    >
                      {blog.status === 'published' ? '已发布' : '草稿'}
                    </Badge>
                  </div>
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(blog.updated_at).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <CardTitle className="text-2xl font-semibold text-zinc-950">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 px-6 pb-6">
                <p className="line-clamp-3 text-sm leading-7 text-zinc-600">{blog.subtitle || '暂无副标题，建议补充一句有吸引力的摘要。'}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={`/dashboard/blogs/${blog.id}/edit`}>
                      <PenSquare className="mr-2 h-4 w-4" />
                      编辑
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={`/blog/${blog.slug}`}>预览</Link>
                  </Button>
                  <form action={deleteBlogAction}>
                    <input type="hidden" name="id" value={blog.id} />
                    <SubmitButton
                      idleText="删除"
                      pendingText="删除中..."
                      variant="destructive"
                      className="rounded-full"
                    />
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
