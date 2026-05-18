import Link from "next/link";
import { Plus } from "lucide-react";

import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { getOwnBlogs } from "@/lib/supabase/blogs";

function estimateReadTime(content: string) {
  const plainText = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = plainText ? plainText.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

export default async function DashboardPage() {
  const blogs = await getOwnBlogs();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your overview.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/blogs/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        {blogs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-10 text-center">
            <h2 className="text-xl font-semibold">还没有文章</h2>
            <p className="mt-2 text-sm text-muted-foreground">现在就创建第一篇文章，系统会自动生成 slug 并同步到公开路由。</p>
            <Button asChild className="mt-5">
              <Link href="/dashboard/blogs/new">开始写作</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                excerpt={blog.subtitle || "暂无摘要，点击查看完整内容。"}
                author={{ name: blog.author }}
                date={new Date(blog.created_at).toLocaleDateString("zh-CN")}
                readTime={estimateReadTime(blog.content)}
                views={0}
                tags={[blog.slug]}
                coverImage={blog.image ?? undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
