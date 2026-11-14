# 宝可梦卡牌店实战课

面向零基础新手的宝可梦卡牌店开店课程网站（中文，附日文术语）。以 PSA 评级卡为主，覆盖卡牌入门、PSA 评级、日本开店实务、定价与市场、社群与宣传。每天 20:00（日本时间）更新。

- 网站：https://mikegalaxynova-pixel.github.io/pokemon-card-shop-course/
- 技术：GitHub Pages 原生 Jekyll，自写轻量布局（无外部主题、无网页字体、仅搜索页加载 JS），无需本地构建，推送即发布。
- 怎么加内容：见 [CONTRIBUTING.md](CONTRIBUTING.md)
- 迭代计划：见 [ROADMAP.md](ROADMAP.md)

## 目录结构

| 路径 | 作用 |
| --- | --- |
| `_posts/YYYY-MM-DD-daily.md` | 每日更新（一天一篇），新闻写在 front matter 的 `news`，推荐写 `recs` |
| `_kb/<分区>/<slug>.md` | 基础知识文章 |
| `_data/kb.yml` | 基础知识目录 + 学习路径（周次、状态、计划日期）的唯一数据源 |
| `_data/recommendations.yml` | 推荐库（视频 / 播客 / 账号 / 工具 / 网站） |
| `_data/changelog.yml` | 更新日志，首页「今日新增」读最上面一条 |
| `glossary.md` | 术语表 |
| `_layouts/` `_includes/` | 布局、样式（内联 CSS）、NEW 徽标逻辑 |

内容为学习整理，不构成法律或投资建议；法规与价格以官方和主管机关最新信息为准。
