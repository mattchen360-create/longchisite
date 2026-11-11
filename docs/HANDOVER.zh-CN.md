# 网站交接与维护

## 已建设范围

- 英文首页，四条并列产品线：智慧照明、智慧交通、智慧停车、智慧门禁。
- 4 个类目方案页、4 个 SEM 落地页、7 个有来源依据的型号页、产品筛选、资源下载、公司介绍、联系与隐私页面。
- 持久化询盘、字段校验、联系许可、广告来源同意控制、重复提交去重、速率限制。
- 密码保护的询盘后台：`/admin/leads/`，支持阶段管理、分页与 CSV 导出。
- 独立页面标题、canonical、结构化产品信息、真实 robots.txt 与 sitemap.xml。

## 更新内容

公司与产品文案：`content/site.ts`。图片：`public/images/`。来源记录：`content/asset-provenance.json`。规格下载：`public/downloads/`。

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
