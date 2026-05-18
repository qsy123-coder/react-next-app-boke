'use client'

import { useState } from 'react';
import Link from 'next/link';
import {
  BubbleMenu,
  EditorContent,
  isTextSelection,
  useEditor,
} from '@tiptap/react';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { Heading2, Heading3, Link2, List, ListOrdered, Pilcrow, Quote, Type, Unlink } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { BlogStatus } from '@/types';

type BlogEditorFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  initialValues?: {
    title?: string;
    subtitle?: string | null;
    image?: string | null;
    author?: string;
    content?: string;
    status?: BlogStatus;
  };
};

function BubbleIconButton({
  active,
  label,
  children,
  onClick,
}: {
  active?: boolean;
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={[
        'flex h-9 w-9 items-center justify-center rounded-full transition',
        active
          ? 'bg-zinc-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]'
          : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function parseInitialContent(raw?: string) {
  if (!raw) return '<p></p>';
  try {
    return JSON.parse(raw) as object;
  } catch {
    return raw;
  }
}

export function BlogEditorForm({
  action,
  initialValues,
}: BlogEditorFormProps) {
  const [content, setContent] = useState(initialValues?.content ?? '');
  const [status, setStatus] = useState<BlogStatus>(initialValues?.status ?? 'draft');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: '输入正文，选中文本后会出现冒泡工具栏。',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: parseInitialContent(initialValues?.content),
    onUpdate: ({ editor }) => {
      setContent(JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class: 'ProseMirror min-h-[360px] text-[15px] leading-7 text-zinc-800 focus:outline-none',
      },
    },
  });

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">标题</Label>
          <Input id="title" name="title" required defaultValue={initialValues?.title ?? ''} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="subtitle">副标题</Label>
          <Input id="subtitle" name="subtitle" defaultValue={initialValues?.subtitle ?? ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">作者</Label>
          <Input id="author" name="author" required defaultValue={initialValues?.author ?? ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">封面图 URL</Label>
          <Input id="image" name="image" defaultValue={initialValues?.image ?? ''} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-[28px] border border-dashed border-zinc-200 bg-zinc-50/60 px-4 py-3 text-sm text-zinc-500">
          选中正文内容后，会以冒泡形式显示格式工具栏；正文 / H2 / H3 / 列表 / 引用 / 链接都可直接切换。
        </div>

        {editor ? (
          <BubbleMenu
            editor={editor}
            shouldShow={({ editor, state }) =>
              editor.isEditable &&
              editor.isFocused &&
              isTextSelection(state.selection) &&
              !state.selection.empty
            }
            tippyOptions={{ duration: 120, placement: 'top', appendTo: () => document.body }}
          >
            <div className="flex flex-wrap items-center gap-1 rounded-full border border-zinc-200 bg-white/96 p-1.5 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur">
              <BubbleIconButton
                label="正文"
                active={editor.isActive('paragraph')}
                onClick={() => editor.chain().focus().setParagraph().run()}
              >
                <Pilcrow className="h-4 w-4" />
              </BubbleIconButton>
              <BubbleIconButton
                label="加粗"
                active={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Type className="h-4 w-4" />
              </BubbleIconButton>
              <BubbleIconButton
                label="H2"
                active={editor.isActive('heading', { level: 2 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              >
                <Heading2 className="h-4 w-4" />
              </BubbleIconButton>
              <BubbleIconButton
                label="H3"
                active={editor.isActive('heading', { level: 3 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              >
                <Heading3 className="h-4 w-4" />
              </BubbleIconButton>
              <BubbleIconButton
                label="无序列表"
                active={editor.isActive('bulletList')}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="h-4 w-4" />
              </BubbleIconButton>
              <BubbleIconButton
                label="有序列表"
                active={editor.isActive('orderedList')}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="h-4 w-4" />
              </BubbleIconButton>
              <BubbleIconButton
                label="引用"
                active={editor.isActive('blockquote')}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className="h-4 w-4" />
              </BubbleIconButton>
              <BubbleIconButton
                label="添加链接"
                active={editor.isActive('link')}
                onClick={() => {
                  const currentUrl = editor.getAttributes('link').href as string | undefined;
                  const url = window.prompt('请输入链接地址', currentUrl ?? 'https://');

                  if (url === null) return;

                  const trimmedUrl = url.trim();
                  if (!trimmedUrl) {
                    editor.chain().focus().extendMarkRange('link').unsetLink().run();
                    return;
                  }

                  editor.chain().focus().extendMarkRange('link').setLink({ href: trimmedUrl }).run();
                }}
              >
                <Link2 className="h-4 w-4" />
              </BubbleIconButton>
              <BubbleIconButton
                label="取消链接"
                active={false}
                onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}
              >
                <Unlink className="h-4 w-4" />
              </BubbleIconButton>
            </div>
          </BubbleMenu>
        ) : null}

        <div className="editor-shell rounded-[28px] border border-zinc-200 bg-white px-6 py-5 shadow-[0_18px_50px_rgba(20,20,20,0.06)]">
          <EditorContent editor={editor} />
        </div>
        <input type="hidden" name="content" value={content} />
      </div>

      <input type="hidden" name="status" value={status} />

      <div className="flex items-center justify-between gap-3">
        <Link href="/dashboard/blogs" className="text-sm text-zinc-500 hover:text-zinc-900">
          返回列表
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            onClick={() => setStatus('draft')}
            className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50"
          >
            保存草稿
          </button>
          <button
            type="submit"
            onClick={() => setStatus('published')}
            className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:pointer-events-none disabled:opacity-50"
          >
            发布文章
          </button>
        </div>
      </div>
    </form>
  );
}
