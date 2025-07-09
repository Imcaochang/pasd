# Waitlist 应用

这是一个使用 Next.js、Shadcn UI 和 Prisma 构建的等待名单应用，允许用户注册以获取产品发布的最新消息。

## 功能

- 密码生成器工具
- 等待名单注册表单
- PostgreSQL 数据库集成
- 响应式设计

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Shadcn UI](https://ui.shadcn.com/) - UI 组件库
- [Prisma](https://prisma.io/) - 数据库 ORM
- [PostgreSQL](https://www.postgresql.org/) - 数据库

## 开始使用

### 前提条件

- Node.js 16.8+ 版本
- PostgreSQL 数据库

### 安装

1. 克隆仓库:

```bash
git clone <仓库URL>
cd waitlist-app
```

2. 安装依赖:

```bash
npm install
```

3. 设置环境变量:

创建 `.env` 文件并添加以下内容:

```
DATABASE_URL="postgresql://username:password@localhost:5432/waitlist?schema=public"
ADMIN_API_KEY="your-secret-api-key"
```

4. 设置数据库:

```bash
npx prisma migrate dev --name init
```

5. 启动开发服务器:

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## API 端点

### POST /api/waitlist

添加新邮箱到等待名单。

请求体:
```json
{
  "email": "user@example.com"
}
```

### GET /api/waitlist/list

获取等待名单列表（需要 API 密钥验证）。

请求头:
```
Authorization: Bearer your-api-key
```

查询参数:
- `page`: 页码 (默认: 1)
- `limit`: 每页项目数 (默认: 10)

## 部署

本应用可以部署到 Vercel:

```bash
npm run build
```

按照 Vercel 的说明部署应用。

## 许可证

MIT
