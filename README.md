# 宝可梦卡牌店实战课

面向零基础、准备在东京高田马场（高田馬場 / Takadanobaba）开实体宝可梦卡牌店的新手课程网站（中文，附日文术语）。以 PSA 评级卡为主，每日更新新闻、视频推荐与店铺案例，并讨论怎样更快走到收支平衡。收购、买卖和店铺运营放在基础知识里，改为按需撰写。

- 网站：https://mikegalaxynova-pixel.github.io/pokemon-card-shop-course/
- 技术：GitHub Pages 原生 Jekyll，自写轻量布局（无外部主题、无网页字体、仅搜索页加载 JS），无需本地构建，推送即发布。
- 怎么加内容：见 [CONTRIBUTING.md](CONTRIBUTING.md)
- 迭代计划：见 [ROADMAP.md](ROADMAP.md)

## 目录结构

| 路径 | 作用 |
| --- | --- |
| `_posts/YYYY-MM-DD-daily.md` | 每日更新。front matter 含 `news`、`recs`、`shop_case`、`next_kb`、`breakeven` |
| `_kb/<分区>/<slug>.md` | 基础知识文章 |
| `_data/kb.yml` | 基础知识目录 + 学习路径（按需撰写、建议优先）的唯一数据源 |
| `_data/shops.yml` | 已拆解的店铺案例，避免重复 |
| `breakeven.html` | 收支平衡路线图与计算器（输入均为假设） |
| `_data/recommendations.yml` | 推荐库（视频 / 播客 / 账号 / 工具 / 网站） |
| `_data/changelog.yml` | 更新日志，首页「今日新增」读最上面一条 |
| `glossary.md` | 术语表 |
| `_layouts/` `_includes/` | 布局、样式（内联 CSS）、NEW 徽标逻辑 |

内容为学习整理，不构成法律或投资建议；法规与价格以官方和主管机关最新信息为准。
