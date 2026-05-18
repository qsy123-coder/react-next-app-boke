# 开发计划

基于 PRD 与当前代码库差距分析，按优先级分阶段执行。

---

## Phase 1 — 补全 MVP 核心缺口 ✅

### P0：影响核心流程

- [x] **1. 数据库迁移**：`blogs` 表新增 `status` 字段（`draft` / `published`，默认 `draft`）
- [x] **2. 更新类型定义**：`Blog`、`BlogInsert`、`BlogUpdate` 加入 `status` 字段
- [x] **3. 更新数据库查询**：`getPublicBlogs` 只返回 `status = 'published'` 的文章
- [x] **4. 编辑器表单加状态切换**：草稿保存 / 发布 两个按钮
- [x] **5. Server Actions 传递 `status`**：`createBlogAction` / `updateBlogAction` 支持 status
- [x] **6. Dashboard 博客列表显示状态 badge**：草稿 / 已发布 标签

### P1：完善 MVP 质量

- [x] **7. 博客详情页加 Navbar**：公开页面补充导航栏
- [x] **8. 博客详情页加 `generateMetadata`**：动态 title / description，支持 SEO
- [x] **9. 清理异常目录**：删除 `app/text.tsx/` 目录

---

## Phase 2 — 内容存储格式修正 ✅

- [x] **10. TipTap 改为存储 JSON**：`editor.getJSON()` 替代 `editor.getHTML()`
- [x] **11. 博客详情页改用 TipTap `generateHTML` 渲染**：兼容 JSON 和旧 HTML 内容

---

## Phase 3 — 扩展功能（按需推进）

- [x] **12. 博客列表分页**（offset-based，每页 9 篇，URL 参数 `?page=N`）
- [ ] **13. Resend 邮件集成**：欢迎邮件
- [ ] **14. OpenAI 写作辅助**：标题 / 摘要生成
- [ ] **15. Stripe 订阅集成**

---

## Phase 4 — UX 与内容组织增强 ✅

- [x] **16. 完善 Dashboard 账户设置页**：读取真实 profile，支持更新姓名，支持 Supabase 密码更新
- [x] **17. 添加 UX 优化**：表单提交 loading、成功/错误 Toast、空状态优化、禁用态说明
- [x] **18. 标签与分类数据库设计**：新增 `categories`、`tags`、`blog_categories`、`blog_tags` 表和 RLS 策略
- [x] **19. 标签/分类/归档公开页面数据化**：页面读取真实数据，并补充详情路由

---

## ⚠️ 待手动操作：数据库迁移

代码已完成，但以下迁移文件需要在 Supabase 控制台手动执行：

```
supabase/migrations/20260518000000_add_status_to_blogs.sql
supabase/migrations/20260518010000_add_tags_and_categories.sql
```

在 Supabase Dashboard → SQL Editor 中运行迁移文件内容，或使用 CLI：

```bash
npx supabase db push
```

---

## 执行记录

| # | 任务 | 状态 | 备注 |
|---|------|------|------|
| 1 | 数据库迁移：新增 status 字段 | ✅ 完成 | 需手动在 Supabase 执行 SQL |
| 2 | 更新类型定义 | ✅ 完成 | |
| 3 | 更新数据库查询 | ✅ 完成 | |
| 4 | 编辑器表单加状态切换 | ✅ 完成 | 草稿/发布双按钮 |
| 5 | Server Actions 传递 status | ✅ 完成 | |
| 6 | Dashboard 列表显示状态 badge | ✅ 完成 | 绿色=已发布，灰色=草稿 |
| 7 | 博客详情页加 Navbar | ✅ 完成 | |
| 8 | 博客详情页加 generateMetadata | ✅ 完成 | 含 OpenGraph |
| 9 | 清理异常目录 | ✅ 完成 | 删除 app/text.tsx/ |
| 10 | TipTap 改为存储 JSON | ✅ 完成 | |
| 11 | 详情页改用 generateHTML 渲染 | ✅ 完成 | 兼容旧 HTML 内容 |
| 12 | 博客列表分页 | ✅ 完成 | 每页 9 篇，`?page=N`，含总数显示 |
| 13 | Resend 邮件集成 | 待执行 | 需要 API Key |
| 14 | OpenAI 写作辅助 | 待执行 | 需要 API Key |
| 15 | Stripe 订阅集成 | 待执行 | 需要 API Key |
| 16 | Dashboard 账户设置页 | ✅ 完成 | 真实 profile + 密码更新 |
| 17 | UX 优化 | ✅ 完成 | Toast / loading / empty states |
| 18 | 标签与分类数据库设计 | ✅ 完成 | 新增迁移文件 |
| 19 | 标签/分类/归档页面数据化 | ✅ 完成 | 含详情路由 |
