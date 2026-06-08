---
title: Git 使用教程：从零开始的完整指南
published: 2026-06-08
description: 一篇面向完全新手的 Git 使用教程，涵盖安装配置、基本操作、分支管理、远程仓库和 GitHub 协作工作流，帮助你快速上手版本控制。
tags:
  - Git
  - 教程
  - 版本控制
  - 入门
category: 实用技巧
draft: false
lang: ''
comment: true
---

## 为什么需要 Git

在写代码的过程中，你一定遇到过这样的情况：

- 改了一版代码觉得不好，想回到之前的版本，但已经找不到原来的文件了
- 两个人同时修改了同一个文件，合并时冲突不断
- 项目做大了，想同时开发新功能又不想影响线上版本

Git 就是解决这些问题的工具。它是一个**分布式版本控制系统**，可以：

- 记录文件的每一次修改，随时回到任意版本
- 让多人同时协作开发，自动合并代码
- 创建分支同时开发多个功能，互不干扰

简单来说，Git 是每个开发者必须掌握的基础工具。

## 安装 Git

### Windows

访问 [Git 官网](https://git-scm.com/download/win) 下载安装包，双击运行，一路点击「Next」即可。安装完成后，在终端（CMD 或 PowerShell）中输入以下命令验证：

```bash
git --version
```

看到版本号输出就说明安装成功。

### macOS

打开终端，输入以下命令（首次运行会自动安装 Xcode 命令行工具）：

```bash
git --version
```

如果提示未安装，按照提示点击安装即可。

### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install git

# CentOS/RHEL
sudo yum install git
```

## 基础配置

安装完成后，首先配置你的用户信息。这些信息会记录在每次提交中，让别人知道是谁做的修改。

```bash
# 设置用户名（会显示在提交记录中）
git config --global user.name "Your Name"

# 设置邮箱（会显示在提交记录中）
git config --global user.email "your@email.com"
```

其中 `--global` 表示全局配置，对电脑上所有 Git 仓库生效。如果你想在某个项目中使用不同的身份，可以去掉 `--global`，在项目目录下单独配置。

查看当前配置：

```bash
git config --list
```

## Git 工作流程

在开始操作之前，先理解 Git 的三个区域，这是理解所有命令的基础：

```
工作区（Working Directory）  →  暂存区（Staging Area）  →  仓库（Repository）
      你编辑文件的地方            git add 的地方              git commit 的地方
```

- **工作区**：你实际编辑文件的地方，就是你的项目文件夹
- **暂存区**：一个临时存放修改的区域，用 `git add` 把修改放进去
- **仓库**：Git 真正保存版本历史的地方，用 `git commit` 把暂存区的内容提交

简单记忆：**改了 → add → commit**，这是 Git 最核心的工作流。

## 基本操作

### 初始化仓库

在你的项目文件夹中打开终端，执行：

```bash
git init
```

这会在当前目录创建一个 `.git` 文件夹，Git 开始追踪这个目录中的文件。

### 查看状态

```bash
git status
```

这是你最常用的命令之一。它会显示：

- 哪些文件被修改了
- 哪些文件已暂存等待提交
- 哪些文件还没被 Git 追踪

养成修改后先 `git status` 的习惯，随时了解仓库状态。

### 添加到暂存区

```bash
# 添加指定文件
git add filename.txt

# 添加所有修改
git add .

# 添加所有修改（包括删除）
git add -A
```

`git add .` 是最常用的，表示把当前目录下所有修改都加入暂存区。

### 提交到仓库

```bash
git commit -m "提交说明"
```

`-m` 后面跟的是本次提交的说明，用来描述你做了什么修改。好的提交说明应该简洁明了，比如：

```bash
# 好的提交说明
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复首页加载缓慢问题"

# 不好的提交说明
git commit -m "update"
git commit -m "fix bug"
```

### 查看提交历史

```bash
# 完整日志
git log

# 简洁模式（推荐）
git log --oneline

# 图形化显示分支
git log --oneline --graph
```

`git log --oneline` 每条提交只显示一行，信息一目了然：

```bash
a1b2c3d feat: 添加用户登录功能
e4f5g6h fix: 修复首页加载缓慢问题
i7j8k9l init: 项目初始化
```

### 查看修改内容

```bash
# 查看工作区的修改
git diff

# 查看暂存区的修改
git diff --staged
```

## 分支管理

分支是 Git 最强大的功能之一。它让你可以在不影响主线代码的情况下开发新功能。

### 分支是什么

想象你正在写一本书，突然有个新想法，但不确定好不好。你可以先复制一份（创建分支），在副本上尝试，满意了再合并回主线。不满意直接丢弃，主线不受影响。

```
main:    A --- B --- C
                      \
feature:               D --- E
```

### 分支基本操作

```bash
# 查看所有分支（当前分支前面有 * 号）
git branch

# 创建新分支
git branch feature-login

# 切换到新分支
git checkout feature-login

# 创建并直接切换（一步到位）
git checkout -b feature-login

# 也可以用 switch（更新的命令）
git switch -c feature-login
```

### 合并分支

开发完成后，把新分支的代码合并回主线：

```bash
# 先切换回主线
git checkout main

# 合并 feature-login 分支
git merge feature-login
```

合并后如果不再需要这个分支，可以删除：

```bash
git branch -d feature-login
```

### 分支工作流

一个推荐的新手工作流：

1. 从 `main` 创建功能分支
2. 在功能分支上开发、提交
3. 开发完成后合并回 `main`
4. 删除功能分支

```bash
git checkout -b feature-new-page
# ... 开发、提交 ...
git checkout main
git merge feature-new-page
git branch -d feature-new-page
```

## 远程仓库

远程仓库是托管在网络上的 Git 仓库，最常用的就是 GitHub。它让你的代码可以备份、分享和协作。

### 配置 SSH Key

为了安全地连接 GitHub，需要配置 SSH Key。只需配置一次。

```bash
# 生成 SSH Key（一路回车即可）
ssh-keygen -t ed25519 -C "your@email.com"

# 查看公钥内容
cat ~/.ssh/id_ed25519.pub
```

复制输出的内容，到 GitHub → Settings → SSH and GPG keys → New SSH key，粘贴进去保存。

测试连接：

```bash
ssh -T git@github.com
```

看到 `Hi username! You've successfully authenticated` 就说明配置成功。

### 克隆远程仓库

```bash
git clone git@github.com:username/repository.git
```

这会把整个仓库下载到本地，包括所有历史记录。

### 推送到远程仓库

```bash
# 首次推送（关联远程分支）
git push -u origin main

# 之后的推送
git push
```

`-u` 参数会建立本地 `main` 和远程 `origin/main` 的关联，之后直接 `git push` 就行。

### 从远程仓库拉取

```bash
# 拉取并合并（推荐）
git pull

# 只拉取不合并
git fetch
```

`git pull` = `git fetch` + `git merge`，会把远程的更新自动合并到本地。

### 查看远程仓库信息

```bash
# 查看远程仓库地址
git remote -v

# 添加远程仓库
git remote add origin git@github.com:username/repository.git
```

## GitHub 协作工作流

在实际团队开发中，通常不会直接往 `main` 分支推送代码，而是通过以下流程协作。

### Fork 仓库

1. 在 GitHub 上打开想参与的项目
2. 点击右上角的「Fork」按钮
3. 仓库会被复制到你的 GitHub 账号下

### 克隆你 Fork 的仓库

```bash
git clone git@github.com:your-username/repository.git
cd repository
```

### 创建功能分支

```bash
git checkout -b feature-my-change
```

在功能分支上开发、提交：

```bash
# 修改文件后...
git add .
git commit -m "feat: 添加新功能"
git push origin feature-my-change
```

### 创建 Pull Request

1. 打开你 Fork 的仓库页面
2. 点击「Compare & pull request」
3. 填写标题和描述，说明你做了什么修改
4. 点击「Create pull request」

原仓库的维护者会审查你的代码，可能会提出修改建议。修改后继续提交，PR 会自动更新。

### 处理合并冲突

当两个人修改了同一个文件的同一行代码时，Git 无法自动合并，就会产生冲突。

```bash
git pull origin main
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html
```

打开冲突文件，你会看到类似这样的标记：

```
<<<<<<< HEAD
你的修改内容
=======
别人的修改内容
>>>>>>> origin/main
```

手动选择保留哪部分代码，删掉冲突标记，然后：

```bash
git add .
git commit -m "fix: 解决合并冲突"
```

## 常用技巧

### .gitignore 忽略文件

有些文件不需要提交到仓库（如编译产物、依赖包），在项目根目录创建 `.gitignore` 文件：

```
# 忽略所有 .log 文件
*.log

# 忽略 node_modules 目录
node_modules/

# 忽略构建产物
dist/
build/
```

### 暂存工作

开发到一半需要紧急修复 bug？用 `stash` 暂存当前修改：

```bash
# 暂存
git stash

# 恢复
git stash pop
```

### 撤销修改

```bash
# 撤销工作区的修改（未 git add）
git checkout -- filename.txt

# 撤销暂存（已 git add 但未 commit）
git reset HEAD filename.txt
```

### 修改最后一次提交

```bash
git commit --amend -m "新的提交说明"
```

### 查看某次提交的修改

```bash
git show commit-id
```

## 常用命令速查表

| 命令 | 说明 |
|------|------|
| `git init` | 初始化仓库 |
| `git clone <url>` | 克隆远程仓库 |
| `git status` | 查看仓库状态 |
| `git add .` | 添加所有修改到暂存区 |
| `git commit -m "msg"` | 提交暂存区内容 |
| `git log --oneline` | 查看简洁提交历史 |
| `git diff` | 查看未暂存的修改 |
| `git branch` | 查看/创建分支 |
| `git checkout -b <name>` | 创建并切换分支 |
| `git switch -c <name>` | 创建并切换分支（新语法） |
| `git merge <branch>` | 合并分支 |
| `git branch -d <name>` | 删除分支 |
| `git push` | 推送到远程仓库 |
| `git pull` | 拉取并合并远程更新 |
| `git fetch` | 拉取远程更新（不合并） |
| `git stash` | 暂存当前修改 |
| `git stash pop` | 恢复暂存的修改 |
| `git remote -v` | 查看远程仓库地址 |
| `git reset HEAD <file>` | 取消暂存 |
| `git checkout -- <file>` | 丢弃工作区修改 |
| `git commit --amend` | 修改最后一次提交 |

## 结语

Git 的命令看起来很多，但日常开发中真正高频使用的就那几个：`git add`、`git commit`、`git push`、`git pull`、`git branch`。先把这几个用熟，遇到问题再查对应的命令就好。

建议动手跟着这篇教程操作一遍，实践出真知。遇到问题可以随时查阅 [Git 官方文档](https://git-scm.com/doc) 或者搜索具体报错信息。
