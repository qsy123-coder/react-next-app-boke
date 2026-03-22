# Next.js + Supabase + Shadcn UI + Radix UI + Tailwind 产品需求文档

这是生产级 Next.js 应用（App Router）开发的推荐规范，适用于使用 Supabase 作为后端、Shadcn UI + Radix 作为组件库的现代全栈项目。

---

## 📁 项目组织与架构

- 使用 `/app` 目录结构（`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx` 等）
- 按**领域/功能**分组文件  
  示例：
  - `app/(auth)/`
  - `app/dashboard/`
  - `features/auth/`
- `/lib` 目录存放低层次工具函数、通用逻辑
- Supabase 相关文件统一放在 `/supabase/` 或 `/lib/supabase/` 下
  - 客户端：`lib/supabase/client.ts`
  - 服务端：`lib/supabase/server.ts`
- 数据库迁移、Edge Functions 等放在 `supabase/` 目录下

---

## 🔐 Supabase 集成规范

- ❗ **永远不要**在客户端组件中直接访问 Supabase
  - 使用 **Server Actions** 或 **API Routes**
- 区分客户端与服务端：
  - `lib/supabase/client.ts`
  - `lib/supabase/server.ts`
- 从第一天起启用：
  - ✅ **Row Level Security (RLS)**
  - ✅ Supabase Auth
- 敏感密钥：
  - 仅存在环境变量中
  - ❌ 绝不硬编码
- 环境变量：
  - 开发：`.env.local`
  - 生产：Vercel / 部署平台环境变量

---

## 🧱 命名规范

- 目录名：**kebab-case（短横线）**
- 组件导出：
  - ✅ 使用 **named export**
  - ❌ 避免 default export
- 类型定义：
  - 优先使用 `interface`

---

## 🧠 TypeScript 使用规范

- ✅ 全部代码必须使用 TypeScript
- ❌ 禁止使用 `any`
- 启用 strict 模式（必须）

---

## 🧩 状态管理

- 表单状态：`useFormStatus` + Server Actions
- 本地状态：`useState` / `useOptimistic`
- 尽量避免全局状态库

---

## 🎨 UI 与样式

- Shadcn UI + Radix UI
- Tailwind CSS
- mobile-first
- 支持 dark mode

---

## ⚡ 性能优化

- 优先 Server Components
- 使用 Suspense
- 图片优化（WebP + lazy）

---

## 🛡️ 安全规范

- 启用 RLS
- 不暴露密钥
- 服务端验证（zod）

---

## 🧑‍💻 DX

- ESLint + Prettier + TS strict
- 无 TS 报错
- 注释解释 why

---

## 📌 原则

- 类型安全 > 速度
- 安全性 > 便利性
- 性能 & 可访问性默认开启
