---
title: Git 代理配置指南：解决 GitHub 访问问题
published: 2026-06-07
tags:
  - Git
  - 代理
  - GitHub
  - 实用技巧
category: 实用技巧
description: 本文介绍了如何为 Git 配置 HTTP 代理和 SOCKS5 代理，以解决在中国大陆无法正常拉取和推送 GitHub 仓库的问题。
comment: true
---

## 为什么需要配置代理

在中国大陆，访问 GitHub 经常会遇到连接超时或速度极慢的问题。这是因为 GitHub 的服务器位于海外，直连往往不稳定。为 Git 配置代理，可以让 Git 通过你的代理工具（如 Clash、V2Ray 等）来访问 GitHub，从而解决这些问题。

## 前提条件

在配置之前，请确保你已经：

1. 安装了代理工具（如 Clash、V2Ray、Shadowsocks 等）
2. 代理工具正在运行，并且已开启 HTTP/HTTPS 或 SOCKS5 代理

通常代理工具会在本地开启一个端口，常见的端口号为：

- **Clash**：7890（HTTP）/ 7891（SOCKS5）
- **V2Ray**：10809（HTTP）/ 10808（SOCKS5）

请根据你实际使用的代理工具确认端口号。

## 配置 HTTP/HTTPS 代理

这是最常用的方式，适用于大多数代理工具。

### 全局配置（所有 Git 操作都走代理）

```bash
# 设置 HTTP 代理
git config --global http.proxy http://127.0.0.1:7890

# 设置 HTTPS 代理
git config --global https.proxy http://127.0.0.1:7890
```

其中 `127.0.0.1` 是本机地址，`7890` 是代理端口，请根据实际情况修改。

### 仅对 GitHub 走代理

如果你不想所有 Git 操作都走代理，可以只对 GitHub 生效：

```bash
# 仅对 GitHub 的 HTTP 请求走代理
git config --global http.https://github.com.proxy http://127.0.0.1:7890
```

这样配置后，只有访问 `github.com` 时才会走代理，其他 Git 操作（如访问 GitLab）不受影响。

## 配置 SOCKS5 代理

如果你的代理工具提供的是 SOCKS5 代理，配置方式如下：

```bash
# 设置 SOCKS5 代理
git config --global http.proxy socks5://127.0.0.1:7891
git config --global https.proxy socks5://127.0.0.1:7891
```

同样，也可以仅对 GitHub 生效：

```bash
git config --global http.https://github.com.proxy socks5://127.0.0.1:7891
```

> **提示**：某些版本的 Git 可能不支持 `socks5://` 协议。如果遇到问题，可以尝试使用 `socks5h://`（让 DNS 也通过代理解析）：
>
> ```bash
> git config --global http.proxy socks5h://127.0.0.1:7891
> ```

## 验证配置

配置完成后，可以通过以下方式验证是否生效：

```bash
# 查看当前所有 Git 全局配置
git config --global --list

# 测试克隆一个 GitHub 仓库
git clone https://github.com/octocat/Hello-World.git
```

如果能正常克隆，说明代理配置成功。

## 取消代理

当你切换到不需要代理的网络环境时（比如公司内网直连 GitHub），之前的代理配置会导致 Git 连接失败。这时需要取消代理。

### 删除代理配置

```bash
# 删除 HTTP 代理
git config --global --unset http.proxy

# 删除 HTTPS 代理
git config --global --unset https.proxy

# 删除 GitHub 专属代理
git config --global --unset http.https://github.com.proxy
```

### 临时禁用代理（推荐）

如果你只是偶尔不需要代理，可以用环境变量临时覆盖：

```bash
# 在当前终端临时禁用代理
git -c http.proxy= -c https.proxy= clone https://github.com/user/repo.git
```

或者通过设置空环境变量：

```bash
export http_proxy=""
export https_proxy=""
git clone https://github.com/user/repo.git
```

这种方式不会修改 Git 配置，关闭终端后自动恢复。

## 常见问题

### 为什么配置了代理还是连不上？

- 检查代理工具是否正在运行
- 确认端口号是否正确
- 尝试在浏览器中通过代理访问 GitHub，确认代理本身可用

### 克隆速度还是很慢？

- 尝试使用 `socks5h://` 代替 `socks5://`，让 DNS 解析也走代理
- 检查代理节点是否稳定，尝试切换节点

### 不想用全局代理怎么办？

使用 `http.https://github.com.proxy` 配置只对 GitHub 生效，或者在克隆时临时指定代理：

```bash
git -c http.proxy=http://127.0.0.1:7890 clone https://github.com/user/repo.git
```
