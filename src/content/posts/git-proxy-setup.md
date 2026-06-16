---
title: Git 代理配置指南：解决 GitHub 访问问题
published: 2026-06-07
tags:
  - Git
  - 代理
  - GitHub
  - 实用技巧
category: 技术
description: 本文介绍了如何为 Git 配置 HTTP 代理和 SOCKS5 代理，以解决在中国大陆无法正常拉取和推送 GitHub 仓库的问题。
comment: true
---

## 为什么需要配置代理

国内访问 GitHub 经常超时或者慢得要命。给 Git 配个代理，让它通过 Clash、V2Ray 这些工具走海外线路，就能解决。

## 前提条件

你得先有个代理工具（Clash、V2Ray、Shadowsocks 之类），并且已经在跑。

代理工具会在本地开个端口，常见的：

- **Clash**：7890（HTTP）/ 7891（SOCKS5）
- **V2Ray**：10809（HTTP）/ 10808（SOCKS5）

具体端口号看你用的工具。

## 配置 HTTP/HTTPS 代理

### 全局配置（所有 Git 操作都走代理）

```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

`127.0.0.1` 是本机地址，`7890` 是代理端口，按你实际情况改。

### 仅对 GitHub 走代理

不想所有 Git 操作都走代理的话，可以只对 GitHub 生效：

```bash
git config --global http.https://github.com.proxy http://127.0.0.1:7890
```

这样只有访问 `github.com` 走代理，GitLab 之类的不受影响。

## 配置 SOCKS5 代理

```bash
git config --global http.proxy socks5://127.0.0.1:7891
git config --global https.proxy socks5://127.0.0.1:7891
```

也可以只对 GitHub 生效：

```bash
git config --global http.https://github.com.proxy socks5://127.0.0.1:7891
```

> **注意**：有些版本的 Git 不支持 `socks5://`，试试换成 `socks5h://`（让 DNS 也走代理）：
>
> ```bash
> git config --global http.proxy socks5h://127.0.0.1:7891
> ```

## 验证配置

```bash
git config --global --list
git clone https://github.com/octocat/Hello-World.git
```

能正常克隆就说明配好了。

## 取消代理

换到不需要代理的网络（比如公司内网直连 GitHub），之前配的代理反而会让 Git 连不上。得取消掉。

### 删除代理配置

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
git config --global --unset http.https://github.com.proxy
```

### 临时禁用代理（推荐）

偶尔不需要代理的话，用环境变量临时覆盖：

```bash
git -c http.proxy= -c https.proxy= clone https://github.com/user/repo.git
```

或者：

```bash
export http_proxy=""
export https_proxy=""
git clone https://github.com/user/repo.git
```

这种方式不改 Git 配置，关终端自动恢复。

## 常见问题

**配置了代理还是连不上？**

- 代理工具是不是没跑
- 端口号对不对
- 浏览器里试试能不能走代理访问 GitHub

**克隆速度还是很慢？**

- `socks5://` 换成 `socks5h://`，让 DNS 也走代理
- 代理节点可能不稳定，换个节点试试

**不想用全局代理？**

用 `http.https://github.com.proxy` 只对 GitHub 生效，或者克隆时临时指定：

```bash
git -c http.proxy=http://127.0.0.1:7890 clone https://github.com/user/repo.git
```
