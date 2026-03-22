# Users Rules / 开发规范

## 运行环境

- The server is always running on port **8081**
- 使用可用的 MCP servers 进行知识库查询与理解
- 严格使用npm命令

---

## 📁 组件组织

- 所有组件放在：`/app/components`
- 按**使用场景（use case）**拆分子目录
- 示例：

  ```
  /app/components/
    auth/
    dashboard/
    shared/
  ```

- 构建新组件时：
  - ✅ 优先使用 `/components/ui`
  - ❌ 避免重复造基础组件

---

## 🧩 开发规范

- 从控制台获取日志（console logs）进行调试
- 避免代码重复：
  - ✅ 优先**模块化**
  - ✅ 优先**复用组件**
  - ❌ 不要复制粘贴逻辑

---

## ⚡ 性能优化

- 主动建议性能优化方案：
  - 减少不必要渲染
  - 拆分组件
  - 使用懒加载（lazy loading）
  - 优化数据获取（server 优先）

---

## 🛡️ 安全规范

- 主动识别潜在安全问题：
  - 输入未校验
  - 敏感数据暴露
  - 客户端逻辑信任问题
- 并提供解决方案：
  - 使用服务端验证
  - 最小化数据返回
  - 严格权限控制

---

## 📦 依赖管理

- ❗ 不要主动安装新包
- 仅在明确要求时才引入依赖

---

## 📐 设计原则

- 优先：
  - **迭代优化（iteration）**
  - **模块化（modularization）**
- 避免：
  - 代码重复（duplication）
