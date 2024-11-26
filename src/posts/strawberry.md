---
icon: pen-to-square
date: 2024-11-11
category:
  - Vue
  - 教程推荐
tag:
  - 个人博客
---


# 使用 VuePress2 + GitHub Pages 免费搭建个人博客网站

## 介绍

- **VuePress2**：基于 Vue 的静态网站生成器，风格简约，配置简单。VuePress2 是 VuePress 的第二个主要版本，带来了许多新特性和改进，包括性能优化、更灵活的配置选项及对 Vue3 的支持。
- **pnpm**：一个快速、轻量级、模块化、安全、节省空间、可靠的包管理器。它与 npm 和 yarn 类似，但具有一些优势，在绝大多数场景下会比 npm/yarn 快 2-3 倍，可以高效利用磁盘空间。

## 搭建步骤

### 1. 安装 Node.js

1. 访问 [Node.js 官网](https://nodejs.org/) 下载并安装。
2. 安装后，打开命令行输入 `node -v` 检查版本号以确认安装成功。

### 2. 安装 pnpm

在命令行中输入以下指令安装 pnpm：

```bash
npm install pnpm -g
```

安装后，输入 `pnpm -v` 查看版本号以确认安装成功。

### 3. 安装 VuePress

1. 创建一个项目文件夹并进入该目录。
2. 初始化项目：执行以下命令：

```bash
git init
pnpm init
```

3. 安装 VuePress 和相关依赖：

```bash
pnpm add -D vuepress@next vue
pnpm add -D @vuepress/bundler-vite@next @vuepress/theme-default@next
```

4. 在 `package.json` 中修改 `scripts` 配置：

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

5. 创建目录和配置文件：

```bash
mkdir docs
mkdir docs/.vuepress
```

6. 创建 `docs/.vuepress/config.js` 配置文件。

7. 将默认的临时目录和缓存目录添加到 `.gitignore` 文件中：

```
node_modules/
.vuepress/dist/
```

### 4. 启动开发服务器

使用以下命令启动开发服务器来开发你的文档网站：

```bash
pnpm docs:dev
```

此时，你可以在浏览器中访问 `http://localhost:8080` 查看网站效果。

### 5. 构建网站

运行以下命令来构建网站，静态文件将生成在 `docs/.vuepress/dist` 目录中：

```bash
pnpm docs:build
```

### 6. 配置基本布局

1. 编辑 `docs/.vuepress/config.js` 文件，配置导航栏、侧边栏等。

```js
module.exports = {
  themeConfig: {
    navbar: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'About',
        link: '/about/'
      }
    ],
    sidebar: [
      {
        text: 'Guide',
        children: [
          '/guide/',
          '/guide/installation/'
        ]
      }
    ]
  }
}
```

### 7. 部署到 GitHub Pages

1. 在 GitHub 上新建一个仓库，例如 `<用户名>.github.io`。
2. 在 `config.js` 中添加 `base` 路径配置：

```js
module.exports = {
  base: '/<用户名>.github.io/'
}
```

3. 创建 GitHub Actions 配置文件，以自动化部署流程。创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: pnpm install
      - name: Build the site
        run: pnpm docs:build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          gh-token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vuepress/dist
```

4. 提交项目到 GitHub 仓库，并在 GitHub Pages 设置中部署网站。

---

