---
icon: pen-to-square
date: 2024-11-09
category:
  - 教程推荐
tag:
  - npm
---

# 使用阿里云 npm 镜像加速

## 1. 什么是 npm?

npm（Node Package Manager）是随同 Node.js 一起安装的包管理工具，能够解决 Node.js 代码部署上的许多问题。常见的使用场景包括：

- 允许用户从 NPM 服务器下载别人编写的第三方包到本地使用。
- 允许用户从 NPM 服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到 NPM 服务器供别人使用。

由于新版的 Node.js 已经集成了 npm，所以安装 Node.js 后，npm 也会一并安装。同样可以通过输入 `npm -v` 来测试是否成功安装，若显示版本号，则表示安装成功。

npm 可以理解为一个命令行工具，它的使命就是帮助你为项目自动安装所依赖的开发包。类似于 PHP 的依赖管理工具 Composer，Node.js 也有类似的包管理工具 npm。

默认的 npm 仓库地址是 [http://registry.npmjs.org](http://registry.npmjs.org)。这是官方的仓库，其他仓库通常会定时同步官方仓库的内容。因此，切换到国内的镜像源可以显著提高下载速度，尤其是在网络较慢的情况下。

阿里云官方镜像站：[https://developer.aliyun.com/mirror/](https://developer.aliyun.com/mirror/)

## 2. 查看当前 npm 源地址设置（默认是官方镜像地址）

```bash
npm config get registry
```

输出结果为：

```
https://registry.npmjs.org/
```

## 3. 配置阿里巴巴镜像地址（推荐，速度快，稳定）

阿里云的 npm 镜像地址是 [https://developer.aliyun.com/mirror/](https://developer.aliyun.com/mirror/)，具体的 npm 镜像地址为：

```
http://www.npmmirror.com
```

你可以通过以下命令来配置 npm 使用阿里云镜像：

```bash
npm config set registry https://registry.npmmirror.com
```

**注意**：原淘宝 npm 镜像地址 `http://registry.npm.taobao.org` 已经在 2022 年 6 月 30 日停止解析，新的地址是 `http://registry.npmmirror.com`。

## 4. 恢复到官方源

如果你需要解除镜像并恢复到官方源，可以执行以下命令：

```bash
npm config set registry https://registry.npmjs.org
```
