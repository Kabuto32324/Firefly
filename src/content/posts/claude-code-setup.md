---
title: Claude Code 最新安装教程
published: 2026-06-10
description: 面向普通用户的 Claude Code 安装与模型接入指南
tags:
  - Claude Code
  - AI编程
  - 教程
  - 入门
  - DeepSeek
category: 实用技巧
draft: false
lang: ''
comment: true
---

## 什么是 AI Agent（智能体）

在聊 Claude Code 之前，我们先了解一个概念：**AI Agent**，中文叫「智能体」。

普通的 AI 对话（比如你打开一个网页，输入问题，AI 给你回答）本质上是一个**问答机器**——你问一句，它答一句，仅此而已。

而 **AI Agent** 不同，它是一个**能主动行动的 AI**。它不仅能回答问题，还能：

- **感知环境**：读取你电脑上的文件、查看目录结构
- **做出决策**：分析你的需求，决定该用什么工具来完成
- **执行行动**：实际运行命令、修改文件、调用 API

打个比方：普通 AI 像是一个只能打电话的顾问，你问它怎么做，它告诉你步骤；而 AI Agent 像是一个能直接上手干活的同事，你说「帮我把这个项目跑起来」，它会自己去看代码、装依赖、启动服务。

## Claude Code 与网页版的区别

很多人用过 Claude 的网页版（claude.ai），可能会问：网页版已经很好用了，为什么还要装 Claude Code？

简单来说，两者的核心区别在于：

| 对比项 | 网页版 Claude | Claude Code |
|--------|-------------|-------------|
| 使用方式 | 浏览器中对话 | 终端中运行 |
| 能力范围 | 只能聊天、生成文本 | 能读写文件、执行命令、操作你的项目 |
| 工作模式 | 你复制代码给它，它返回代码给你 | 它直接在你的项目里工作，实时看到你的代码 |
| 适用场景 | 问答、翻译、写作 | 编程开发、项目管理、自动化任务 |
| 代码理解 | 只能看到你粘贴的部分 | 能看到整个项目结构，理解上下文 |

举个例子：

- **网页版**：你想让它帮你改一个 bug，需要把相关代码复制粘贴到对话框里，它给你一段修改后的代码，你再手动替换回去。
- **Claude Code**：你只需要说「修复登录页面的 bug」，它会自己找到相关文件，分析问题，直接帮你改好。

这就是为什么 Claude Code 被称为 **AI Agent**——它不是一个被动回答问题的聊天机器人，而是一个能主动在你电脑上工作的智能助手。

## 环境准备

在安装 Claude Code 之前，我们需要先安装两个基础工具：**Git** 和 **Node.js**。这两个工具是 Claude Code 运行的必要依赖。

> macOS 和 Linux 用户通常已经预装了 Git 和 Node.js，可以直接跳过这一步。本教程以 Windows 为例。

### 第一步：安装 Git

Git 是一个版本控制工具，Claude Code 需要它来管理代码。

1. 打开 Git 官方下载页面：https://git-scm.com/download/win
2. 点击下载按钮，等待下载完成
3. 运行安装程序，一路点击「Next」即可，不需要修改任何设置

![Git 安装界面](https://img.mistfly.xyz/file/blog/EOX26Fzl.png)

4. 安装完成后，打开命令提示符（按下 `Win + R`，输入 `cmd`，回车），输入以下命令验证安装：

```bash
git --version
```

如果看到版本号输出，说明安装成功。

![Git 安装成功验证](https://img.mistfly.xyz/file/blog/eNZZN5xc.png)

### 第二步：安装 Node.js

Node.js 是 Claude Code 运行的基础环境。

1. 打开 Node.js 官方下载页面：https://nodejs.org
2. 下载 **LTS（长期支持）** 版本
3. 运行安装程序，同样一路点击「Next」即可

![Node.js 安装界面](https://img.mistfly.xyz/file/blog/qw7gNwbZ.png)

4. 安装完成后，打开命令提示符，输入以下命令验证安装：

```bash
node --version
```

如果看到版本号输出（建议 v18 或更高版本），说明安装成功。

![Node.js 安装成功验证](https://img.mistfly.xyz/file/blog/cSRwEX38.png)

### 第三步：切换 npm 国内镜像

由于国内网络环境，直接从 npm 官方源下载包速度很慢。我们需要切换到国内镜像源来加速下载。

在命令提示符中执行以下命令：

```bash
npm config set registry https://registry.npmmirror.com
```

执行后不会有任何输出，说明设置成功。后续所有 npm 安装操作都会自动使用国内镜像，速度会快很多。

## 安装 Claude Code

环境准备好之后，有两种方式安装 Claude Code。

### 方法一：手动安装

在命令提示符中执行以下命令：

```bash
npm install -g @anthropic-ai/claude-code@2.1.153
```

这行命令会从 npm 下载并安装 Claude Code 到你的系统中。安装过程可能需要几分钟，请耐心等待。

![安装 Claude Code](https://img.mistfly.xyz/file/blog/lqKPJxGc.png)

### 方法二：用 AI 工具帮你安装

如果你觉得手动输入命令太麻烦，也可以用 AI 工具帮你完成安装。

比如下载安装 [Trae](https://www.trae.ai)（字节跳动推出的 AI 编程工具），打开后直接对它说：

> 帮我在电脑上安装 Claude Code，版本 2.1.153

Trae 会自动帮你执行安装命令，你只需要点击确认即可。这种方式特别适合完全零基础的用户——你甚至不需要知道什么是终端，AI 会帮你搞定一切。

### 配置环境变量

安装完成后，你可能会发现直接在命令提示符中输入 `claude` 无法运行。这是因为 Claude Code 的安装路径还没有添加到系统环境变量中。

按下 `Win + R`，输入 `sysdm.cpl`，回车打开系统属性，然后：

1. 点击「高级」选项卡
2. 点击「环境变量」按钮
3. 在「系统变量」中找到 `Path`，双击编辑
4. 点击「新建」，添加 Claude Code 的安装路径：
   ```
   C:\Users\你的用户名\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin
   ```
5. 一路点击「确定」保存

配置完成后，**重新打开**命令提示符，输入 `claude` 即可启动。

## 安装 cc-switch

cc-switch 是一个帮助我们切换不同 AI 模型 API 的工具。

你可以在以下地址下载 cc-switch：

**下载链接**：https://mistfly.lanzouu.com/iTjaX3rj1bqd

**解压密码**：1ssi

下载后直接双击运行即可，不需要配置系统环境变量。

## 接入 DeepSeek 模型

Claude Code 默认需要使用 Anthropic 官方的 API，但由于国内支付限制，大多数用户会选择接入第三方模型服务商。这里我们使用 **DeepSeek** 作为示例。

打开 cc-switch，点击右上角的 **+** 号按钮，选择添加 DeepSeek，然后输入你的 DeepSeek API Key。

![cc-switch 添加 DeepSeek](https://img.mistfly.xyz/file/blog/eOEQ3oqS.png)

![填入 DeepSeek API Key](https://img.mistfly.xyz/file/blog/yqcLksEl.png)

> API Key 可以在 DeepSeek 官网（https://platform.deepseek.com）注册并创建。

添加完成后，在 cc-switch 界面中直接选择并启用 DeepSeek 即可。后续需要切换其他服务商时，也可以在 cc-switch 界面中直接切换。

## 第一次使用

在命令提示符中输入 `claude` 启动 Claude Code，你会看到类似下面的界面：

![Claude Code 界面](https://img.mistfly.xyz/file/blog/4KjPTdHe.png)

现在你可以直接用自然语言和它对话了。试试输入一些简单的指令：

```
> 帮我看看当前目录下有哪些文件
```

```
> 用 Python 写一个简单的 Hello World 程序
```

```
> 解释一下这段代码是做什么的
```

Claude Code 会理解你的意图并帮你完成相应的操作。

## 常见问题

### Q：安装过程中提示权限不足怎么办？

Windows 用户可以尝试以管理员身份运行命令提示符。右键点击「命令提示符」，选择「以管理员身份运行」，然后重新执行安装命令。

### Q：输入 `claude` 提示命令不存在怎么办？

检查是否已经按照上文的「配置环境变量」步骤正确添加了路径。配置完成后需要重新打开命令提示符才能生效。

### Q：DeepSeek API 调用失败怎么办？

1. 确认你的 API Key 是否正确且有效
2. 检查网络连接是否正常
3. 执行 `cc-switch list` 查看当前使用的 API 配置

### Q：如何切换回其他 API 服务商？

直接在 cc-switch 界面中选择你需要的服务商即可切换。

## 结语

到这里，你已经成功安装并配置好了 Claude Code。接下来你可以用它来辅助你的编程工作，无论是写代码、调试问题还是学习新技术，它都能帮上忙。

如果在使用过程中遇到其他问题，欢迎在评论区留言讨论。
