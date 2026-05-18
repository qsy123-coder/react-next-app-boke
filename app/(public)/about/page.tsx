import { Mail, Github, Twitter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_22%),#09090b] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <section className="space-y-4">
          <Badge className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white backdrop-blur" variant="outline">
            关于
          </Badge>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">关于 Inkwell</h1>
            <p className="mt-3 text-base leading-7 text-zinc-300">
              一个现代化的博客平台，让创作更简单
            </p>
          </div>
        </section>

        <section className="space-y-6 rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">我们的使命</h2>
            <p className="text-zinc-300 leading-7">
              Inkwell 致力于为创作者提供一个简洁、优雅的写作平台。我们相信好的内容应该被更多人看到，
              而创作者应该专注于写作本身，而不是被复杂的工具所困扰。
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">核心功能</h2>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                <span>强大的富文本编辑器，支持 Markdown 和所见即所得编辑</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                <span>草稿与发布状态管理，让你的创作过程更灵活</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                <span>SEO 优化，让你的文章更容易被搜索引擎收录</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                <span>响应式设计，在任何设备上都有出色的阅读体验</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-semibold text-white">联系我们</h2>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                邮件联系
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
