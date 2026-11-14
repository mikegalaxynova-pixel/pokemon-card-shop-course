# 内容维护指南（每日自动更新照此执行）

所有内容都是 Markdown / YAML，推送到 `main` 后 GitHub Pages 自动构建，约 1〜2 分钟上线。**不需要本地构建。** 全站中文，日文术语用括号标注（例：古物商许可（古物商許可））。

## 0. 每日更新清单（每天 20:00 JST）

每次运行按顺序做完下面 6 步，然后**一次提交、一次推送**：

1. 新建当天的每日更新 `_posts/YYYY-MM-DD-daily.md`（第 1 节）。
2. 按学习路径新增 1 篇基础知识，或加深 1 篇已有文章（第 2 节）。
3. 更新 `_data/kb.yml` 中对应文章的 `status`（第 3 节）。
4. 把当天推荐的视频/播客/账号/工具追加到 `_data/recommendations.yml`（第 4 节）。
5. 在 `_data/changelog.yml` **最上面**加一条当天记录（第 5 节）。
6. 如有新术语，追加到 `glossary.md` 对应表格，并把它的 `last_updated` 改成今天。

提交信息格式：`daily: YYYY-MM-DD 第N期 + <新增/更新的文章标题>`。

推送后检查：`gh api repos/mikegalaxynova-pixel/pokemon-card-shop-course/pages/builds/latest --jq .status` 为 `built`，并用 curl 确认当天页面返回 200。

### 内容规则

- **只写查证过的事实**：新闻、价格、日期、法规都要有来源链接；不确定的写明「以官方为准」。不编造价格、链接或视频。
- 视频推荐必须是真实存在、打开过的链接。
- 不写任何个人隐私（姓名、邮箱、住址、电话等用户信息）。公开机构信息（如警察署电话）可以写。

## 1. 新增每日更新

文件：`_posts/YYYY-MM-DD-daily.md`（文件名日期 = 当天日本日期）。

```yaml
---
title: 每日更新 第 N 期：<一句话主题>
issue: N                      # 期号，上一期 +1
date: YYYY-MM-DD 20:00:00 +0900
last_updated: YYYY-MM-DD      # 新建时 = 当天；以后修改这篇时改成修改日
summary: <一两句摘要，首页卡片显示>
tags: [第X周, ...]
news:                         # 今日新闻（新闻归档页自动汇总这里）
  - title: <标题>
    summary: <2〜3 句，写清对开店的意义>
    source: <来源名>
    url: <来源链接>
    tags: [新商品]
recs: [<recommendations.yml 里的 id>, ...]   # 视频/播客推荐，至少 1 个
---

## 市场动态
（价格波动、抽选、渠道、PSA 相关，附来源）

## 今日小课
（指向今天新增/更新的基础知识文章，2〜4 句导读 + 链接，链接写法：{{ '/kb/<分区>/<slug>/' | relative_url }}）
明天预告：<下一篇计划文章>

## 行动建议
**思考题**：...
**今日行动（30〜60 分钟）**
- [ ] ...
```

「今日新闻」和「视频 / 播客推荐」由布局根据 `news` 和 `recs` 自动渲染，正文**不要**再写这两节。

## 2. 新增 / 加深基础知识文章

### 新增
1. 在 `_data/kb.yml` 里找到学习路径中**下一篇** `status: planned` 的文章（按 `planned` 日期顺序）。
2. 新建 `_kb/<分区 id>/<slug>.md`，分区 id 和 slug 必须与 `kb.yml` 一致（网址即 `/kb/<分区>/<slug>/`）：

```yaml
---
title: <与 kb.yml 中 title 一致或更完整>
section: <分区 id，如 psa>
date: YYYY-MM-DD           # 首发日，之后不再改
last_updated: YYYY-MM-DD   # 首发时 = date
description: <一句话摘要，用于 SEO 和列表>
tags: [...]
---
```

3. 正文用 `##` 分节，多用表格和清单，结尾附「来源」小节。站内链接一律写 `{{ '/kb/…/' | relative_url }}`。

### 加深已有文章
直接编辑正文，**把 `last_updated` 改成今天**（`date` 不动）。页面和列表会自动显示「更新」徽标。

## 3. 更新学习路径状态

`_data/kb.yml` 是基础知识目录和学习路径页的唯一数据源。

- 文章发布：把该条 `status: planned` 改成 `status: published`（可删除 `planned` 日期）。**published 的条目必须已有对应的 `_kb` 文件。**
- 计划调整：改 `planned: YYYY-MM-DD` 或 `week`。
- 新增计划文章：在对应分区 `articles` 下加 `- { slug: xxx, title: "…", week: N, status: planned, planned: YYYY-MM-DD }`。
- 新分区：在 `sections` 下加 `id`、`title`、`desc`、`articles`。

首页的分区卡片、基础知识目录、学习路径页、文章底部「其他文章」都会自动更新。

## 4. 新增推荐（视频 / 播客 / 账号 / 工具）

在 `_data/recommendations.yml` **最上面**追加：

```yaml
- id: yt-<简短英文id>          # 唯一，每日更新的 recs 用它引用
  type: video                   # video | podcast | account | tool | site | community
  title: 『<原标题>』
  creator: <创作者>
  url: <链接>
  note: <为什么值得看，1〜2 句>
  tags: [开箱, 日语]
  added: YYYY-MM-DD
```

推荐页按类型自动分组；当天的每日更新在 `recs` 里写 id 即可显示。

## 5. 更新日志与 NEW 徽标

在 `_data/changelog.yml` **最上面**加一条：

```yaml
- date: YYYY-MM-DD
  title: 第 N 期 · <主题>
  items:
    - { kind: daily, type: new, title: "每日更新 第 N 期（M/D）", url: /daily/YYYY-MM-DD/ }
    - { kind: kb, type: new, title: "<新文章>", url: /kb/<分区>/<slug>/ }
    - { kind: kb, type: updated, title: "<加深的文章>", url: /kb/<分区>/<slug>/ }
    - { kind: recs, type: new, title: "推荐：<名称>", url: /recommendations/ }
    - { kind: news, type: new, title: "新闻归档：M/D N 条", url: /news/ }
```

- `kind` 取值与导航 id 一致：`daily` `kb` `path` `recs` `news` `glossary`；导航上对应栏目会出现红点。
- `type`：`new`（新增）或 `updated`（更新）。
- 首页「今日新增」显示最上面一条，`/changelog/` 显示全部历史。

**徽标规则（自动）**：构建时间往前 2 天内（`_config.yml` 的 `new_badge_days`），`date` 在范围内显示 **NEW**，否则 `last_updated` 在范围内显示 **更新**。因为每天推送都会重新构建，旧徽标会自动消失。读者打开过的页面，徽标变灰（浏览器 localStorage，不影响布局）。

## 6. 新闻归档

不用单独维护：新闻写在每日更新的 `news` 里，`/news/` 自动按日期汇总。
