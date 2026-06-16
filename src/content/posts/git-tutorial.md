---
title: Git 使用教程：从零开始的完整指南
published: 2026-06-08
description: 一篇面向完全新手的 Git 使用教程，涵盖安装配置、基本操作、分支管理、远程仓库和 GitHub 协作工作流，帮助你快速上手版本控制。
tags:
  - Git
  - 教程
  - 版本控制
  - 入门
category: 技术
draft: false
lang: ''
comment: true
---

## 为什么需要 Git

写代码经常会遇到这种情况：改了一版觉得不好，想回去找原来的文件，找不到了。或者两个人改了同一个文件，合并时冲突不断。

Git 就是干这个的——它记录文件的每一次修改，随时能回到任意版本。多人协作、分支开发，都能搞定。

## 安装 Git

### Windows

去 [Git 官网](https://git-scm.com/download/win) 下载安装包，双击运行，一路「Next」就行。装完后在终端（CMD 或 PowerShell）输入：

```bash
git --version
```

看到版本号就说明装好了。

### macOS

打开终端，输入：

```bash
git --version
```

首次运行会自动装 Xcode 命令行工具，按提示操作就行。

### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install git

# CentOS/RHEL
sudo yum install git
```

## 基础配置

装完后先配用户信息，这些会记录在每次提交里。

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

`--global` 是全局配置，对所有仓库生效。想在某个项目用不同身份，去掉 `--global` 在项目目录下单独配。

```bash
git config --list
```

## Git 工作流程

Git 有三个区域，理解这个就理解了大部分命令：

```
工作区（Working Directory）  →  暂存区（Staging Area）  →  仓库（Repository）
      你编辑文件的地方            git add 的地方              git commit 的地方
```

- **工作区**：就是你的项目文件夹，你改文件的地方
- **暂存区**：临时存放修改，用 `git add` 放进去
- **仓库**：真正保存版本历史的地方，用 `git commit` 提交

核心流程：**改了 → add → commit**。

## 基本操作

### 初始化仓库

项目文件夹里打开终端：

```bash
git init
```

当前目录会多出一个 `.git` 文件夹，Git 开始追踪这个目录。

### 查看状态

```bash
git status
```

这个命令用得最多。它会告诉你哪些文件改了、哪些暂存了、哪些还没追踪。

改完文件先 `git status` 看看，养成习惯。

### 添加到暂存区

```bash
git add filename.txt  # 添加指定文件
git add .             # 添加所有修改
git add -A            # 添加所有修改（包括删除）
```

`git add .` 最常用，把当前目录下所有修改都放进去。

### 提交到仓库

```bash
git commit -m "提交说明"
```

提交说明要写清楚你改了什么，别只写 "update" 或 "fix bug"：

```bash
# 好的
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复首页加载缓慢问题"

# 不好的
git commit -m "update"
git commit -m "fix bug"
```

### 查看提交历史

```bash
git log              # 完整日志
git log --oneline    # 简洁模式，推荐
git log --oneline --graph  # 图形化显示分支
```

`git log --oneline` 每条提交只显示一行：

```bash
a1b2c3d feat: 添加用户登录功能
e4f5g6h fix: 修复首页加载缓慢问题
i7j8k9l init: 项目初始化
```

### 查看修改内容

```bash
git diff           # 查看工作区的修改
git diff --staged  # 查看暂存区的修改
```

## 分支管理

分支是 Git 最强大的功能。在不影响主线代码的情况下开发新功能。

### 分支是什么

想象你在写一本书，突然有个新想法，不确定好不好。先复制一份（创建分支），在副本上试，满意了再合并回主线。不满意直接丢弃，主线不受影响。

```
main:    A --- B --- C
                      \
feature:               D --- E
```

### 分支基本操作

```bash
git branch                          # 查看所有分支（当前分支有 * 号）
git branch feature-login            # 创建新分支
git checkout feature-login          # 切换到新分支
git checkout -b feature-login       # 创建并切换（一步到位）
git switch -c feature-login         # 同上，更新的语法
```

### 合并分支

开发完后合并回主线：

```bash
git checkout main
git merge feature-login
```

不需要了就删掉：

```bash
git branch -d feature-login
```

### 分支工作流

推荐的新手流程：

1. 从 `main` 创建功能分支
2. 在功能分支上开发、提交
3. 合并回 `main`
4. 删掉功能分支

```bash
git checkout -b feature-new-page
# ... 开发、提交 ...
git checkout main
git merge feature-new-page
git branch -d feature-new-page
```

## 远程仓库

远程仓库托管在网络上，最常用的是 GitHub。代码备份、分享、协作都靠它。

### 配置 SSH Key

连接 GitHub 需要配 SSH Key，只用配一次。

```bash
ssh-keygen -t ed25519 -C "your@email.com"  # 一路回车
cat ~/.ssh/id_ed25519.pub                   # 查看公钥
```

复制公钥内容，到 GitHub → Settings → SSH and GPG keys → New SSH key，粘贴保存。

测试：

```bash
ssh -T git@github.com
```

看到 `Hi username! You've successfully authenticated` 就说明配好了。

### 克隆远程仓库

```bash
git clone git@github.com:username/repository.git
```

整个仓库下载到本地，包括所有历史记录。

### 推送到远程仓库

```bash
git push -u origin main  # 首次推送，关联远程分支
git push                 # 之后直接推送
```

`-u` 建立本地 `main` 和远程 `origin/main` 的关联，之后直接 `git push` 就行。

### 从远程仓库拉取

```bash
git pull   # 拉取并合并（推荐）
git fetch  # 只拉取不合并
```

`git pull` = `git fetch` + `git merge`，远程更新自动合并到本地。

### 查看远程仓库信息

```bash
git remote -v                                                    # 查看地址
git remote add origin git@github.com:username/repository.git     # 添加远程仓库
```

## GitHub 协作工作流

团队开发一般不会直接往 `main` 推代码，而是通过以下流程协作。

### Fork 仓库

1. GitHub 上打开想参与的项目
2. 点「Fork」
3. 仓库复制到你的账号下

### 克隆你 Fork 的仓库

```bash
git clone git@github.com:your-username/repository.git
cd repository
```

### 创建功能分支

```bash
git checkout -b feature-my-change
```

开发、提交：

```bash
git add .
git commit -m "feat: 添加新功能"
git push origin feature-my-change
```

### 创建 Pull Request

1. 打开你 Fork 的仓库页面
2. 点「Compare & pull request」
3. 填写标题和描述
4. 点「Create pull request」

原仓库维护者会审查代码，可能提修改建议。改完继续提交，PR 自动更新。

### 处理合并冲突

两个人改了同一个文件的同一行，Git 合并不了，就会冲突。

```bash
git pull origin main
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html
```

打开冲突文件，你会看到：

```
<<<<<<< HEAD
你的修改内容
=======
别人的修改内容
>>>>>>> origin/main
```

手动选保留哪部分，删掉冲突标记：

```bash
git add .
git commit -m "fix: 解决合并冲突"
```

## 常用技巧

### .gitignore 忽略文件

有些文件不用提交（编译产物、依赖包），在项目根目录创建 `.gitignore`：

```
*.log
node_modules/
dist/
build/
```

### 暂存工作

开发到一半要紧急修 bug？用 `stash` 暂存：

```bash
git stash      # 暂存
git stash pop  # 恢复
```

### 撤销修改

```bash
git checkout -- filename.txt   # 撤销工作区修改（未 git add）
git reset HEAD filename.txt    # 撤销暂存（已 git add 但未 commit）
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

Git 命令看起来很多，但日常高频使用的就那几个：`git add`、`git commit`、`git push`、`git pull`、`git branch`。先把这几个用熟，遇到问题再查对应命令。

动手跟着操作一遍，实践出真知。有问题查阅 [Git 官方文档](https://git-scm.com/doc) 或者直接搜报错信息。
