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
- 待办清单写成 `- ☐ 内容`，**不要用** `- [ ]`（会生成无标签复选框，影响无障碍评分）。
- 不写任何个人隐私（姓名、邮箱、住址、电话等用户信息）。公开机构信息（如警察署电话）可以写。

#### 内容范围（长期有效）

本站面向以 PSA 评级卡和二手卡为主的实体店，内容只覆盖：

- 宝可梦卡牌作为**收藏品**（卡面识别、系列与弹、稀有度、日英版、成色）
- **PSA 及其他评级卡**（等级、Pop、认证号、送评、价差）
- **行情与价格**（查价、定价、发售周期、库存周转）
- **开店实务**（法规、进货与收购、陈列、宣传、运营）

**不要写、不要列举**：对战玩法、卡组构筑、赛事/大会/ジム战、环境（meta）、游戏规则与规则讲解视频。推荐、新闻、术语表、基础知识都遵守同一范围。提及玩家客人时最多一行带过，不要展开怎么打。规则标记（レギュレーションマーク）只作为识别和辅助判断卡时期的记号，并强调它不是稀有度，不要讲解标准赛能否使用。

#### 新弹 / 新卡包新闻（详细研究）

每日更新里如果出现新弹或新卡包（拡張パック、高档包、子集包、特典套装等），不要只写发售日和定价，要做一篇**详细研究**，至少包括：

1. **这弹是什么**：官方名称、系列、发售日、包装规格（一包几张、希望零售价、箱规如有官方或正规店依据再写）。
2. **追捧卡（chase）**：已知的高稀有或高关注卡及稀有度（SAR、UR、MUR 等），附官网或可靠来源。
3. **同类对比**：和过去同类型产品比（例如更早的高档包、子集包、同年周年包），说明规格、追捧卡结构或市场定位上的异同。
4. **价格情况**：希望零售价（MSRP）；盒子/盒子转售价、单包价；追捧卡单卡价（优先 [SNKRDUNK](https://snkrdunk.com/)、[PriceCharting](https://www.pricecharting.com/category/pokemon-cards) 等，写明查询日期）。全部带来源链接和日期。**没有查到就写「暂无可靠公开成交，不编造」**，绝不编造价格。
5. **对评级卡和进货的影响**：这弹的哪些卡送评后可能有收藏需求、店里要不要备新包或相关旧卡、对已有 PSA 库存询价可能有什么连带影响。

固定内容套装（構築済みデッキ等）按「商品」写：定价、收录角色/附件、收藏与转售意义，不要讲怎么组卡、怎么打。

#### 导师点评（新闻和推荐必须有）

每条新闻、每条视频或播客推荐，都必须写「导师点评」（字段名 `comment`）。布局会把它渲染成单独的点评框，并标明「个人判断，与上方事实分开」。点评至少覆盖三点：

1. **可信度和重要性**：来源是不是一手、对开店有多要紧。
2. **对西新宿、主卖 PSA 评级卡的店意味着什么**：从进货、定价、库存、客人询问、风险里，点出真正相关的几项。
3. **下一步**：我会怎么做，或继续观察什么。

写法要求：事实只写在新闻的 `summary` 或推荐的 `note` 里；点评里可以给判断和建议，但不要冒充新的事实或价格。没有依据就写「现在还看不出」「不要提前下结论」。新闻的 `comment` 写在每日更新该条新闻下；视频/播客的 `comment` 写在 `_data/recommendations.yml` 对应条目（每日更新页会自动带出）。工具、网站、账号也建议写点评，说明怎么用、别踩什么坑。

#### 英文名（商品、卡、宝可梦名必须有）

正文、新闻、推荐、术语表里，凡是出现**商品、弹/卡包、卡片或宝可梦的日文名**，都要在后面补英文，格式如「スペシャルデッキセットMEGA」（暂译：Special Deck Set MEGA）、メガゲンガー ex（Mega Gengar ex）。

- 有官方英文名（宝可梦名、已公布的英文商品/套装名、英文卡名）就用官方名，不要自己改译。
- 日文商品还没有官方英文版时，用直译，并标明「暂译」，同时写清「官方英文商品名尚未公布」。不要把媒体或论坛的叫法写成官方名。
- 术语表用「日文 | 英文 | 中文 | 说明」对照。

#### 配图（每日更新和基础知识都要有说明性图片）

**每一篇每日更新、每一篇基础知识文章，都要有多张说明性图片**，帮助读者把名字和实物对上，不要只堆文字。新闻或推荐只要涉及新商品、新弹或具体卡片，有官方图就配上。

做法：

- 优先用 [宝可梦卡牌官网](https://www.pokemon-card.com/) 或 Pokémon / PSA 等官方站点的商品图、卡图、讲解图。
- **下载到仓库** `assets/img/`，压缩为合适宽度（商品图约 600px，单卡约 400px）的 webp 或 jpg，**不要热链到外站**。
- 每张图必须有有意义的 `alt`、`width` / `height`、`loading="lazy"`，以及注明来源并链接到原页的图注，例如「图片来源：[ポケモンカードゲーム公式](https://www.pokemon-card.com/)」。
- 用 `{% include figure.html %}` 插入。新闻和推荐可用字段 `image`、`image_alt`、`image_width`、`image_height`、`image_credit`、`image_credit_url`，以及可选的 `images` 列表；英文名用 `en`。
- 概念说明（卡面位置、壳上标签字段、Pop 读法、开店步骤、日英卡背区别等）可以画 **SVG 示意图**，并写明这是示意图、不是实物照片。
- **严禁伪造卡图或壳标**。没有可靠来源就不要用图，宁可只用示意图或写「暂无合适官方图」。
- 控制体积：懒加载、合理尺寸、一页不要塞进未压缩原图，以免影响手机加载和 Lighthouse。

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
    summary: <2〜3 句事实，写清对开店的意义>
    source: <来源名>
    url: <来源链接>
    tags: [新商品]
    comment: |                # 导师点评（个人判断），必填
      <可信度与重要性。对西新宿 PSA 店的进货/定价/库存/客人/风险意味着什么。下一步做什么或观察什么。>
    en: <官方英文名，或「暂译：…」>
    image: /assets/img/<file>.webp
    image_alt: <说明性 alt，含中英名称>
    image_width: 600
    image_height: 371
    image_credit: ポケモンカードゲーム公式
    image_credit_url: https://www.pokemon-card.com/...
    images:                   # 可选，多张配图（如主打卡）
      - { src: /assets/img/<card>.webp, alt: "...", width: 400, height: 559, credit: ポケモンカードゲーム公式, credit_url: https://www.pokemon-card.com/... }
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
- ☐ ...
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
  note: <为什么值得看，1〜2 句事实>
  comment: |                  # 导师点评（个人判断）；视频/播客必填，其他类型建议写
    <可信度与重要性。对西新宿 PSA 店意味着什么。下一步怎么用或观察什么。>
  en: <如涉及具体商品，写英文名或暂译>
  image: /assets/img/<file>.webp   # 新商品/新卡的推荐应配图
  image_alt: <说明性 alt>
  image_width: 600
  image_height: 371
  image_credit: ポケモンカードゲーム公式
  image_credit_url: https://www.pokemon-card.com/...
  tags: [开箱, 日语]
  added: YYYY-MM-DD
```

推荐页按类型自动分组；当天的每日更新在 `recs` 里写 id 即可显示（含该条的导师点评）。

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
