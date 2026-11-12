# GitHub Skills 筛选与网站应用

核对时间：2026-11-12。GitHub Star 是仓库总数的当日快照，不能视为效果或转化保证。

## 筛选与安装

| 项目 | GitHub 热度快照 | 安装的 Skill | 本次用途 |
| --- | --- | --- | --- |
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 约 148.2k stars | `ui-ux-pro-max` | 企业可信度、图像展示、触摸与键盘交互、响应式检查 |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) | 约 113.6k stars | `design-taste-frontend` | 参考其摄影主导、统一边界和章节节奏的设计观点 |
| [UI Skills](https://github.com/ibelick/ui-skills) | 约 11.0k stars | `fixing-motion-performance` | 降低整屏动画的重绘和 JavaScript 滚动负担 |

通过官方 skill-installer 从上述仓库指定 Skill 目录安装到用户级 `C:/Users/77945/.codex/skills/`，未覆盖现有 Skill。原有 frontend-design、品牌规范和 Playwright 继续使用。新安装项后续对话可自动发现；本轮直接读取本地文件应用。

## 采用与适配

UI/UX Pro Max 初次 `industrial hardware corporate photography` 查询偏向黑白创意作品集，与龙驰品牌不符，未采用该配色。一次收窄为 `manufacturing industrial B2B`，返回 Trust & Authority + Conversion，采用其真实公司证据、清晰询盘路径、触摸目标和减少动态效果建议。继续使用已有 Manrope 与 LONGCHI 蓝黄系统；不套用默认字体、客户徽章或统计数字。

Taste Skill 已安装并审阅主文件、布局与动效参考。本轮作为视觉参考使用，没有引入它的整页模板、资源包或 finish-gate 工作流。其禁用轮播、浮动联系入口、真实联系方式、图片说明和强制整屏高度等默认规则与本项目已确认要求冲突；四张手动 Banner、右侧悬浮联系人、真实联系方式、Hunan/Shenzhen 事实说明和 20 个候选模块继续按用户要求保留。

## 设计方案

产品类型：工业照明、交通、停车和门禁设备企业推广站。

配色：品牌蓝 `#0028A0`、亮蓝 `#0070E8`、黄 `#F8B000`、深蓝 `#001A66`、雾蓝 `#F2F7FF`、白色。字体：已有本地 Manrope，标题通过字号、字距与行距建立层级。

章节由完整摄影与蓝色文字区承载，企业历程和生产现场提供两种不同浏览方式。保留其他候选模块，供后续筛选。

```text
Banner：整幅原始照片 + 左侧标题 / 四页手动选择
公司介绍：公司文字 | 真实厂区图 + 城市职责说明
历程档案：年份选项 + 大年份 + 简介 | 对应原始图片
工厂实景：大照片 | 对应说明和翻页 / 底部三个场景入口
```

动效用途：Banner 图片切换说明当前页变化；工厂与历程切换让照片与文字保持对应；工程与展会照片的原生 view timeline 提供轻微纵深；其他位置保持内容稳定。无自动轮播、粒子、闪烁、鼠标跟随装饰或全站飞入。

## 改动位置

- `components/company-experience.tsx`：2018/2023/2025 图文档案，装配/生产/照明检查实景切换，键盘方向键和 Home/End，保留原公司图库。
- `components/company-story.tsx`：保留模块导出名和主页模块数量，接入新的企业档案与工厂实景。
- `app/company-experience.css`：上述版块的桌面、平板和手机布局，Banner 排版与翻页反馈。
- `components/corporate-hero.tsx`、`app/motion.css`：使用 transform/opacity 进行大画面切换，删除鼠标驱动的 CSS 变量更新。
- 删除 `components/home-motion.tsx`：不再在 JS scroll 回调中反复测量照片。支持时用原生 view timeline；不支持或减少动态效果时显示完整静态照片。

照片沿用已归档来源：厂区图是现有资料中的照片，不标注为 2018 年拍摄；证书是湖南公司 2023 年历史文件，不声明深圳公司或当前有效资质；场景示意继续明确标注。

## 验证

TypeScript 检查、生产构建通过。真实浏览器通过：四张 Banner、企业档案三个年份、工厂三个场景与图库、320/390/768/820/1024/1440 响应式、键盘切换、减少动态效果、首页筛选模式。控制台 0 error / 0 warning。检查过程保存在本地 `outputs/skill-upgrade-browser.js`。

视觉复核发现档案证书原始文件为横向文档的竖置照片；通过 SVG 的显示变换校正阅读方向，原始图片文件保持不变。证书以完整比例展示，未生成、修改或补绘证书文字。
