# Tailwind CSS v4 迁移说明

本项目已升级到 **Tailwind CSS v4**，配置方式有重大变化。

## 主要变化

### 1. 移除配置文件
不再需要以下文件：
- ❌ `tailwind.config.js`
- ❌ `postcss.config.js`

### 2. 新的导入方式
在 `src/index.css` 中：

```css
/* 旧方式 (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 新方式 (v4) */
@import "tailwindcss";
```

### 3. 主题定义
使用 `@theme` 指令直接在 CSS 中定义主题：

```css
@theme {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
}
```

### 4. 移除的依赖
不再需要：
- `autoprefixer`
- `postcss`
- `@tailwindcss/postcss`

现在只需要安装：
- `tailwindcss` (v4.x)

## 当前配置

### package.json
```json
{
  "devDependencies": {
    "tailwindcss": "^4.1.18",
    "vite": "^7.2.4"
  }
}
```

### src/index.css
```css
@import "tailwindcss";

@theme {
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
}
```

## 使用方式

CSS 类名使用方式**完全相同**：

```jsx
<div className="bg-primary-500 text-white p-4 rounded-lg">
  Tailwind CSS v4
</div>
```

## 优势

- ✅ 更快的构建速度
- ✅ 更简单的配置
- ✅ 原生 CSS 变量支持
- ✅ 更小的包体积
- ✅ 不需要 PostCSS 插件

## 参考资料

- [Tailwind CSS v4 官方文档](https://tailwindcss.com/docs/v4-beta)
- [迁移指南](https://tailwindcss.com/docs/upgrade-guide)
