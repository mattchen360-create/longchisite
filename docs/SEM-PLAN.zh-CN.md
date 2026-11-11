# LONGCHI SMART 海外 SEM 网站规划

确认范围：四大产品线并列推广；目标市场为欧美及澳大利亚；产品资料和素材后续逐步补充。本文件是建站与测量规划，不代表广告已经创建或开始花费。

## 一、网站与投放结构

| 产品线 | 品牌官网入口 | SEM 独立落地页 | 需求重点 |
|---|---|---|---|
| 智慧照明 | /solutions/smart-lighting/ | /lp/smart-lighting/ | 路灯、项目布局、供电、安装高度、光学与文件要求 |
| 智慧交通 | /solutions/traffic-safety/ | /lp/traffic-safety/ | 测速显示、车辆抓拍、显示文字、供电及目的地要求 |
| 智慧停车 | /solutions/smart-parking/ | /lp/smart-parking/ | 车道、识别、道闸、支付与系统集成需求 |
| 智慧门禁 | /solutions/access-control/ | /lp/access-control/ | 通行、识别方式、入口布局、已有管理系统 |

首页承担品牌与四产品线分流；广告直接进入相应落地页。落地页减少主导航分流，保留产品信息、FAQ、公司与隐私链接及询盘。每条产品线都具有独立网址和询盘分类。LP 不进入自然搜索网站地图；canonical 指向对应官网类目页，noindex 只针对普通自然索引，robots 不阻止广告爬虫访问 LP。

后续可在保持产品线架构的基础上增加单一搜索意图落地页，例如雷达反馈显示与带摄像机系统分别承接，不将全部广告导向同一首页。尚未有规格的品类先提供需求梳理与项目询盘，补齐型号证据后再公开参数。

## 二、广告账户规划建议

以“产品线 × 地区/语言”规划 Campaign，按搜索意图拆 Ad Group；是否进一步按国家拆分，取决于预算、搜索量和销售服务能力。目前不虚构 CPC、搜索量、转化率或建议支出金额。

建议关键词主题需要投放前通过广告账户验证：

- 照明：LED street light、road lighting supplier；solar street lighting 应在具体供货与配置资料确认后细化。
- 交通：radar speed sign、driver feedback sign；camera-equipped 系统单独讨论，不承诺执法认证或所有国家可用。
- 停车：parking barrier、parking access system、ANPR parking system，按实际可交付方案细分。
- 门禁：pedestrian gate、turnstile access control、access terminal，按设备与平台交付能力细分。

排除词需要账户验证；可优先检查消费级“车载雷达探测器”、手机“人脸解锁”、个人“停车找位 App”、招聘和维修下载等与工程采购不匹配的搜索。不要未经搜索词复盘就整体排除某个工程应用。

美国、欧洲各国家及澳大利亚的电气、无线、安装与其他项目文件要求按型号与目的地确认。网站不把 CE、FCC、RCM、执法资格或多国车牌覆盖写成全线默认能力；速度单位和标识格式也须确认。

## 三、询盘与测量实现

有效收件路径：页面需求表单 → 服务端校验 → D1 持久化 → 返回唯一参考号 → 前端显示已收到 → 在访客允许的测量范围内触发事件。

- 服务端校验邮箱、产品线、国家、联系许可和长度，加入诱捕字段、速率限制及幂等键。
- 后台 `/admin/leads/` 使用独立密码和签名会话，仅登录后读取记录。可筛选状态、更新跟进阶段、分页加载及导出已加载记录。
- `generate_lead` 仅在服务端确认收件后发生；按钮点击、浏览、下载不能视为有效询盘。
- 可以记录的广告字段：utm_source、utm_medium、utm_campaign、utm_term、utm_content、gclid、gbraid、wbraid、msclkid，以及最初记录的落地页和提交来源页。
- 广告标识仅在广告测量同意后保存；拒绝时服务端再次去除该类标识。Analytics 与广告测量可以分别选择。
- 不向客户端测量事件发送邮箱、姓名或询盘正文。Google 个性化广告同意默认拒绝，当前不提供再营销投放。
- Google 标签在用户选择允许相关可选工具后才加载；未配置广告/分析账号时不会加载标签，也不声称已经完成真实广告转化回传。

部署环境可配置：`GOOGLE_TAG_ID`（GA4 或 Google tag）、`GOOGLE_ADS_ID`（AW-数字）、`GOOGLE_ADS_CONVERSION_LABEL`（广告转化标签）。广告询盘回传使用参考号作为 transaction_id。若选择 GA4 导入方式，需在账号内配置关键事件及导入，避免与 Ads 原生转化重复计数。

后台状态：new → contacted → qualified → won / closed。网站成功收件和销售确认有效询盘是不同口径；可通过导出的广告点击标识与状态进一步规划离线转化，当前没有自动向 Google 上传客户数据。

## 四、素材与内容补充方法

- `content/site.ts` 管理公司信息、四产品线介绍、问题解答及型号数据。
- `public/images/` 管理图片；`content/asset-provenance.json` 记录来源。原资料文件不被网站构建修改。
- `public/downloads/` 放已核对型号的原规格文档。当前包含 4 份交通设备规格，后续按型号补充。
- 新型号填写独立 slug、分类、名称、图片、摘要、参数与可选下载路径，型号页与网站地图随数据更新。
- 案例、证书、客户评价、数量及效果数据只有在来源与发布范围明确后加入，不预先编造展示。
- 公司联系信息采用现有 Matt Chen 签名中的邮箱及号码；正式投放前由业务负责人核对接收人及 WhatsApp 可用性。

## 五、正式投放前的具体接入事项

1. 确认公开访问与最终域名；当前新 Sites 按默认规则保持仅所有者可访问，属于审阅版本，不能直接用于广告投放。
2. 绑定域名后更新 `content/site.ts` 的 origin，并同步 canonical、站点地图与账号最终网址。不要把旧站域名直接切换到新站而未确认 DNS、旧链接和收件安排。
3. 提供广告/分析账号的实际标签标识，在 Sites 环境变量中设置后重新部署；通过 Tag Assistant 与实际测试核对同意状态、事件及去重。
4. 检查真实询盘能在后台出现并建立跟进安排。当前已实现后台收件；自动邮件提醒尚未接入邮件服务，公开页面提供直接邮箱与 WhatsApp 联系链接。
5. 按目的地核对主推设备规格、标识、文件与供货范围；四线均可逐步补资料，但广告承诺必须与实际交付一致。
6. 小规模启动后按国家、设备、产品线与搜索词复盘，用有效询盘及成交反馈调整预算，不仅看表单数量。

官方参考：[Google 广告目标页面要求](https://support.google.com/adspolicy/answer/6368661?hl=en)、[Google Consent Mode 实现文档](https://developers.google.com/tag-platform/security/guides/consent)。这些是实现参考；网站完成不代表广告审核或当地适用性已获得批准。
