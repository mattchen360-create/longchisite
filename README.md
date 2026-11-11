# LONGCHI SMART

A complete English SEM website with four equal product lines: lighting, traffic safety, parking and access control. Built with the supplied Sites Vinext starter, React and Cloudflare D1.

## Commands

- `npm ci` — install locked dependencies
- `npm run dev -- --port 5187` — local preview
- `npm run check` — TypeScript checks
- `npm test` — enquiry validation tests
- `npm run build` — production Worker build
- `npm start -- --port 5188` — preview the built Worker

## Content and administration

Edit `content/site.ts` for company, solution and product content. Put images in `public/images` and specifications in `public/downloads`. Preserve `content/asset-provenance.json` source notes.

The enquiry form saves to D1 before confirming success. The password-protected manager is `/admin/leads/`. Set `ADMIN_PASSWORD` as a deployment secret (16+ characters). It is never committed.

Optional measurement settings: `GOOGLE_TAG_ID`, `GOOGLE_ADS_ID` and `GOOGLE_ADS_CONVERSION_LABEL`. No Google script loads before relevant visitor consent. No conversion IDs are fabricated.

## Local D1 migrations

After building, apply each pending SQL file once to the local database:

```powershell
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_eminent_ravenous.sql
```

Publishing with Sites applies the hosted migrations separately. Generated build files and local runtime state are ignored.

## Planning and handover

- `docs/SEM-PLAN.zh-CN.md` — paid-search structure and launch connections
- `docs/HANDOVER.zh-CN.md` — content, lead management and deployment notes
- `docs/BUILD-BRIEF.md` — accepted project and brand brief

The initial hosted Site is owner-private. It is a review release, not an active ad destination. Public access, a final domain, actual advertising IDs and verified commercial details are launch connections; the existing company domain is unchanged.
