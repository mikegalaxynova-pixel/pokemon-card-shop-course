---
title: 认证号核验与假壳识别
section: psa
topics: [PSA/评级]
rating: 5
rating_reason: 假壳识别是高额交易的底线，不能省。
images:
  - src: /assets/img/psa-slab-photo-wagner.webp
    alt: "真实 PSA 评级壳照片：1909 年 T206 Honus Wagner 棒球卡，顶部红框标签写着 T206 SWEET CAPORAL HONUS WAGNER、等级 EX 5(MC) 和认证编号 15385994，下方是封装的卡片"
    width: 448
    height: 744
    credit: "Wikimedia Commons（公有领域）"
    credit_url: https://commons.wikimedia.org/wiki/File:1909_T206_Honus_Wagner_Baseball_Card_with_PSA_grade_EX_5-MC.jpg
  - src: /assets/img/psa-label-photo-wagner.webp
    alt: "同一张照片中 PSA 标签的放大裁切：左侧两行为卡片系列和人物名，左下为条码，右侧为等级 EX 5(MC)，右下为认证编号 15385994"
    width: 582
    height: 180
    credit: "Wikimedia Commons（公有领域），本站裁切放大"
    credit_url: https://commons.wikimedia.org/wiki/File:1909_T206_Honus_Wagner_Baseball_Card_with_PSA_grade_EX_5-MC.jpg
  - src: /assets/img/cert-check-flow.svg
    alt: "认证号核验四步示意图：一读号码，二到 PSA 官网或官方 App 查询，三逐项对照卡名、年份系列、编号、等级和官方图片，四再检查壳和标签本身；底部引用 PSA 官方提醒：证明番号的确认不能排除伪造风险"
    width: 600
    height: 300
    credit: "本站示意图（依据 PSA 官方说明）"
    credit_url: https://www.psacard.com/ja-JP/cert
  - src: /assets/img/fake-slab-checkpoints.svg
    alt: "PSA 评级壳六个检查点示意图：一标签内容与官网一致；二对强光看标签是否能透出背面文字；三倾斜看 Lighthouse 全息标；四背面 QR 码用官方 App 扫描；五壳边缘有没有白雾、裂纹、缝隙或胶痕；六壳体坚硬不晃、按边缘不会响或弹开"
    width: 600
    height: 436
    credit: "本站示意图（依据 PSA Security: A Buyer's Guide 与 2017 年标签说明）"
    credit_url: https://www.psacard.com/services/psasecurityabuyersguide
date: 2026-11-14
last_updated: 2026-11-15
description: 认证编号（証明番号 / cert number）在哪、怎样在官网逐项核对，为什么「查得到」还不够，以及评级壳和标签的六个检查点、店里的入库与收购规矩。
tags: [PSA, 认证号, 防伪, 收购, 入库]
tldr: |
  **结论**：假壳和假标存在。核验认证号、比对壳和标签，是进货底线。
  **你该做什么**：每张准备上架的 PSA 都先在官网查认证号，对不上的先隔离。

---

> 本篇按 PSA 官方说明整理：[証明番号確認](https://www.psacard.com/ja-JP/cert)、[PSA Security: A Buyer's Guide](https://www.psacard.com/services/psasecurityabuyersguide)、[2017 年新标签说明](https://www.psacard.com/articles/articleview/9234/psa-labels-get-new-look-new-technology)。阅读约 15 分钟。法律部分以主管机关最新说明为准。

## 为什么这一篇对 PSA 店最要紧

如果店里的主力商品是整批到手的 PSA 评级卡，以后还可能做收购（買取）。对这种店来说，**认证号核验是每张卡入库前的第一道门**：

- 等级、Pop、价格都是建立在「这个壳是真的、里面就是这张卡」上的；
- 年轻客人自己也会当场扫码查，你查过、查得清，客人才信你；
- 一旦卖出假壳，赔的不只是这张卡的钱，还有店的口碑，甚至可能涉及法律问题（见下文「收购时的法律义务」）。

## 认证编号在哪里

PSA 每个评级壳都有一个唯一的**认证编号**（日文官方叫「証明番号」，英文 certification number，常简称 cert）。下面是一张真实的 PSA 评级壳照片（棒球卡，非宝可梦卡，用来认识标签结构）：

<div class="fig-pair">
{% include figure.html src="/assets/img/psa-slab-photo-wagner.webp" alt="真实 PSA 评级壳照片：1909 年 T206 Honus Wagner 棒球卡，顶部红框标签写着 T206 SWEET CAPORAL HONUS WAGNER、等级 EX 5(MC) 和认证编号 15385994，下方是封装的卡片" width="448" height="744" caption="实拍：PSA 评级壳整体（棒球卡示例）。" credit="Wikimedia Commons（公有领域）" credit_url="https://commons.wikimedia.org/wiki/File:1909_T206_Honus_Wagner_Baseball_Card_with_PSA_grade_EX_5-MC.jpg" %}
{% include figure.html src="/assets/img/psa-label-photo-wagner.webp" alt="同一张照片中 PSA 标签的放大裁切：左侧两行为卡片系列和人物名，左下为条码，右侧为等级 EX 5(MC)，右下为认证编号 15385994" width="582" height="180" caption="放大标签：左上是系列和卡名，右侧是等级，右下的 8 位数字就是认证编号，左下是条码。" credit="Wikimedia Commons（公有领域），本站裁切放大" credit_url="https://commons.wikimedia.org/wiki/File:1909_T206_Honus_Wagner_Baseball_Card_with_PSA_grade_EX_5-MC.jpg" %}
</div>

读标签时注意三件事：

1. **认证编号**：通常在标签右下，是一串数字；条码里存的也是它。
2. **等级旁边的括号**：照片里的「5(MC)」带了限定符（qualifier）。MC 是 miscut（裁切偏差）的缩写，PSA 用 OC、ST、MC 等限定符标注特定缺陷（见官方 [Grading Standards](https://www.psacard.com/gradingstandards)）；同等级带限定符的卡，市场价通常低于不带的。宝可梦卡也会出现，**入库时要单独记一栏**。
3. **标签样式会随年代变化**：上面这张是较早样式的标签；2017 年起 PSA 改用带 Lighthouse 全息标、背面 QR 码的新标签（见下文）。店里那批卡封壳年份不同，标签长得不一样很正常，不要因为「和别的壳不一样」就下结论。

宝可梦卡的标签字段示意见[PSA 是什么]({{ '/kb/psa/what-is-psa/' | relative_url }})里的示意图。

## 四步核验

{% include figure.html src="/assets/img/cert-check-flow.svg" alt="认证号核验四步示意图：一读号码，二到 PSA 官网或官方 App 查询，三逐项对照卡名、年份系列、编号、等级和官方图片，四再检查壳和标签本身；底部引用 PSA 官方提醒：证明番号的确认不能排除伪造风险" width="600" height="300" credit="本站示意图（依据 PSA 官方说明）" credit_url="https://www.psacard.com/ja-JP/cert" %}

1. **读号码**：从标签正面抄下认证编号；新标签背面还有 QR 码。
2. **自己去官方查**：打开 [PSA 証明番号確認](https://www.psacard.com/ja-JP/cert)（英文 [Cert Verification](https://www.psacard.com/Cert)）或 PSA 官方 App。**不要点卖家发来的链接或二维码截图**，假网页也可以做得很像。
3. **逐项对照**（下表）：差一个字都要停下来。
4. **再看壳和标签**：号码对上了，也要做下一节的六个检查。

| 对照项 | 怎么看 | 常见问题 |
| --- | --- | --- |
| 卡名 / 宝可梦名 | 标签与官网记录一致，也与壳里的卡一致 | 壳里换成了同名但更便宜的版本 |
| 年份 / 系列 / 编号 | 如 2025 年某弹、编号 092/063 | 同一宝可梦的 SAR 与 MUR、日版与英版混淆 |
| 等级与限定符 | GEM MT 10、MINT 9、5(MC) 等 | 记录是 9，标签被改成 10 |
| 官方图片（如有） | PSA 对部分卡保存了扫描图 | 卡的居中、印刷位置和图片不一致 |
| 认证号本身 | 标签、条码、QR 三处一致 | QR 扫出来跳到别的号码或非官方网页 |

PSA 日本官网在查询页上写得很明白：**「証明番号の確認は偽造リスクを排除するものではありません」**——查询只显示数据库记录，不保证你手上这个壳是真的。

> **个人判断**：认证号是公开可查的，所以「把真实号码印在假标签上」在逻辑上很容易做到。查询这一步能挡住随手编的假号码，挡不住复制号码的假壳，所以才需要第 4 步。

## 评级壳和标签：六个检查点

{% include figure.html src="/assets/img/fake-slab-checkpoints.svg" alt="PSA 评级壳六个检查点示意图：一标签内容与官网一致；二对强光看标签是否能透出背面文字；三倾斜看 Lighthouse 全息标；四背面 QR 码用官方 App 扫描；五壳边缘有没有白雾、裂纹、缝隙或胶痕；六壳体坚硬不晃、按边缘不会响或弹开" width="600" height="436" credit="本站示意图（依据 PSA Security: A Buyer's Guide 与 2017 年标签说明）" credit_url="https://www.psacard.com/services/psasecurityabuyersguide" %}

以下事实来自 PSA 官方《[PSA Security: A Buyer's Guide](https://www.psacard.com/services/psasecurityabuyersguide)》和《[PSA Labels Get New Look, New Technology](https://www.psacard.com/articles/articleview/9234/psa-labels-get-new-look-new-technology)》（2017-06-14）：

| # | 检查点 | 官方说明的要点 | 店里怎么做 |
| --- | --- | --- | --- |
| ① | 标签内容 | 见上一节对照表 | 每张都查，结果截图存档 |
| ② | 标签厚度 | 用强光近距离照，真标签能隐约看到另一面的字；在真标签上再贴一层假面，会厚到透不出光，有时还能看到下层原标签的局部 | 手机电筒从背面照正面 |
| ③ | Lighthouse 全息标 | 2017 年起的新标签使用 Lighthouse 全息标，左右倾斜时 PSA 标志会显出或隐去背景里的「NASDAQ: CLCT」字样 | 只适用于新标签；旧标签没有，不能据此判假 |
| ④ | 背面 QR 码 / 防伪墨 | 新标签背面有 QR 码，可用 PSA 的认证 App 扫描；正反面都有遇清洁化学品会溶解的「fugitive ink」；背面左下的 PSA 标志在紫外灯下会显出更多小标志 | 用官方 App 扫码；可备一支小紫外灯 |
| ⑤ | 壳边缘 | 壳是用超声波焊接（sonic weld）封合的「防篡改（tamper-evident）」结构，不是打不开；焊缝被破坏后边缘常出现白色雾状「frosting」，甚至细小裂纹 | 四边逐一斜着看；有白雾、缝隙、胶痕就不收 |
| ⑥ | 手感 | 焊好的壳非常坚硬、几乎不弯；焊缝被破坏的壳会重新变软，用指甲按边缘可能发出声响或弹开；有人会用胶水粘回 | 轻按四角感受，不要用力撬 |

> **注意**：官方说这些是「部分」明面上的防伪特征，还有不公开的隐藏特征。所以以上任何一项「通过」都不等于一定是真，任何一项「不通过」都足够让你先停下。

## 不只是假壳：假卡、改卡也在增加

PSA 官方的 [2025 Fraud Report（PDF）](https://downloads.ctfassets.net/l40e281thfxr/72ZJooe31lk9KGBklfQFOu/4a3bf368f91a364fad3ccc2eca077a17/PSA_Fraud-Report_2025.pdf) 统计的是**送到 PSA 后被拦下的假卡**（不是假壳），但对你判断风险很有用：

- 宝可梦是被伪造最多的类别，宝可梦假卡数量同比 **+125%**；
- 被伪造最多的主题前十里，宝可梦占了六个：リザードン（Charizard）、ピカチュウ（Pikachu）、ゲンガー（Gengar）、レックウザ（Rayquaza）、ブラッキー（Umbreon）、ミュウツー（Mewtwo）；
- 报告给收藏者的建议：买前用 PSA App 核对认证号；从信誉好的卖家买；**价格远低于市价要警惕**；仔细看印刷、字体、闪膜图案和卡纸；拿确认是真的同款做对比。

> **个人判断**：这几个角色恰好也是店里最好卖、最贵的那一类。越是热门角色的高分壳，越要把核验做成固定动作，而不是「看着没问题就上架」。

## 店里的规矩：入库、收购、出售

### 入库（手上那批库存，从现在就开始）

库存表在已有的「卡名、弹名、收藏编号、PSA 等级、认证编号」之外，再加四栏：

| 栏目 | 填法 |
| --- | --- |
| 限定符 | 无 / OC / ST / MC 等 |
| 标签样式 | 新（有 Lighthouse 全息标）/ 旧 |
| 核验日期与结果 | 「2026-11-14 官网一致」+ 截图文件名 |
| 壳况 | 无异常 / 边缘白雾 / 划痕 / 裂纹 |

有任何一项对不上的，单独装袋、贴「待确认」，**不上架、不报价**。

### 收购（買取）时

- **当着客人的面查**：用店里的设备打开官方查询页，客人也看得到，减少争执。
- **价格好得不正常要停**：这是 PSA 报告里明确列出的警告信号。
- **法律义务**：日本《古物営業法》第 15 条第 3 项规定，古物商在买入、交换或接受委托时，如果认为物品有「不正品の疑い」，**必须立即向警察申告**（[e-Gov 法令原文](https://laws.e-gov.go.jp/law/324AC0000000108)）。做法细节（怎么申告、留什么记录）以店址管辖警察署和警视厅的说明为准，详见[古物台账、本人确认与入货记录]({{ '/kb/shop/kobutsu-records/' | relative_url }})。
- **不要自己拆壳「验货」**：拆开就失去了 PSA 壳的价值，也破坏了证据。对高额卡有疑问，PSA 官方说可以联系他们安排审查（review）；卖家如果拒绝把交易建立在 PSA 确认之上，官方的原话是「你可能已经有答案了」。

### 出售时

- 价签上写清**认证编号**，方便客人自己查；
- 准备一句三语提示，贴在柜台：

| 中文 | 日文 | 英文 |
| --- | --- | --- |
| 所有 PSA 卡都可以当场扫码核对认证号 | 全ての PSA カードは、その場で証明番号を確認できます | You can verify the cert number of any PSA card right here |
| 欢迎用您自己的手机查询 | ご自身のスマートフォンでもご確認いただけます | Feel free to check it on your own phone |

## 今日练习（15 分钟）

- ☐ 从手上那批卡里挑 5 张，按「四步核验」走一遍，截图存档。
- ☐ 每张做一次六个检查点，记下标签是新样式还是旧样式。
- ☐ 把库存表加上「限定符、标签样式、核验日期与结果、壳况」四栏。
- ☐ 找出店里最贵的 3 张，在[推荐库]({{ '/recommendations/' | relative_url }})的查价工具里对一下：价格越高，核验越要仔细。

## 来源

- PSA Japan「[証明番号確認](https://www.psacard.com/ja-JP/cert)」（2026-11-14 查阅）
- PSA「[Certification Verification](https://www.psacard.com/Cert)」
- PSA「[PSA Security: A Buyer's Guide](https://www.psacard.com/services/psasecurityabuyersguide)」（2026-11-14 查阅）
- PSA「[PSA Labels Get New Look, New Technology](https://www.psacard.com/articles/articleview/9234/psa-labels-get-new-look-new-technology)」（2017-06-14）
- PSA「[2025 Fraud Report（PDF）](https://downloads.ctfassets.net/l40e281thfxr/72ZJooe31lk9KGBklfQFOu/4a3bf368f91a364fad3ccc2eca077a17/PSA_Fraud-Report_2025.pdf)」
- e-Gov 法令検索「[古物営業法](https://laws.e-gov.go.jp/law/324AC0000000108)」第 15 条第 3 项（2026-11-14 查阅）
- 照片：Wikimedia Commons「[1909 T206 Honus Wagner Baseball Card with PSA grade EX 5-MC](https://commons.wikimedia.org/wiki/File:1909_T206_Honus_Wagner_Baseball_Card_with_PSA_grade_EX_5-MC.jpg)」（公有领域）
