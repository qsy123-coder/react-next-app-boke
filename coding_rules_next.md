# Coding Rules / 开发规范

本规范用于统一项目代码风格、结构和最佳实践，确保代码可维护性、可扩展性和团队协作效率。

---

## 1. 通用原则

- 保持代码**简单、清晰、可读**（KISS 原则）
- 避免重复代码（DRY 原则）
- 优先考虑可维护性而非过度优化
- 所有逻辑应具备明确职责（单一职责原则）
- 命名要语义化，避免缩写

---

## 2. 项目结构（Next.js App Router）

```
/app
  /(public)
    page.tsx
    blogs/
    blog/[slug]/
  /(auth)
    login/
    register/
  /(dashboard)
    dashboard/
/components
/lib
/hooks
/types
/styles
```

### 规则
- 使用 App Router（/app 目录）
- 路由按功能分组（public / auth / dashboard）
- 页面组件只负责布局和数据组合，不写复杂业务逻辑

---

## 3. 代码风格

### 3.1 命名规范

- 变量/函数：camelCase
- 组件：PascalCase
- 常量：UPPER_SNAKE_CASE
- 文件名：kebab-case（推荐）

示例：
```
getUserBlogs()
BlogCard.tsx
MAX_RETRY_COUNT
```

---

### 3.2 函数规范

- 单个函数不超过 50 行
- 参数不超过 3 个（复杂对象用 object）
- 避免副作用
- 必须有返回值类型（TypeScript）

---

### 3.3 组件规范

- 使用函数组件（React FC）
- 每个组件只做一件事
- 超过 200 行必须拆分
- UI 与逻辑分离（hooks 抽离逻辑）

---

## 4. TypeScript 规范

- 禁止使用 `any`
- 所有 API 响应必须定义类型
- 使用 `type` 优先于 `interface`（除非需要扩展）
- 公共类型统一放在 `/types`

---

## 5. 数据获取与状态管理

### 5.1 数据获取

- 使用 Server Components 获取数据（优先）
- 客户端仅用于交互
- 所有请求封装在 `/lib/api`

---

### 5.2 状态管理

- 优先使用 React 内置 state
- 避免引入重量级状态管理库
- 共享状态使用 context（仅必要时）

---

## 6. Supabase 使用规范

- 所有数据库操作封装在 `/lib/supabase`
- 不在组件中直接写 SQL
- 所有查询必须处理错误

示例：
```
const { data, error } = await supabase.from('blogs').select('*')
if (error) throw error
```

---

## 7. API 设计规范

- 使用 RESTful 风格
- 路由：`/api/blogs`
- 方法：
  - GET：获取数据
  - POST：创建
  - PATCH：更新
  - DELETE：删除

- 返回结构统一：
```
{
  data: ...,
  error: null
}
```

---

## 8. 认证与权限

- 所有 dashboard 路由必须校验用户
- 后端必须二次校验（不要只依赖前端）
- 使用 middleware 保护路由

---

## 9. 编辑器（TipTap）规范

- 编辑器内容统一存储为 JSON
- 渲染时转换为 HTML
- 禁止直接存储 HTML（避免安全问题）

---

## 10. 错误处理

- 所有 async 操作必须 try/catch
- 提供用户友好的错误提示
- 不暴露内部错误信息

---

## 11. 日志规范

- 开发环境使用 console.log
- 生产环境使用日志服务（可扩展）
- 错误必须记录

---

## 12. Git 规范

### 分支
- main：生产
- dev：开发
- feature/*：新功能

### commit message

```
feat: 新增博客发布功能
fix: 修复登录问题
refactor: 重构 API 结构
```

---

## 13. 性能优化

- 使用 SSR / SSG
- 图片使用 next/image
- 避免不必要的 client components
- 懒加载组件

---

## 14. 安全规范

- 所有输入必须校验
- 防止 XSS / SQL 注入
- 不在前端暴露敏感信息
- 使用环境变量管理密钥

---

## 15. AI 使用规范（OpenAI）

- AI 仅作为辅助，不直接发布内容
- 生成内容需用户确认
- 控制调用频率（防止滥用）

---

## 16. 邮件（Resend）规范

- 所有邮件模板统一管理
- 避免在业务逻辑中拼接 HTML

---

## 17. 代码审查（Code Review）

- 每个 PR 至少 1 人 review
- 检查：
  - 是否符合规范
  - 是否有重复代码
  - 是否影响性能
  - 是否有安全风险

---

## 18. 禁止事项

- 禁止使用 any
- 禁止在组件中写复杂 SQL
- 禁止未处理错误
- 禁止提交 console.log 到生产代码

---

## 19. 推荐工具

- ESLint
- Prettier
- Husky（git hooks）

---

## 20. 总结

本规范的核心是：

👉 可读性 > 技巧
👉 简单性 > 复杂性
👉 一致性 > 个性化

遵守规范可以显著提升开发效率和代码质量。

