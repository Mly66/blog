---
cover: /assets/images/cover2.jpg
icon: pen-to-square
date: 2024-11-12
category:
  - 教程推荐
tag:
  - 红
  - 圆
star: true
sticky: true
---

# 使用阿里云 pip 镜像加速

在使用Python安装包工具pip时，经常会遇到下载速度慢的问题。这通常是因为pip默认使用的是官方源，在国内下载速度较慢。为了提高下载速度，可以通过更换源来解决。

## 省流

```bash
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
```
## 国内源路径

- 阿里云：`https://mirrors.aliyun.com/pypi/simple/`
- 豆瓣(douban)：`https://pypi.douban.com/simple/`
- 清华大学：`https://pypi.tuna.tsinghua.edu.cn/simple/`
- 中国科学技术大学：`https://pypi.mirrors.ustc.edu.cn/simple/`

## 换源方式

### 临时换源

在pip安装包时，可以通过添加`-i`参数指定源的URL：

```bash
# 使用豆瓣源下载Django包
pip install django -i https://pypi.douban.com/simple
```

这种方法适用于偶尔安装少量包，不是长期解决方案。

### 永久换源（更换默认源）

#### Linux

1. 在用户目录下创建或修改`~/.pip/pip.conf`文件；
2. 添加或修改以下内容：

```ini
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host = mirrors.aliyun.com
```

3. 保存并退出编辑器。

#### Windows

1. 修改`%HOMEPATH%\pip\pip.ini`文件；
2. 添加或修改与Linux相同的内容；
3. 保存并退出编辑器。
