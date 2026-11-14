# 宝可梦卡牌店实战课

面向零基础、准备在东京高田马场（高田馬場 / Takadanobaba）开实体宝可梦卡牌店的新手（中文，附日文术语）。以 PSA 评级卡为主。网站按「先看今天更新了什么、下一步该做什么」来组织。

- 网站：https://mikegalaxynova-pixel.github.io/pokemon-card-shop-course/
- 技术：GitHub Pages 原生 Jekyll，自写轻量布局（无外部主题、无网页字体、仅搜索页和类型筛选加载少量 JS），无需本地构建，推送即发布。
- 怎么加内容：见 [CONTRIBUTING.md](CONTRIBUTING.md)
- 迭代计划：见 [ROADMAP.md](ROADMAP.md)

## 怎么用（信息架构）

主导航只有六项，面向忙、且刚开始准备开店的人，优先适配手机：

| 导航 | 路径 | 作用 |
| --- | --- | --- |
| 今日 | `/` | 单屏：今日新增（按 新闻 / 店铺案例 / 视频 分组）+ 本周重点 / 下一步行动 + 收支平衡计算器入口 |
| 新闻 | `/news/` | 带类型筛选的新闻归档。期次列表在 `/daily/`，单期在 `/daily/YYYY-MM-DD/` |
| 店铺案例 | `/shops/` | 一家店一篇文章，例如 `/shops/cardrush/` |
| 视频 | `/videos/` | 按日期更新的视频推荐，例如 `/videos/30th-futuristic/` |
| 基础知识 | `/kb/` | 可反复查阅的参考；「建议优先」在 `/kb/#path`（旧 `/path/` 会跳转到这里） |
| 工具 | `/tools/` | 收支平衡路线图、术语表、搜索、更新日志、查价工具入口 |

页脚还保留：收支平衡路线图 `/breakeven/`、术语表 `/glossary/`、搜索 `/search/`、更新日志 `/changelog/`、RSS。

每页开头都有「先看这里」：一句话结论 + 你该做什么，然后再展开细节。

## 仓库结构

| 路径 | 作用 |
| --- | --- |
| `_posts/YYYY-MM-DD-daily.md` | 新闻期次。front matter：`tldr`、`news`（含 `type` / 可选 `topic` / `prev`）、可选 `shop` 与 `videos` 短链、`next_kb`、`breakeven` |
| `_shops/<slug>.md` | 店铺案例正文，发布为 `/shops/<slug>/` |
| `_videos/<slug>.md` | 视频推荐正文，发布为 `/videos/<slug>/` |
| `_kb/<分区>/<slug>.md` | 基础知识文章 |
| `_data/kb.yml` | 基础知识目录 +「建议优先」的唯一数据源 |
| `_data/news_types.yml` | 新闻类型固定集合 |
| `_data/shops.yml` | 已写过的店铺，避免重复 |
| `_data/recommendations.yml` | 查价工具、网站、账号（视频已改到 `_videos`） |
| `_data/changelog.yml` | 更新日志；首页「今日新增」读最上面一条，`kind` 用 `news` / `shops` / `videos` / `kb` / `tools` |
| `_data/nav.yml` | 主导航 |
| `breakeven.html` | 收支平衡路线图与计算器（输入均为假设） |
| `tools.html` | 工具入口 |
| `glossary.md` | 术语表 |
| `_layouts/` `_includes/` | 布局、内联 CSS、NEW 徽标、类型筛选 |

内容为学习整理，不构成法律或投资建议；法规与价格以官方和主管机关最新信息为准。
