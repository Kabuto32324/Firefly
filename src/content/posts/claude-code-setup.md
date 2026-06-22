---
title: Claude Code 最新安装教程
published: 2026-06-10
description: 面向普通用户的 Claude Code 安装与模型接入指南
image: "api"
tags:
  - Claude Code
  - AI编程
  - 教程
  - 入门
  - DeepSeek
category: 技术
draft: false
lang: ''
comment: true
---

## 什么是 AI Agent

聊 Claude Code 之前，先搞清楚一个概念：**AI Agent**，也叫「智能体」。

普通 AI 对话就是你问一句它答一句，像个问答机器。AI Agent 不一样——它能自己动手干活。

举个例子：你说「帮我把这个项目跑起来」，它会自己去看代码、装依赖、启动服务。不需要你一步步教它。

## Claude Code 与网页版的区别

很多人用过 Claude 的网页版，可能会问：网页版已经很好用了，为什么还要装 Claude Code？

最核心的区别是：网页版只能聊天，Claude Code 能直接在你的项目里干活。

| 对比项 | 网页版 Claude | Claude Code |
|--------|-------------|-------------|
| 使用方式 | 浏览器中对话 | 终端中运行 |
| 能力范围 | 只能聊天、生成文本 | 能读写文件、执行命令、操作你的项目 |
| 工作模式 | 你复制代码给它，它返回代码给你 | 它直接在你的项目里工作，实时看到你的代码 |
| 适用场景 | 问答、翻译、写作 | 编程开发、项目管理、自动化任务 |
| 代码理解 | 只能看到你粘贴的部分 | 能看到整个项目结构，理解上下文 |

举个实际例子：你想让它改一个 bug，网页版需要你把代码复制粘贴过去，它给你一段修改后的代码，你再手动替换回去。Claude Code 只需要你说「修复登录页面的 bug」，它会自己找到相关文件，分析问题，直接帮你改好。

## 环境准备

安装 Claude Code 之前，先装两个工具：**Git** 和 **Node.js**。

> macOS 和 Linux 用户通常已经预装了，可以直接跳过。本教程以 Windows 为例。

### 第一步：安装 Git

1. 打开 Git 官方下载页面：https://git-scm.com/download/win
2. 下载安装包，双击运行，一路「Next」就行

![Git 安装界面](https://img.mistfly.xyz/file/blog/EOX26Fzl.png)

3. 装完后打开命令提示符（`Win + R`，输入 `cmd`，回车），输入：

```bash
git --version
```

看到版本号就说明装好了。

![Git 安装成功验证](https://img.mistfly.xyz/file/blog/eNZZN5xc.png)

### 第二步：安装 Node.js

1. 打开 Node.js 官方下载页面：https://nodejs.org
2. 下载 **LTS（长期支持）** 版本
3. 同样一路「Next」就行

![Node.js 安装界面](https://img.mistfly.xyz/file/blog/qw7gNwbZ.png)

4. 装完后打开命令提示符，输入：

```bash
node --version
```

看到版本号就行，建议 v18 或更高。

![Node.js 安装成功验证](https://img.mistfly.xyz/file/blog/cSRwEX38.png)

### 第三步：切换 npm 国内镜像

国内网络直接从 npm 官方源下载包很慢，切到国内镜像会快很多。

```bash
npm config set registry https://registry.npmmirror.com
```

执行后没输出说明设置成功。

## 安装 Claude Code

环境准备好后，有两种方式安装。

### 方法一：手动安装

```bash
npm install -g @anthropic-ai/claude-code@2.1.153
```

安装过程可能需要几分钟。

![安装 Claude Code](https://img.mistfly.xyz/file/blog/lqKPJxGc.png)

### 方法二：用 AI 工具帮你安装

如果不想手动输命令，可以用 AI 工具帮你装。

比如下载 [Trae](https://www.trae.ai)（字节跳动的 AI 编程工具），打开后对它说：

> 帮我在电脑上安装 Claude Code，版本 2.1.153

Trae 会自动执行安装命令，你只需要点确认。完全零基础也能搞定。

### 配置环境变量

装完后直接输 `claude` 可能会提示命令不存在，需要把安装路径加到系统环境变量里。

按下 `Win + R`，输入 `sysdm.cpl`，回车打开系统属性：

1. 点「高级」→「环境变量」
2. 在「系统变量」里找到 `Path`，双击编辑
3. 点「新建」，加上 Claude Code 的安装路径：
   ```
   C:\Users\你的用户名\AppData\Roaming\npm\node_modules\@anthropic-ai\claude-code\bin
   ```
4. 一路「确定」保存

配置完后**重新打开**命令提示符，输入 `claude` 就能启动了。

## 安装 cc-switch

cc-switch 是一个切换不同 AI 模型 API 的工具。

**下载链接**：https://mistfly.lanzouu.com/iTjaX3rj1bqd

**解压密码**：1ssi

下载后双击运行就行，不用配环境变量。

## 接入 DeepSeek 模型

Claude Code 默认用 Anthropic 官方 API，但国内支付不方便，大多数人会接入第三方模型。这里用 **DeepSeek** 做示例。

打开 cc-switch，点右上角 **+** 号，选择添加 DeepSeek，输入你的 API Key。

![cc-switch 添加 DeepSeek](https://img.mistfly.xyz/file/blog/eOEQ3oqS.png)

![填入 DeepSeek API Key](https://img.mistfly.xyz/file/blog/yqcLksEl.png)

> API Key 在 DeepSeek 官网（https://platform.deepseek.com）注册创建。

添加完后，在 cc-switch 里选择启用 DeepSeek 就行。以后要换其他服务商，也在 cc-switch 里切换。

## 第一次使用

命令提示符里输 `claude` 启动，你会看到类似这样的界面：

![Claude Code 界面](https://img.mistfly.xyz/file/blog/4KjPTdHe.png)

直接用自然语言对话就行。试试这几个：

```
> 帮我看看当前目录下有哪些文件
```

```
> 用 Python 写一个简单的 Hello World 程序
```

```
> 解释一下这段代码是做什么的
```

## 常见问题

**Q：安装时提示权限不足？**

右键「命令提示符」选「以管理员身份运行」，再重新装。

**Q：输 `claude` 提示命令不存在？**

检查环境变量有没有配对。配完后要重新打开命令提示符才生效。

**Q：DeepSeek API 调用失败？**

1. 检查 API Key 对不对
2. 确认网络正常
3. 用 `cc-switch list` 看看当前配置

**Q：怎么换其他服务商？**

在 cc-switch 界面里直接选就行。

到这里，Claude Code 就装好了。写代码、调试、学新技术，都能用上它。

有问题欢迎评论区留言。
