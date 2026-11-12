# 网站交接与维护

## 已建设范围

- 英文首页，四条并列产品线：智慧照明、智慧交通、智慧停车、智慧门禁。
- 4 个类目方案页、4 个 SEM 落地页、7 个有来源依据的型号页、产品筛选、资源下载、公司介绍、联系与隐私页面。
- 持久化询盘、字段校验、联系许可、广告来源同意控制、重复提交去重、速率限制。
- 密码保护的询盘后台：`/admin/leads/`，支持阶段管理、分页与 CSV 导出。
- 独立页面标题、canonical、结构化产品信息、真实 robots.txt 与 sitemap.xml。

## 更新内容

公司首页候选版以 `docs/COMPANY-HOME-OPTIONS.zh-CN.md` 为最新首页说明：20 个可筛选板块、4 张统一轮播 Banner，首页不再加载产品资料下载与型号展厅。`components/home-composition.tsx` 组合真实内容；`content/home-modules.ts` 管理中文筛选清单。用户打开 `/review/` 可逐块隐藏/恢复、切换轮播预览、复制结果；选择仅在当前浏览器保存，不修改普通首页或数据库。该页 noindex，并从 sitemap 排除。`components/company-story.tsx`、`corporate-hero.tsx` 和最后加载的 `app/company-home.css` 管理本轮内容与样式。原产品/资源页继续维护各自内容。

新增公司实拍、历史证书与完整车间视频的来源及哈希见 `content/company-story-provenance.json`；视频仅用户点击播放，`preload="none"`。历史、资质、展会和工厂内容按湖南主体标注，国际询盘继续由深圳主体接收。

侧边联系与首页最新两处优化见 `docs/CONTACT-AND-MODULES.zh-CN.md`。联系方式、原始微信二维码路径和已确认社媒主页集中在 `content/contact.ts`；全站入口由 `components/contact-tools.tsx` 管理，并复用于页脚。最后加载的 `app/contact-refinement.css` 负责悬浮栏、手机底栏、应用大小图与技术资料展厅。

公司与产品文案：`content/site.ts`。图片：`public/images/`。来源记录：`content/asset-provenance.json`。规格下载：`public/downloads/`。

企业首页扩展：`content/company.ts` 管理能力、质量和项目流程；`content/home.ts` 管理应用组合、公司咨询模板和 FAQ。企业实拍位于 `public/images/company/`，逐张来源与哈希见 `content/company-image-provenance.json`。公司介绍页复用企业能力板块。

当前视觉以 `docs/PREMIUM-REDESIGN.zh-CN.md` 为准，同行研究见 `docs/INDUSTRY-PEER-REVIEW.zh-CN.md`。`components/premium-hero.tsx` 为全幅蓝调场景 Banner + 四产品线切换；`premium-sections.tsx` 提供方案索引、真实企业图文章节与四阶段交付规划。品牌蓝黄、浅蓝和白色体系保留，最后加载 `app/premium.css` 统一字号与桌面/移动端布局。主导航提供点击展开的大菜单与手机原生抽屉，Home 持续可见。公司页、方案页、SEM 落地页与产品/联系页沿用同一视觉系统。新首屏为应用示意，并非已完成项目；素材和完整生成提示词见 `content/premium-image-provenance.json`。

交互增强后，首页产品范围改为 `components/equipment-explorer.tsx`：照明/交通型号取自原 `content/site.ts`，最多比较同一产品线 3 款；停车/门禁仍使用类目资料。比较值保持原文，只合并同义字段标题，不推断缺失参数。

多产品需求现在由 `components/project-planner.tsx` 处理，替代首页原简单复选框。应用建议、产品线、国家、时间均可调整，并带入原询盘；国家和时间允许值来自 `content/project-planner.ts`。比较型号通过 `models` 参数传入，服务器只接受当前产品线下的已知型号。未知预填参数忽略。国家进入 country 字段，应用、型号与时间进入可编辑 message，不需数据库迁移。

`components/company-gallery.tsx` 为现有企业实拍提供 5 张图的原生 dialog 查看，支持方向键、前后按钮、Esc 与关闭后返回入口焦点。交互样式集中在 `app/interactive-modules.css`，沿用已认可的蓝黄配色。首页以 11 个主要章节组织内容；手机型号区可横滑，比较表在弹窗内部滚动。手机联系页表单位于标题之后，联系方式列于表单后。

本地公司资料指向湖南主体；网站国际询盘主体为深圳公司。当前分别标注企业资料来源，不主张已验证的法律/股权关系。不把湖南成立年份、证书或规模转为深圳宣传数字。后续需要添加成立历史、资质墙、案例和工厂规模时，先核实实体、型号、有效期和披露授权，再更新对应内容；不要在公开页面放空白占位或虚构数字。

公司资料咨询入口：`/contact/?topic=company-profile`。会预选独立的 `company-enquiry` 分类并使用公司咨询文案，不强迫访客选择产品。应用场景的 `application` 与资料请求 `topic` 使用允许列表生成可编辑的预填需求。数据库不需新增迁移。

产品资料后续慢慢补充即可。新增型号时填写 Product 数据；不要将系列参数当成每个型号固定参数。停车与门禁当前以类目需求页面展示，补齐单品资料后再增加具体型号。

## 本地运行

需要 Node.js 22.13 或以上。

```powershell
npm ci
npm run dev -- --port 5187
npm run check
npm test
npm run build
```

本地数据库首次运行需按根目录 README 的 D1 命令应用 `drizzle/` 中尚未应用的迁移。仅首次或新增迁移时执行，不应重复重放已应用 SQL。线上数据库由 Sites 在部署时应用迁移。

## 管理员与询盘

登录路径：`/admin/leads/`。管理员密码配置在 Sites 的 `ADMIN_PASSWORD` 秘密环境变量；本地密码说明保存在本工作目录的 `outputs/管理员登录说明.txt`，此目录及 `.dev.vars` 均被 Git 忽略，不进入源代码仓库。

更新密码后重新部署使环境变量生效，旧签名会话随密码改变而失效。不要把密码写进 `content/site.ts`、前端代码或 `.openai/hosting.json`。

网站只在数据库持久化后显示收件成功。后台用于查看和处理询盘；自动邮件通知尚未配置，需要后续接入邮件发送服务。公开页面的邮件与 WhatsApp 链接是直接联系通道。

## 广告测量

在 Sites 环境变量中配置 `GOOGLE_TAG_ID`、`GOOGLE_ADS_ID`、`GOOGLE_ADS_CONVERSION_LABEL` 后部署。无需修改前端源码。缺少真实账号标识时不装载广告脚本。

Analytics 与广告测量同意独立控制。询盘记录不包含未经允许的广告点击标识。Google Ads 原生 conversion 使用询盘参考号去重；不要同时把同一 GA4 事件和原生事件设置成两个主要转化。

## 上线与域名

新 Site 先以所有者私有方式发布，方便审阅。它与 longchismart.com 现站独立。正式投放需要确认公开访问、绑定域名、更新 `content/site.ts` 中 origin、填入真实测量标签并验收收件。当前没有改动旧站 DNS。

源代码同时交付到用户提供的 GitHub 私有仓库。Sites 托管源码与 GitHub 交付仓库是两个远端；后续改版应同步同一份经过检查的源代码，避免只更新其中一个。


交付咨询：`/contact/?topic=delivery-planning` 带入数量、目的地、日期、包装单证和交接要求；只生成可编辑咨询模板，不自动报价或承诺交期。
