---
title: 用 Claude + Obsidian 搭建个人知识库：从零到可用
description: 我是怎么用 Karpathy 的 LLM Wiki 方法论，配合 Obsidian、Claude 和 Web Clipper，搭出一个能自我维护的个人知识库的。
published: 2026-06-20
tags:
  - AI
  - Obsidian
  - 知识管理
  - Claude
  - 入门
category: 技术
---

## 你有没有这种感觉

收藏夹里躺着几百篇文章，但真正用到的时候一篇都找不到。

笔记软件装了七八个，有的记在 Notion，有的记在微信收藏，有的干脆写在备忘录里，散得到处都是。

偶尔看到一篇好文章，激动地点了收藏，心想"以后一定看"。然后就没有然后了。

我也是一样的。直到最近，我用 Claude + Obsidian 搭了一套知识库，才算把这个毛病治好了。

---

## 先说说为什么传统笔记不靠谱

传统笔记软件本质上就是个文件夹。你往里面塞东西，它就帮你存着。标签？分类？全靠你自己维护。

问题是人天生就不擅长维护。标签打多了记不住，分类分着分着就乱了，最后整个库变成一个电子垃圾场。

更要命的是，笔记之间是孤立的。你写了一篇关于"提示词工程"的笔记，又写了一篇关于"Agent"的笔记，但这两者之间的关系没人帮你整理。下次你想起"那个和 Agent 有关的概念叫什么来着"，翻半天也翻不出来。

RAG 系统（就是 ChatGPT 上传文件那种）也好不到哪去。它每次回答问题都是从头开始检索，没有积累。你问它第五遍同样的问题，它还是要重新去翻那些文件。

---

## Karpathy 提出了一个更好的思路

Andrej Karpathy（前 Tesla AI 总监、OpenAI 创始成员）最近发了一篇文章，叫 LLM Wiki。核心思路很简单：

**让 AI 不只是检索文档，而是帮你维护一个持续更新的知识库。**

什么意思呢？你丢一篇文章给 AI，它不是索引一下等着你问。它会读完之后，把关键信息提取出来，更新到你的知识库里——改已有的页面、加新的关联、标注和之前资料有冲突的地方。

知识库是个活东西，每加一篇新资料就更丰富一点。你问它问题的时候不用从头检索，因为交叉引用早就做好了。

Karpathy 自己打了个比方：

> Obsidian 是 IDE，LLM 是程序员，知识库是代码库。

你找资料、提问题、做决策，AI 干苦力活——总结、归档、维护交叉引用。

---

## Karpathy 的 LLM Wiki 方法论（完整版）

下面这篇是 Andrej Karpathy 发布的 LLM Wiki 方法论原文，可以直接复制给你的 LLM Agent 使用。

```markdown title="LLM Wiki — copy this to your LLM Agent"
# LLM Wiki

A pattern for building personal knowledge bases using LLMs.

This is an idea file, it is designed to be copy pasted to your own LLM Agent (e.g. OpenAI Codex, Claude Code, OpenCode / Pi, or etc.). Its goal is to communicate the high level idea, but your agent will build out the specifics in collaboration with you.

## The core idea

Most people's experience with LLMs and documents looks like RAG: you upload a collection of files, the LLM retrieves relevant chunks at query time, and generates an answer. This works, but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation. Ask a subtle question that requires synthesizing five documents, and the LLM has to find and piece together the relevant fragments every time. Nothing is built up. NotebookLM, ChatGPT file uploads, and most RAG systems work this way.

The idea here is different. Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM doesn't just index it for later retrieval. It reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting where new data contradicts old claims, strengthening or challenging the evolving synthesis. The knowledge is compiled once and then _kept current_, not re-derived on every query.

This is the key difference: **the wiki is a persistent, compounding artifact.** The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read. The wiki keeps getting richer with every source you add and every question you ask.

You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it. You're in charge of sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, filing, and bookkeeping that makes a knowledge base actually useful over time. In practice, I have the LLM agent open on one side and Obsidian open on the other. The LLM makes edits based on our conversation, and I browse the results in real time — following links, checking the graph view, reading the updated pages. Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.

This can apply to a lot of different contexts. A few examples:

- **Personal**: tracking your own goals, health, psychology, self-improvement — filing journal entries, articles, podcast notes, and building up a structured picture of yourself over time.
- **Research**: going deep on a topic over weeks or months — reading papers, articles, reports, and incrementally building a comprehensive wiki with an evolving thesis.
- **Reading a book**: filing each chapter as you go, building out pages for characters, themes, plot threads, and how they connect. By the end you have a rich companion wiki. Think of fan wikis like Tolkien Gateway — thousands of interlinked pages covering characters, places, events, languages, built by a community of volunteers over years. You could build something like that personally as you read, with the LLM doing all the cross-referencing and maintenance.
- **Business/team**: an internal wiki maintained by LLMs, fed by Slack threads, meeting transcripts, project documents, customer calls. Possibly with humans in the loop reviewing updates. The wiki stays current because the LLM does the maintenance that no one on the team wants to do.
- **Competitive analysis, due diligence, trip planning, course notes, hobby deep-dives** — anything where you're accumulating knowledge over time and want it organized rather than scattered.

## Architecture

There are three layers:

**Raw sources** — your curated collection of source documents. Articles, papers, images, data files. These are immutable — the LLM reads from them but never modifies them. This is your source of truth.

**The wiki** — a directory of LLM-generated markdown files. Summaries, entity pages, concept pages, comparisons, an overview, a synthesis. The LLM owns this layer entirely. It creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it; the LLM writes it.

**The schema** — a document (e.g. CLAUDE.md for Claude Code or AGENTS.md for Codex) that tells the LLM how the wiki is structured, what the conventions are, and what workflows to follow when ingesting sources, answering questions, or maintaining the wiki. This is the key configuration file — it's what makes the LLM a disciplined wiki maintainer rather than a generic chatbot. You and the LLM co-evolve this over time as you figure out what works for your domain.

## Operations

**Ingest.** You drop a new source into the raw collection and tell the LLM to process it. An example flow: the LLM reads the source, discusses key takeaways with you, writes a summary page in the wiki, updates the index, updates relevant entity and concept pages across the wiki, and appends an entry to the log. A single source might touch 10-15 wiki pages. Personally I prefer to ingest sources one at a time and stay involved — I read the summaries, check the updates, and guide the LLM on what to emphasize. But you could also batch-ingest many sources at once with less supervision. It's up to you to develop the workflow that fits your style and document it in the schema for future sessions.

**Query.** You ask questions against the wiki. The LLM searches for relevant pages, reads them, and synthesizes an answer with citations. Answers can take different forms depending on the question — a markdown page, a comparison table, a slide deck (Marp), a chart (matplotlib), a canvas. The important insight: **good answers can be filed back into the wiki as new pages.** A comparison you asked for, an analysis, a connection you discovered — these are valuable and shouldn't disappear into chat history. This way your explorations compound in the knowledge base just like ingested sources do.

**Lint.** Periodically, ask the LLM to health-check the wiki. Look for: contradictions between pages, stale claims that newer sources have superseded, orphan pages with no inbound links, important concepts mentioned but lacking their own page, missing cross-references, data gaps that could be filled with a web search. The LLM is good at suggesting new questions to investigate and new sources to look for. This keeps the wiki healthy as it grows.

## Indexing and logging

Two special files help the LLM (and you) navigate the wiki as it grows. They serve different purposes:

**index.md** is content-oriented. It's a catalog of everything in the wiki — each page listed with a link, a one-line summary, and optionally metadata like date or source count. Organized by category (entities, concepts, sources, etc.). The LLM updates it on every ingest. When answering a query, the LLM reads the index first to find relevant pages, then drills into them. This works surprisingly well at moderate scale (~100 sources, ~hundreds of pages) and avoids the need for embedding-based RAG infrastructure.

**log.md** is chronological. It's an append-only record of what happened and when — ingests, queries, lint passes. A useful tip: if each entry starts with a consistent prefix (e.g. `## [2026-04-02] ingest | Article Title`), the log becomes parseable with simple unix tools — `grep "^## \[" log.md | tail -5` gives you the last 5 entries. The log gives you a timeline of the wiki's evolution and helps the LLM understand what's been done recently.

## Optional: CLI tools

At some point you may want to build small tools that help the LLM operate on the wiki more efficiently. A search engine over the wiki pages is the most obvious one — at small scale the index file is enough, but as the wiki grows you want proper search. qmd is a good option: it's a local search engine for markdown files with hybrid BM25/vector search and LLM re-ranking, all on-device. It has both a CLI (so the LLM can shell out to it) and an MCP server (so the LLM can use it as a native tool). You could also build something simpler yourself — the LLM can help you vibe-code a naive search script as the need arises.

## Tips and tricks

- Obsidian Web Clipper is a browser extension that converts web articles to markdown. Very useful for quickly getting sources into your raw collection.
- Download images locally. In Obsidian Settings → Files and links, set "Attachment folder path" to a fixed directory (e.g. raw/assets/). Then in Settings → Hotkeys, search for "Download" to find "Download attachments for current file" and bind it to a hotkey (e.g. Ctrl+Shift+D). After clipping an article, hit the hotkey and all images get downloaded to local disk. This is optional but useful — it lets the LLM view and reference images directly instead of relying on URLs that may break. Note that LLMs can't natively read markdown with inline images in one pass — the workaround is to have the LLM read the text first, then view some or all of the referenced images separately to gain additional context. It's a bit clunky but works well enough.
- Obsidian's graph view is the best way to see the shape of your wiki — what's connected to what, which pages are hubs, which are orphans.
- Marp is a markdown-based slide deck format. Obsidian has a plugin for it. Useful for generating presentations directly from wiki content.
- Dataview is an Obsidian plugin that runs queries over page frontmatter. If your LLM adds YAML frontmatter to wiki pages (tags, dates, source counts), Dataview can generate dynamic tables and lists.
- The wiki is just a git repo of markdown files. You get version history, branching, and collaboration for free.

## Why this works

The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Updating cross-references, keeping summaries current, noting when new data contradicts old claims, maintaining consistency across dozens of pages. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass. The wiki stays maintained because the cost of maintenance is near zero.

The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else.

The idea is related in spirit to Vannevar Bush's Memex (1945) — a personal, curated knowledge store with associative trails between documents. Bush's vision was closer to this than to what the web became: private, actively curated, with the connections between documents as valuable as the documents themselves. The part he couldn't solve was who does the maintenance. The LLM handles that.

## Note

This document is intentionally abstract. It describes the idea, not a specific implementation. The exact directory structure, the schema conventions, the page formats, the tooling — all of that will depend on your domain, your preferences, and your LLM of choice. Everything mentioned above is optional and modular — pick what's useful, ignore what isn't. For example: your sources might be text-only, so you don't need image handling at all. Your wiki might be small enough that the index file is all you need, no search engine required. You might not care about slide decks and just want markdown pages. You might want a completely different set of output formats. The right way to use this is to share it with your LLM agent and work together to instantiate a version that fits your needs. The document's only job is to communicate the pattern. Your LLM can figure out the rest.
```

---

## 我的工具栈

我用的工具不多，四个：

- **Obsidian**：知识库的载体，所有笔记都存在这里
- **Claude**：AI 大脑，负责理解和整理知识
- **Claudian 插件**：让 Claude 和 Obsidian 直接对话
- **Obsidian Web Clipper**：浏览器插件，一键把网页文章存到 Obsidian

选 Obsidian 是因为笔记就是本地 Markdown 文件，你对文件有完全的控制权。它的关系图谱功能也很直观，哪些知识点之间有关联，打开 Graph View 一眼就能看到。

选 Claude 是因为长文本处理能力强，推理能力也比大多数模型好。搭知识库要的是深度理解，不是简单的信息检索。

---

## 第一步：初始化知识库

装好 Obsidian 之后，先别急着往里面塞东西。你得先搭好骨架。

我用的是 Karpathy 推荐的方法：把 LLM Wiki 的方法论文档丢给 Claude，让它根据你的需求生成一套初始结构。

具体操作：

1. 打开 Claudian 插件，把 Karpathy 的 LLM Wiki 方法论文档发给 Claude
2. 告诉它你想建什么领域的知识库（技术、读书、生活管理都行）
3. 让它帮你设计目录结构和笔记模板

Claude 会帮你生成一套类似这样的结构：

```
知识库/
├── raw/              ← 原始资料（剪藏的文章、笔记）
├── wiki/             ← AI 维护的知识库
│   ├── index.md      ← 知识库目录
│   ├── log.md        ← 操作日志
│   ├── concepts/     ← 概念页
│   ├── entities/     ← 实体页（人物、工具、项目）
│   └── sources/      ← 资料摘要
└── schema.md         ← 知识库的"使用说明书"
```

这是我实际搭建出来的库结构：

![知识库结构](https://img.mistfly.xyz/file/blog/z5iSQneo.png)

`schema.md` 是关键。它相当于给 AI 写了一份工作手册，告诉它：笔记格式是什么、更新流程是什么、怎么处理冲突、怎么维护交叉引用。以后每次新对话，AI 读一下这个文件就知道该怎么干了。

---

## 第二步：往知识库里"喂"资料

骨架搭好了，接下来就是往里面填内容。我主要用两种方式：

### 方式一：Web Clipper 剪藏

装好 Obsidian Web Clipper 浏览器插件后，看到好文章，点一下就能把整篇转成 Markdown 存到你的 Obsidian 库里。

![Web Clipper 剪藏](https://img.mistfly.xyz/file/blog/vLSFyo3o.png)

这个插件会自动处理格式转换：标题、列表、代码块、图片链接，都能保留。存下来的文件默认放在 `raw/` 目录下，等着被 AI 处理。

一个小技巧：剪藏完之后按 Ctrl+Shift+D（需要在 Obsidian 里设置快捷键），可以把文章里的图片全部下载到本地。这样以后 AI 读文章的时候也能看图片，不用担心外链失效。

### 方式二：直接丢文件

PDF、Markdown、纯文本，直接拖进 `raw/` 文件夹就行。Claude 能处理几乎所有格式。

---

## 第三步：让 Claude "消化"资料

这是最核心的一步。你把资料丢进去了，但它们还只是一堆散乱的文件。你需要让 Claude 把它们整合进知识库。

在 Claudian 插件里告诉 Claude："处理一下 raw 目录里最新那篇文章"。

Claude 会做这些事：

1. 读完文章，理解核心内容
2. 写一篇摘要，存到 `wiki/sources/` 目录
3. 更新相关的概念页和实体页
4. 在知识库里添加交叉引用
5. 更新 `index.md` 目录和 `log.md` 日志
6. 和你讨论这篇文章的关键要点

一篇新文章可能会同时更新 10-15 个知识库页面。

这是我处理一篇文章时 Claude 的对话截图：

![Claudian 对话](https://img.mistfly.xyz/file/blog/wm6RN3TV.png)

你不需要一次处理很多文章。我习惯一篇一篇来，每篇处理完都看一眼 Claude 的更新，确认没跑偏。这个过程本身也是学习——你会发现 Claude 的理解有时候比你自己还深刻。

---

## 第四步：用起来

知识库搭好了、资料也喂进去了，关键是你要用它。

### 查询

直接在 Obsidian 里搜索就行。知识库已经被 Claude 整理得井井有条，关键词搜索效率很高。

你也可以直接问 Claude："关于 XX 概念，知识库里都有什么？"它会去读相关页面，给你一个综合性的回答。

### 看关系图谱

Obsidian 的 Graph View 能让你看到所有知识点之间的关联。哪些是核心概念，哪些是孤立页面，一眼就知道。

![关系图谱](https://img.mistfly.xyz/file/blog/bV1VBU1M.png)

某个概念和很多其他概念都有关联，说明它是你知识体系里的核心节点。反过来，如果某个页面没有任何链接指向它，那可能是你该补强的地方。

### 回答问题

积累到一定程度，你可以问 Claude 更复杂的问题。比如"根据知识库里的内容，总结一下我对 XX 领域的理解"，或者"对比一下 A 和 B 的区别"。

Claude 会去读知识库里的相关页面，综合所有信息给你答案。这比你每次从头翻笔记高效多了。

---

## 进阶玩法（点到为止）

基础流程跑通之后，可以试试这些：

- **定期 Lint**：让 Claude 帮你检查知识库有没有矛盾的页面、过时的信息、断掉的链接
- **Marp 幻灯片**：让 Claude 从知识库内容生成幻灯片，Obsidian 有插件支持
- **Dataview 查询**：给笔记加 frontmatter 元数据，用 Dataview 插件做动态查询

不用急着学。先跑通基础，觉得不够用了再探索。

---

## 我踩过的坑

### 别一次喂太多

一开始我贪心，一次丢了十篇文章让 Claude 处理。结果它处理到第五篇就开始乱了，前后矛盾。后来改成一篇一篇来，效果好很多。

### Schema 要不断迭代

你第一次写的 schema（知识库说明书）肯定不完美。用着用着你会发现某些规则不合理，某些格式不适合你的需求。这很正常，随时改就行。Claude 也会在使用过程中帮你优化。

### 别忘了人工把关

AI 做的总结和整理不是百分百准确的。偶尔它会误解文章的意思，或者把不相关的东西强行关联起来。所以每篇处理完都要过一眼，别无脑信任。

### 图片要本地化

刚才说了，外链会失效。养成习惯，剪藏文章后把图片下载到本地。不然过几个月你再打开笔记，图片全是裂的。

---

## 写在最后

搭这套知识库花了一个周末。但真正让我觉得值的，是之后每一天都在受益。

以前看到好文章就收藏，收藏完就忘了。现在看到好文章就剪藏，Claude 帮我消化整理，下次要用的时候直接能搜到，还是和其他知识交叉引用过的。

知识管理这件事，难的不是工具，是维护。AI 刚好擅长这件事，它不嫌烦、不忘事、不偷懒。

让它干它擅长的，你干你擅长的。
